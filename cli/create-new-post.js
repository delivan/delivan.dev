const path = require('path');
const fs = require('fs-extra');
const dateFns = require('date-fns');
const _ = require('lodash');
const rr = require('recursive-readdir');
const matter = require('gray-matter');
const inquirer = require('inquirer');
const log = require('signale');
const categoryMap = require('../src/constants/category');

const cwd = process.cwd();

const CONTENTS_DIR = '/content/blog';
const TARGET_DIR = `${cwd}${CONTENTS_DIR}`;
const CATEGORY_MAP_FILE = `${cwd}/src/constants/category.js`;
const IGNORE_DIR = 'images';
const DATE_FORMAT = 'YYYY-MM-DD HH:MM:SS';

const ignoreFunc = (file, stats) =>
  stats.isDirectory() && path.basename(file) == IGNORE_DIR;

const getCategories = async () => {
  const markdownFiles = await rr(TARGET_DIR, [ignoreFunc]);
  return _.uniqWith(
    markdownFiles
      .map(filePath => filePath.split('/')[8])
      .reduce((acc, cur) => {
        if (cur === '.DS_Store') {
          return acc;
        }
        if (acc.indexOf(cur) < 0) {
          const categoryId = cur;
          const categoryLabel = categoryMap[categoryId];
          acc.push({ id: categoryId, label: categoryLabel });
        }
        return acc;
      }, []),
    _.isEqual
  );
};

const getPostId = title =>
  title
    .split(' ')
    .join('-')
    .toLowerCase();

const refineContents = rawContents =>
  matter
    .stringify('', rawContents)
    .split("'")
    .join('');

const fetchCategory = async () => {
  const category = {};
  const customCategoryOption = '[[ CREATE NEW CATEGORY ]]';
  const categories = await getCategories();
  const categoryChoices = [
    ...categories.map(category => category.id),
    new inquirer.Separator(),
    customCategoryOption,
  ];
  const { selectedCategory } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedCategory',
      message: 'Select a category',
      choices: categoryChoices,
    },
  ]);

  if (selectedCategory === customCategoryOption) {
    const { customizedCategoryId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customizedCategoryId',
        message: 'Enter the customized category id(folder name)',
        validate: val => {
          if (val.includes("'")) {
            return 'Cannot use single quote';
          }

          if (categories.some(category => category.id === val)) {
            return `Already exist category id:: ${val}`;
          }

          return true;
        },
      },
    ]);
    category.id = customizedCategoryId;
  } else {
    category.id = selectedCategory;
  }

  if (selectedCategory === customCategoryOption) {
    const { customizedCategoryLabel } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customizedCategoryLabel',
        message: 'Enter the customized category label',
        validate: val => {
          if (val.includes("'")) {
            return 'Cannot use single quote';
          }

          if (categories.some(category => category.label === val)) {
            return `Already exist category label:: ${val}`;
          }

          return true;
        },
      },
    ]);
    category.label = customizedCategoryLabel;
  } else {
    category.label = categoryMap[selectedCategory];
  }

  if (!category) {
    throw Error('Unknown Error: Cannot find category!');
  }

  return category;
};

const fetchPostId = async category => {
  const { postId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'postId',
      message: 'Enter the post id',
      default: () => 'New post id',
      validate: async val => {
        if (val.includes("'")) {
          return 'Cannot use single quote';
        }

        const postId = getPostId(val);
        const dest = `${TARGET_DIR}/${category}/${postId}`;
        const destExists = await fs.pathExists(dest);

        if (destExists) {
          return `Already exist post id:: ${postId}`;
        }

        return true;
      },
    },
  ]);

  return postId;
};

module.exports = (async function() {
  const date = dateFns.format(new Date(), DATE_FORMAT);

  log.info('Create new post:: ', date);
  log.start('Start to process!\n');

  const categories = await getCategories();
  const category = await fetchCategory();
  const categoryDir = `${TARGET_DIR}/${category.id}`;
  const categoryDirExists = await fs.pathExists(categoryDir);

  if (!categoryDirExists) {
    await fs.ensureDir(categoryDir);

    fs.unlink(CATEGORY_MAP_FILE, err => {
      if (err) {
        log.error('Unknown Error: Cannot unlink file!');
        return;
      }
      const categoriesContent = categories.reduce((acc, cur) => {
        const categoryId = cur.id;
        const categoryLabel = cur.label;

        return (acc += `  ${categoryId}: '${categoryLabel}',\n`);
      }, '');
      const categoryFileContents = `module.exports = {
  all: '전체',
${categoriesContent}  ${category.id}: '${category.label}',
};`;
      fs.writeFile(CATEGORY_MAP_FILE, categoryFileContents, err => {
        if (err) {
          log.error('Unknown Error: Cannot write category file!');
          return;
        }
      });
    });
  }

  const postId = await fetchPostId(category.id);
  const parsedPostId = getPostId(postId);
  const contents = refineContents({
    title: parsedPostId,
    date,
    category: category.label,
  });

  fs.mkdir(`${categoryDir}/${parsedPostId}`, {}, err => {
    if (err) {
      log.error('Unknown Error: Cannot write folder!');
      return;
    }
    fs.writeFile(`${categoryDir}/${parsedPostId}/index.md`, contents, err => {
      if (err) {
        log.error('Unknown Error: Cannot write file!');
        return;
      }
      console.log('');

      log.success('Success to create new post!');
      log.note(`${categoryDir}/${parsedPostId}/index.md\n${contents}`);
    });
  });
})();
