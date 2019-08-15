---
title: '[Javascript] ES6+를 ES5와 비교해보며 알아보자 - 4'
date: '2019-06-16'
category: 'Javascript'
---

## Generator - Definition, Usage

```js
// ES6+
function* range(start, end, step) {
  while (start < end) {
    yield start
    start += step
  }
}

const ranger = range(0, 5, 1)
console.log(ranger.next())
console.log(ranger.next())
console.log(ranger.next())
console.log(ranger.next())
console.log(ranger.next())
console.log(ranger.next())

for (let i of range(0, 10, 2)) {
  console.log(i) // 0, 2, 4, 6, 8
}
```

```js
// ES5
function range(start, end, step) {
  var list = [];
  while (start < end) {
    list.push(start);
    start += step;
  }
  return list;
}

var ranger = range(0, 5, 1);
for (var i = 0; i < ranger.length; i++) {
  console.log({ value: ranger[i], done: }};
}

ranger = range(0, 10, 2);
for (var i = 0; i < ranger.length; i++) {
  console.log(ranger[i]); // 0, 2, 4, 6, 8
}
```

### 특징

- 중간에서 멈췄다가 이어서 실행할 수 있는 함수
- function 키워드 뒤에 \*을 붙여 표현하며 함수 내부에는 yield 키워드를 활용

## Generator - Iterator protocol

```js
// ES6+
const zeroToFiveIterator = {
  value: 0,
  *[Symbol.iterator]() {
    while (this.value < 5) {
      yield this.value++
    }
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

- 함수 실행 결과에 대해 next() 메소드를 호출할 때마다 순차적으로 제너레이터 함수 내부의 yield 키워드를 만나기 전까지 실행하고 yield 키워드에서 일시정지 한다.
- 다시 next() 메소드를 호출하면 그 다음 yield 키워드를 만날 때까지 함수 내부의 내용을 진행하는 식이다.

## Promise - Definition, Status, Value

```js
// ES6+
const promiseTest = param =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (param === true) {
        resolve('성공')
      } else {
        reject(new Error('실패'))
      }
    }, 3000)
  })

const statusAndValue1 = promiseTest(true)
console.log(statusAndValue1) // pending 상태
setTimeout(() => console.log(statusAndValue1), 3000) // resolved 상태, value는 "성공"
const statusAndValue2 = promiseTest(false)
console.log(statusAndValue2) // pending 상태
setTimeout(() => console.log(statusAndValue2), 3000) // rejected 상태, value는 에러메세지
```

```js
// ES5
var resolve = function(value) {
  return {
    status: 'resolved',
    value: value,
  }
}
var reject = function(value) {
  return {
    status: 'rejected',
    value: value,
  }
}

function promiseTest(param, timeout, then) {
  setTimeout(function() {
    then(param)
  }, timeout)

  return {
    status: 'pending',
    value: undefined,
  }
}

var statusAndValue1 = promiseTest(true, 3000, function(param) {
  if (param === true) {
    statusAndValue1 = resolve('성공')
  } else {
    statusAndValue1 = reject(new Error('실패'))
  }
})
console.log(statusAndValue1) // pending 상태
setTimeout(() => console.log(statusAndValue1), 3000) // resolved 상태, value는 "성공"
var statusAndValue2 = promiseTest(false, 3000, function(param) {
  if (param === true) {
    statusAndValue2 = resolve('성공')
  } else {
    statusAndValue2 = reject(new Error('실패'))
  }
})
console.log(statusAndValue2) // pending 상태
setTimeout(() => console.log(statusAndValue2), 3000) // rejected 상태, value는 에러메세지
```

### 특징

- Promise는 비동기적인 작업을 처리하기 위한 것이다.
- 인스턴스를 만들 때 콜백 함수를 실행한다.
- if문에 의해 resolve함수가 호출되면 pending상태에서 resolved(혹은 fulfilled)상태가 되고 reject함수가 호출되면 pending상태에서 rejected상태가 된다.

## Promise - Promise chaining

```js
// ES6+
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1')
  }, 1000)
})
  .then(res => {
    console.log(res)
    return '2'
  })
  .then(res => {
    console.log(res)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('3')
      }, 1000)
    })
  })
  .then(res => {
    console.log(res)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('4')
      }, 1000)
    })
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
    return new Error('5')
  })
  .then(res => {
    console.log(res)
    throw new Error('6')
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })
```

```js
// ES5
function resolve(value, then) {
  then(value)
}

function reject(value, then) {
  then(value)
}

;(function() {
  setTimeout(function() {
    resolve('1', function(res) {
      console.log(res)
      resolve('2', function(res) {
        console.log(res)
        setTimeout(function() {
          resolve('3', function(res) {
            console.log(res)
            setTimeout(function() {
              reject('4', function(err) {
                console.error(err)
                resolve(new Error('5'), function(res) {
                  console.log(res)
                  reject(new Error('6'), function(err) {
                    console.error(err)
                  })
                })
              })
            }, 1000)
          })
        }, 1000)
      })
    })
  }, 1000)
})()
```

### 특징

- then과 catch 메소드 안에서
  1.  return 일반값이면 promise객체에 resolved상태로 반환되며 그 안에 값이 담김
  2.  return promise 인스턴스이면 promise 인스턴스가 리턴된 것
  3.  return 안하면 undefined를 리턴 (원래의 js 함수 동작) ⇒ 2번과 같음

## Set - Definition, Usage

```js
// ES6+
const nameSet = new Set()
nameSet
  .add('delivan')
  .add('foo')
  .add('delivan')
