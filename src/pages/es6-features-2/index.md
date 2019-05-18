---
title: '[Javascript] ES6: ES5와 비교해보며 알아보기 - 2'
date: '2019-05-10'
---

## Template literal - Expression interpolation
```js
// ES6
const name = 'delivan';
const introduction = `안녕하세요 저는 ${name} 입니다.`;
console.log(introduction);
```
```js
// ES5
var name = 'delivan';
var introduction = '안녕하세요 저는 ' + name + ' 입니다.';
console.log(introduction);
```

## Template literal - Tagged template
- template literal을 함수로 파싱할 수 있다.
- 리액트에서 유명한 styled component가 이 문법을 이용해서 만들어졌다.

```js
// ES6
const tagFunction = (strs, arg1, arg2) => {
  return `${strs[0]}${arg1}${strs[1]}${arg2}${strs[2]}`;
}

const introduction = tagFunction`내 이름은 ${'delivan'} 이고 나이는 ${27} 입니다.`;
console.log(introduction);
```
```js
// ES5
function tagFunction(strs, arg1, arg2) {
  return strs[0] + arg1 + strs[1] + arg2 + strs[2];
}

var introduction = tagFunction(['내 이름은 ', ' 이고 나이는 ', ' 입니다.'], 'delivan', 27);
console.log(introduction);
```

## Template literal - Raw string 
```js
// ES6
const rawString = String.raw`안녕하세요.\n 저는 ${'delivan'} 입니다.`;
console.log(rawString);
``` 
```js
// ES5
var rawString = '안녕하세요.\\n 저는 delivan 입니다.';
console.log(rawString);
```

## Enhanced object property - property shorthand
```js
// ES6
const name = 'delivan';
const age = 27;
const obj = {
  name,
  age
};
console.log(obj);
```
```js
// ES5
var name = 'delivan';
var age = 27;
var obj = {
  name: name,
  age: age
};
console.log(obj);
```

## Enhanced object property - concise method
```js
// ES6
const obj = {
  name: 'delivan',
  getName() {
    return this.name;
  }
};

console.log(obj.getName());
const delivan = new obj.getName(); // error!
```
```js
// ES5
var obj = {
  name: 'delivan',
  getName: function() {
    return this.name;
  }
};

console.log(obj.getName());
var delivan = new obj.getName(); // no error!
```
- concise method는 prototype이 없어 생성자 함수로 쓸 수 없다. 즉, 함수 본연의 기능만 수행한다.

## Enhanced object property - Computed property name
```js
// ES6
const getProperty = (prop) => {
  switch (prop) {
    case 'a':
      return 'age';
      break;
    case 'j':
      return 'job';
      break;
  }
};

let obj = {
  name: 'delivan',
  [getProperty('j')]: 'software engineer'
};
```
```js
// ES5
function getProperty(prop) {
  switch (prop) {
    case 'a':
      return 'age';
      break;
    case 'j':
      return 'job';
      break;
  }
};

var obj = {
  name: 'delivan'
};
obj[[getProperty('j')]: 'software engineer'];
```

## Destructing assignment - Array destructuring
```js
// ES6
const num = [1, 2, 3];
let [a, ,b] = num;
console.log(a, b); 
[b, a] = [a, b];
console.log(a, b);
```
```js
var num = [1, 2, 3];
var a = num[0], b = num[2];
console.log(a, b);
var tmp = a;
a = b;
b = tmp;
console.log(a, b);
```

## Destructing assignment - Object destructuring
```js
// ES6
const obj = {
  name: 'delivan',
  age: 27,
  job: {
    company: 'goorm',
    location: 'pangyo',
    position: 'engineer'
  }
};

const { name: myName, job: { company: companyName, position }} = obj;
console.log(myName, companyName, position);
```
```js
// ES5
var obj = {
  name: 'delivan',
  age: 27,
  job: {
    company: 'goorm',
    location: 'pangyo',
    position: 'engineer'
  }
};

var myName = obj.name;
var companyName = obj.job.company;
var position = obj.job.position;
console.log(myName, companyName, position);
```

## Destructing assignment - Default value
```js
// ES6
const obj = { 
  name: 'delivan'
};
const num = [1, 2];
const { name, age = 27 } = obj;
console.log(name, age);
const [one, two, three = 3] = num;
console.log(one, two, three);
```
```js
// ES6
var obj = { 
  name: 'delivan'
};
var num = [1, 2];
var name = obj.name;
var age = obj.age === undefined ? 27 : obj.age;
console.log(name, age);
var one = num[0];
var two = num[1];
var three = num[2] === undefined ? 3 : num[2];
console.log(one, two, three);
```

## 참조한 사이트
- <a href="http://es6-features.org" target="_blank">http://es6-features.org</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference" target="_blank">https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference</a>
