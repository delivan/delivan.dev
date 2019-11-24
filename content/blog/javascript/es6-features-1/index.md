---
title: 'ES6+를 ES5와 비교해보며 알아보자 - 1'
date: '2019-05-08'
category: 'Javascript'
---

## Constants

```js
// ES6+
const delivan = 27;
delivan = 28; // error!
```

```js
// ES5
Object.defineProperty(typeof global === 'object' ? global : window, 'delivan', {
  value: 27,
  enumerable: true,
  writable: false, // Here!
  configurable: false, // Here!
});
delivan = 28;
console.log(delivan); // 27
```

## Block scope - variable

- scope: 범위, 유효공간, 허용공간
- block: 중괄호 { }
- block scope: 블락에 의해 생기는 변수의 유효 범위 => let, const
- function scope: 함수에 의해서 생기는 변수의 유효 범위 => var

```js
// ES6+
const array = [1, 2, 3, 4, 5];
let callbacks = [];
for (let i = 0; i < array.length; i++) {
  callbacks[i] = function() {
    return i;
  };
}
for (let i = 0; i < array.length; i++) {
  console.log(callbacks[i]());
}
```

```js
// ES5
var array = [1, 2, 3, 4, 5];
var callbacks = [];
var i;
for (i = 0; i < array.length; i++) {
  (function(i) {
    callbacks[i] = function() {
      return i;
    };
  })(i);
}
for (i = 0; i < array.length; i++) {
  console.log(callbacks[i]());
}
```

- let 과 const 만 쓰거나 var 만 쓰는게 혼용해서 쓰는 것보다 성능상으로 좋다.

## Block scope - function

```js
// ES6+
{
  function foo() {
    return 1;
  }
  console.log(foo());
  {
    function foo() {
      return 2;
    }
    console.log(foo());
  }
  console.log(foo());
}
```

```js
// ES5
(function() {
  var foo = function() {
    return 1;
  };
  console.log(foo());
  (function() {
    var foo = function() {
      return 2;
    };
    console.log(foo());
  })();
  console.log(foo());
});
```

## Arrow function - Expression, Statement body

- prototype 프로퍼티가 없어서 생성자 함수로 사용할 수 없다.
- arguments, callee 가 숨겨져 있으며 invoke 해야만 값을 얻을 수 있다.(없으면 에러가 담겨있음)

```js
// ES6+
const odds = [1, 3, 5, 7, 9];

const evens = odds.map(num => num + 1);
const pairs = odds.map(num => ({ odd: num, even: num + 1 }));
const nums = odds.map((num, idx) => num - idx);
nums.forEach(num => {
  console.log(num);
});
```

```js
// ES5
var odds = [1, 3, 5, 7, 9];

var evens = odds.map(function(num) {
  return num + 1;
});
var pairs = odds.map(function(num) {
  return { odd: num, even: num + 1 };
});
var nums = odds.map(function(num, idx) {
  return num - idx;
});
nums.forEach(function(num) {
  console.log(num);
});
```

## Arrow function - Lexical this

- this binding 을 하지 않는다.

```js
// ES6+
const obj = {
  nums: [1, 2, 3, 4, 5],
  odds: [],
  pushOdds() {
    this.nums.forEach(num => {
      if (num % 2 === 1) {
        this.odds.push(num);
      }
    });
  },
};
obj.pushOdds();
console.log(obj.odds);
```

```js
// ES5
var obj = {
  nums: [1, 2, 3, 4, 5],
  odds: [],
  pushOdds: function() {
    var self = this;
    this.nums.forEach(function(num) {
      if (num % 2 === 1) {
        self.odds.push(num);
      }
    });
    // this.nums.forEach(function(num) {
    //   if (num % 2 === 1) {
    //     this.odds.push(num);
    //   }
    // }, this);
  },
};
obj.pushOdds();
console.log(obj.odds);
```

## Parameter handling - Default parameter

```js
// ES6+
const add = (x, y = 7, z = 42) => {
  return x + y + z;
};
console.log(add(1) === 50);
```

```js
// ES5
function add(x, y, z) {
  if (y === undefined) {
    y = 7;
  }
  if (z === undefined) {
    z = 42;
  }
  return x + y + z;
}
console.log(add(1) === 50);
```

## Parameter handling - Rest parameter

- 마지막 파라미터로 한번만 나와야 한다.

```js
// ES6+
const add = (x, y, ...rest) => {
  let num = x + y;
  rest.forEach(val => {
    num += val;
  });
  return num;
};
console.log(add(1, 2, 3, 4, 5));
```

```js
// ES5
function add(x, y) {
  var num = x + y;
  var rest = Array.prototype.slice.call(arguments, 2);
  rest.forEach(function(val) {
    num += val;
  });
  return num;
}
console.log(add(1, 2, 3, 4, 5));
```

## Parameter handling - Spread operator

- iterable 한 데이터는 모두 펼칠 수 있다.
- 얕은 복사만을 수행한다.

```js
// ES6+
const add = (x, y, ...rest) => {
  const params = [x, y, ...rest];
  let num = 0;
  params.forEach(val => {
    num += val;
  });
  return num;
};
console.log(add(1, 2, 3, 4, 5));
```

```js
// ES5
function add(x, y) {
  var rest = Array.prototype.slice.call(arguments, 2);
  var params = [x, y].concat(rest);
  var num = 0;
  params.forEach(function(val) {
    num += val;
  });
  return num;
}
console.log(add(1, 2, 3, 4, 5));
```

## 참조한 사이트

- <a href="http://es6-features.org" target="_blank">http://es6-features.org</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference" target="_blank">https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference</a>
- <a href="https://www.inflearn.com/course/ecmascript-6-flow" target="_blank">https://www.inflearn.com/course/ecmascript-6-flow</a>