console.log(nameSet.size === 2)
console.log(nameSet.has('foo'))
for (let name of nameSet.values()) {
  console.log(name)
}
nameSet.delete('foo')
console.log(nameSet)
nameSet.clear()
console.log(nameSet)
```

```js
// ES5
var nameSet = {}
nameSet['delivan'] = true
nameSet['foo'] = true
nameSet['delivan'] = true
console.log(Object.keys(nameSet).length === 2)
console.log(nameSet['foo'])
for (var name in nameSet) {
  if (nameSet.hasOwnProperty(name)) {
    console.log(name)
  }
}
delete nameSet['foo']
console.log(nameSet)
nameSet = {}
console.log(nameSet)
```

### 특징

- 중복이 허용되지 않음
- index는 없지만 순서를 보장하며 iterable함
- '값'들로만 이뤄질 수 있음
- 추가, 삭제, 초기화, 요소의 총 개수, 포함여부 확인 가능
- 전체적으로 순회할 필요성이 있는 경우, 중복 제거, 값의 유무 판단 등에 쓰임

## WeakSet - Definition, Usage

```js
// ES6+
let obj = { name: 'delivan' } // 객체에 대한 참조 카운트가 1이 됌
let obj2 = obj // 참조 카운트 2

const weakset = new WeakSet()
weakset.add(obj) // weakset에 { name: 'delivan' }을 추가했지만 여전히 참조카운트는 2
console.log(weakset.has(obj))
weakset.delete(obj)
weakset.add(obj2)
console.log(weakset.has(obj2))

obj2 = null // 참조카운트 1
obj = null // 참조카운트가 0이 되면서 가비지 컬렉터의 대상이 되고 weakset이 갖고있던 { name: 'delivan' }은 언젠간 없게 된다.
```

```js
// ES5는 없음
```

### 특징

- 참조형 데이터만 요소로 삼을 수 있음
- 참조 카운트를 증가시키지 않음
- iterable 하지 않음
- add, delete, has 메소드만 있음

## Map - Definition, Usage

```js
// ES6+
const delivanMap = new Map()
const dummyObj = {}
delivanMap
  .set('name', 'delivan')
  .set('age', 27)
  .set(123, 12345)
  .set(dummyObj, 'dummyObj')
console.log(delivanMap)
console.log(delivanMap.size)
console.log(delivanMap.get(dummyObj))
console.log(delivanMap.has(123))
console.log(delivanMap.delete(dummyObj))
for (let key of delivanMap.keys()) {
  console.log(key)
}
for (let value of delivanMap.values()) {
  console.log(value)
}
for (let [key, value] of delivanMap.entries()) {
  console.log(key, value)
}
delivanMap.clear()
console.log(delivanMap)
```

```js
// ES5
var delivanLikeMap = {}
delivanLikeMap['name'] = 'delivan'
delivanLikeMap['age'] = 27
delivanLikeMap[123] = 12345 // key가 string으로 변환 됌
// obj는 key로 넣을 순 없음
console.log(delivanLikeMap)
console.log(Object.keys(delivanLikeMap).length)
console.log(!!delivanLikeMap[123])
for (let key in delivanLikeMap) {
  console.log(typeof key)
}
// value, entries에 대응하는 메소드가 없음
delivanLikeMap = {}
console.log(delivanLikeMap)
```

### 특징

- key, value 쌍으로 이뤄진 요소의 집합
- 순서를 보장함
- 객체의 단점을 보완하는 특징을 가짐
  - iterable X => iterable O (for in 문으로 객체를 순회하는 것은 prototype을 이용한 것)
  - key는 문자열만 => 모든 데이터 타입 가능
  - property의 길이를 알아내려면 순회하거나 따로 저장해야 함 => .size로 알 수 있음

## WeakMap

```js
// ES6+
let obj = { name: 'delivan' } // 객체에 대한 참조 카운트가 1이 됌
let obj2 = obj // 참조 카운트 2

const weakmap = new WeakMap()
weakmap.set(obj, 27) // weakset에 { name: 'delivan' }을 추가했지만 여전히 참조카운트는 2
console.log(weakmap.has(obj))
console.log(weakmap.get(obj))
console.log(weakmap.delete(obj))
weakmap.set(obj2, 27)
console.log(weakmap.has(obj2))

obj2 = null // 참조카운트 1
obj = null // 참조카운트가 0이 되면서 가비지 컬렉터의 대상이 되고 weakset이 갖고있던 { name: 'delivan' }은 언젠간 없게 된다.
```

### 특징

- 참조형 데이터만 key로 삼을 수 있음, value는 상관 없음
- 참조 카운트를 증가시키지 않음
- iterable 하지 않음
- get, set, delete, has 메소드만 있음

## 참조

- <a href="http://es6-features.org" target="_blank">http://es6-features.org</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference" target="_blank">https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference</a>
- <a href="https://www.inflearn.com/course/es6-2" target="_blank">https://www.inflearn.com/course/es6-2</a>
