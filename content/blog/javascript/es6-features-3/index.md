---
title: '[Javascript] ES6+를 ES5와 비교해보며 알아보자 - 3'
date: '2019-06-09'
category: 'Javascript'
---

## Class - Definition, Method

```js
// ES6+
class Person {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
  static isPerson(obj) {
    return obj instanceof this
  }
}

const delivan = new Person('delivan')
console.log(delivan.getName()) // delivan
console.log(Person.isPerson(delivan)) // true
```

```js
// ES5
function Person(name) {
  this.name = name
}

Person.prototype.getName = function() {
  return this.name
}

Person.isPerson = function(obj) {
  return obj instanceof this
}

var delivan = new Person('delivan')
console.log(delivan.getName()) // delivan
console.log(Person.isPerson(delivan)) // true
```

### 특징

- 함수처럼 식이면서 값이다.
- 오직 생성자 함수로써만 사용할 수 있다.
- 클래스 내부엔 `use strict` 가 강제된다.
- 메소드가 enumerable 하지 않다. (ES5 방식으로 만들면 enumerable 함)
- constructor를 제외한 모든 메소드는 new 명령어로 호출할 수 없다.
- 클래서 변수(여기서는 Person)가 클래스 내부에서는 상수다.
- 선언과 동시에 prototype 전체를 바꿀 수 없다. (`Person.prototype = { ... }` 이렇게 할 수 없다.)
- 메소드를 computed property name으로 만들 수 있다.

## Class - Inheritance

```js
// ES6+
class Rectangle {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  getWidth() {
    return this.x
  }
  getHeight() {
    return this.y
  }
}

class Square extends Rectangle {
  constructor(x) {
    super(x, x)
  }
  getArea() {
    return super.getWidth() * super.getWidth()
  }
}

const square = new Square(2)
console.log(square.getWidth()) // 2
console.log(square.getHeight()) // 2
console.log(square.getArea()) // 4
```

```js
// ES5
var Rectangle = function(x, y) {
  this.x = x
  this.y = y
}

Rectangle.prototype.getWidth = function() {
  return this.x
}

Rectangle.prototype.getHeight = function() {
  return this.y
}

var Square = function(x) {
  Rectangle.call(this, x, x)
}

Square.prototype = new Rectangle()
Square.prototype.constructor = Square
Square.prototype.getArea = function() {
  return this.getWidth() * this.getHeight()
}

var square = new Square(2)
console.log(square.getWidth()) // 2
console.log(square.getHeight()) // 2
console.log(square.getArea()) // 4
```

### 특징

- 클래스뿐만 아니라 함수도 상속가능하다.
- super()는 this를 접근하기 전에 호출해야 한다.
- super.메소드로 상위클래스의 메소드에 접근할 수 있다.

## Symbol - Definition, Characteristic

```js
// ES6+
const NAME = Symbol('이름')
const AGE = Symbol('나이')
const delivan = {
  [NAME]: '유정혁',
  [AGE]: 27,
}

console.log(delivan[Symbol('이름')]) // undefined

for (prop in delivan) {
  console.log(delivan[prop]) // 출력 X
}

Object.keys(delivan).forEach(key => {
  console.log(delivan[key]) // 출력 X
})

Object.getOwnPropertySymbols(delivan).forEach(key => {
  console.log(delivan[key]) // 출력 O
})

Reflect.ownKeys(delivan).forEach(key => {
  console.log(delivan[key]) // 출력 O
})
```

```js
// ES5는 없음
```

### 특징

- Private 변수에 대한 요구에서 탄생
- Primitive value이며 생성할 때 파라미터가 같을지라도 각각이 고유해서 비교연산자로 같게 나오지 않는다.
- enumerable 하지 않으며 특정 메소드로만 출력 가능하다.

## Symbol - Private, Public variable

```js
// ES6+
const obj = (() => {
  const privateVariable = Symbol('private')
  const publicVariable = Symbol.for('public')
  return {
    [privateVariable]: '외부에서 보이지만 접근하진 못함',
    [publicVariable]: "obj[Symbol.for('public')] 으로 접근 가능",
  }
})()

console.log(obj)
console.log(obj[Symbol.for('public')])
```

```js
// ES5는 없음
```

### 특징

- 사실 private 변수는 getOwnPropertySymbols, Reflect.ownKeys로 접근 가능해서 흉내만 낸 것에 불과하다.

## Iterator

```js
// ES6
const zeroToFiveIterator = {
  value: 0,
  next() {
    return {
      done: this.value >= 5,
      value: this.value++,
    }
  },
}

const zeroToFive = {
  [Symbol.iterator]() {
    return zeroToFiveIterator
  },
}

console.log([...zeroToFive])
```

```js
// ES5
var zeroToFiveIterator = {
  value: 0,
  next: function() {
    return {
      done: this.value >= 5,
      value: this.value,
    }
  },
}

var zeroToFive = []
var obj = zeroToFiveIterator.next()
for (;;) {
  var obj = zeroToFiveIterator.next()
  if (obj.done) {
    break
  } else {
    zeroToFive.push(zeroToFiveIterator.value++)
  }
}

console.log(zeroToFive)
```

### 특징

- 반복을 위해 설계된 특별한 인터페이스를 가진 객체
- iterator는 꼭 객체 내부에 next 메소드가 있어야 하며 이 메소드는 value와 done을 프로퍼티로 가진 객체를 반환해야 하고 done은 boolean 값이어야 한다.
- done이 true가 되지 않는 이상 iterator를 무한 실행한다.
- for-of, spread operator, forEach메소드 등은 내부적으로 `[Symbol.iterator]()` 를 실행한 결과 객체를 들고 객체 내부의 next() 메소드를 done 프로퍼티가 true가 나올 때까지 반복하여 호출하는 것이다.
- Symbol.iterator 메소드가 요구사항에 맞는 iterator를 반환하면 해당 객체를 iterable 하다고 한다.
- Array, String, Map, Set, Generator는 iterable 하다.

## 참조

- <a href="http://es6-features.org" target="_blank">http://es6-features.org</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference" target="_blank">https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference</a>
- <a href="https://www.inflearn.com/course/es6-2" target="_blank">https://www.inflearn.com/course/es6-2</a>
