---
title: '거침없는 자바스크립트(Non-blocking Javascript) - 1'
date: '2019-11-24'
category: 'Javascript'
---

이 글은 [코드스피츠 85 거침없는 자바스크립트 1주차 강의](https://www.youtube.com/watch?v=0NsJsBdYVHI)를 듣고 정리한 내용입니다.

---

## 현재의 자바스크립트?

- 현재의 웹 개발은 대부분 라이브러리, 프레임워크에 의존하지만 결국은 자바스크립트를 잘 알아야 한다.
- 개발 파이프라인
  - Code → Transpiler → Packaging → CI → Deploy
    - Code: ES3.1, 5, 6, TypeScript, Kotlin, ...
    - Transpiler: tsc, kotlinc, ... ⇒ babel
    - Packaging: webpack, ...
- 예전 자바스크립트를 잘 안다고 지금 버전의 자바스크립트를 잘 안다는 건 착각이다.

### ECMAScript 표준

- 매년 상반기 새로운 버전을 출시함
- Stage0~3까지 단계별 승격을 통해 극히 일부가 Stage4가 되면서 정식 반영 됌
- 제안의 담당자가 대부분 구글 관련 개발자여서 Stage4기준 보다 크롬에 빨리 반영되는 경우가 많음

### ECMAScript 6

- Class(설탕 문법이 아니라는 걸 알아야 함), Object Literal
- Arrow Function
- Iterator, Generator, For of
- const, let
- destructuring, rest, spread
- Template string
- Symbol, Promise, Map, Set, WeakMap, WeakSet, Proxy, Reflect

### ECMAScript 7~10, Stage 3

- 7 - 중첩된 rest 해체 `const [a, ...[b, ...c] = [1, 2, 3, 4] (a = 1, b = 2, c = [3, 4])
- 8 - async/await, shared memory, atomics
- 9 - object 해체, asynchronous iterators
- 10 - optional catch
- Stage3(11) - BigInt, globlThis, top level await, class field, private field/method, optional chaining(?.), nullish coalescing(??), WeakReference

## Program이란 무엇인가

### program & timing

Language code → Machine(가상머신일 가능성이 높음) language → File → Load → Run → Terminate

- 프로그램은 보통 Load → Run → Terminate → Load ... 의 과정이 반복적으로 일어남
- 프로그램은 결국 유지보수를 해야 하는 건데 이는 Language code ⇒ File 까지 가는 과정에서의 일
- 여기서 우리의 개발적인 목표는: 만들어진 코드를 얼마나 안건드리고 더 많은 기능이나 수정에 대응할 수 있을까? ⇒ 어떻게 코드를 안건드리고 유지보수를 하지? ⇒ 그렇지 하진 못하겠지만 코드 파일이 여러개라면 그 중 몇개만 건들이면 되도록 해야 한다 ⇒ 코드가 변화하는 이유를 한 가지로 규정할 수 있어야 한다
  - 궁극적인 목표는 변화에 대응하는 여파를 최소화시켜서 수정할 파일을 적게 만드는 것!
  - 코드의 설계가 잘 됐는지 따져보는 건 수정사항에 따라 코드 파일이 몇개가 수정됐는지 보면 알 수 있다.

### Javascript Timing

- Language code - ES2020, TypeScript...
- Machine language - Transpiler
- File - File & deploy
- Load - Browser load
- Run - Browser parsing & Run
- Terminate - Browser close(뒷정리가 약함)

## Runtime

### Runtime execution 단계

1. Loading ⇒ 메모리에 명령과 값이 분리되서 적재됌
2. Instruction(메모리에 로드된 Machine이 이해할 수 있는 명령어 셋) fetch & decoding ⇒ 메모리로부터 명령을 CPU의 제어 유닛(디코더)으로 가져옴 & 값을 CPU의 데이터 유닛(레지스터)으로 가져옴 → 가져온 명령과 값으로 CPU의 연산 유닛(ALU)에서 연산을 함
3. Execution(연산된 값을 다시 메모리에 넣는다 & 명령은 모든 명령이 실행될 때까지 순차적으로 실행된다)

폰 노이만 머신은 다 이렇게 동작한다.

Runtime 이란 Instruction fetch & decoding ←→ execution이 반복되는 그 사이를 말한다.

### Runtime Details

1. Essential definition loading(코드가 실행되기 위한 기본적인 명령, 값들을 로딩)
2. Vtable mapping(가상 메모리와 실제 메모리를 매핑)
3. Run ←→ Runtime definition loading

### Browser Runtime Details

1. declare base functions, classes, ... (기본적으로 필요한 script 로딩)
2. declare extended functions, classes, ... (라이브러리, 우리가 정의한 script 로딩)
3. client code execute

1, 2번이 일어나야 3이 일어날 수 있기 때문에 상대적으로 봤을 때 1, 2번을 declare time, 3번을 runtime 이라고 부른다.

## State Control

값이라는 건 계속 변할 수 있기 때문에 상태(State)로 볼 수 있으며 이는 메모리에 적재된다.

메모리 관련해서 가장 어려운 점은 참조를 이해하는 것이다.

### Directive Reference

- 변수란 메모리 주소의 별명이다.

```js
// 변수와 메모리의 관계를 나타내기 위한 수도 코드, &는 주소를 뜻함

a = "TEST" // a의 주소가 00이라 가정, a의 크기가 4이므로 00엔 T, 01엔 E, 02엔 S 03엔 T
b = &a // b의 주소가 05라 가정, a의 주소가 00 이므로 05엔 &00이 들어감 이를 참조라고 함
c = &b // c의 주소가 13이라 가정, b가 참조이므로 13엔 &05가 아닌 &00이 들어감
// a = b & b = c => a = c

d = "ABC" // d의 주소가 21이라 가정 d의 크기가 3이므로 21엔 A, 22엔 B, 23엔 C
b = &d // b가 새로운 값을 참조하고 c는 a를 참조함으로써 b != c 가 됌
// 여기서 문제는 위 두 줄의 코드가 엄청 나중에 짠 코드라면 사람의 입장에선 b가 변화됐다고 해서 b != c 가 됐다는 걸 알기 힘들다는 점이다.
// 즉 참조 값이 공개되고 그것이 쓰여지는 순간 그로 인해 예기치 못한 문제가 발생할 가능성이 농후하다.
```

- 직접적인 참조에선 내가 그 변수를 외부에 공개했다면 절대로 변수의 값을 바꾸면 안된다.

### Indirective Reference

```js
a = "TEST" // a의 주소가 00이라 가정, a의 크기가 4이므로 00엔 T, 01엔 E, 02엔 S 03엔 T
b = {target: &a} // b의 주소를 05, 객체의 주소를 12라 가정하면 05엔 &12가 들어가고 12엔 target :&00이 들어감
c = &b // c의 주소가 07이라 가정하면 07엔 &12가 들어감
// a = b.target & b.target = c.target => a = c.target

d = "ABC" // d의 주소가 21이라 가정 d의 크기가 3이므로 21엔 A, 22엔 B, 23엔 C
b.target = &d // 12엔 target:&21이 들어감
// d = b.target & b.target = c.target => d = c.target
```

- 메모리 주소를 한번 더 거치는 작업을 통해 변수가 공개되도 예기치 못한 문제를 방지할 수 있다.
- 이를 통해 컨텍스트 유지(상태 관리)를 사람이 이해할 수 있게(실수를 덜 저지를 수 있도록)한다.

## Flow Control

값이 아닌 명령을 다루는 것

### Sync flow control

- Sync flow: 메모리에 적재된 명령이 순차적으로 실행됨
- Sync flow control: 명령의 위치가 이동되면서 순차적으로 실행됨

control을 어떻게 할 것이냐는 control하는 시점에서 메모리에 적재된 값(State)이 뭐냐에 따라 결정되는 것이다. ⇒ 즉 Sync flow control의 핵심은 State control에 달려있다.

⇒ 프로그램을 잘 짜려면 State control이 잘 되야 한다. 자신의 머리가 폰 노이만 머신인것처럼 생각해야 한다!

- Sub flow: 함수 등을 통해 별도의 명령셋을 여러번 실행함
- 설계란 코드의 배치의 기술이다.

### Blocking

Sync flow가 실행되는 동안 다른 일을 할 수 없는 현상

그렇다면 우리가 짠 코드는 모두 Blocking 코드!

완전 Non blocking 코드는 실제로 존재하진 않고 대신 합의점이 있다.

- blocking 줄이기
  - sync flow 짧게 하기
  - 다른 쓰레드에 sync flow 떠넘기기 ⇒ 메인 스레드의 부하를 최대한 줄여야 하는 것이 책무! ⇒ 다른 스레드의 작업이 완료되면 메인스레드에 보고 해야함 ⇒ 메인 스레드의 일이 끝나도 이벤트 루프가 다른 스레드의 일이 끝날 때까지 계속 기다림 ⇒ Non blocking을 추구하는 것이고 실제로 Non blocking을 구현할 수 없다

### Non blocking

즉 Sync flow가 납득할 만한 시간내에 종료되는 것(짧게 짧게 Blocking)

### Sync & Async

- Sync: 서브루틴이 즉시 값을 반환함(즉 현재의 메인 스레드의 Sync flow에서 바로 우리가 원하는 리턴값이 나오는 것)

- Async: 서브루틴이 다른 수단으로 값을 반환함(즉 서브루틴이 리턴한 값이 우리가 원하는 게 아닌 것, 예를 들어 우리가 Promise를 리턴 받았다면 우리는 Promise를 원한게 아니라 그로 인한 값을 원한 것이기 때문에 Promise는 Async 함수다) Promise, callback function, async iterator

### Async의 단점

- 호출 결과가 즉시 반환되지 않으므로 현재의 Sync flow가 종료됨
- 그 결과 현재의 어휘 공간 내의 상태를 결과시점에 사용할 수 없음
- 요청 시의 상태를 별도로 결과시점에 전달할 부가장치 필요

### 그래서 Sync의 장점 + Async의 장점을 결합해서 코딩할 수 있도록 언어의 스펙이 짜여진다

- Sync로직으로 Async를 사용할 수 있게 함
- 하지만 Sync flow가 어긋나므로 이전 Sync flow의 상태를 기억하여 이어줄 장치 필요
- 그래서 컴파일러는 우리가 await나 yield 같은 키워드를 쓸 때 마다 코드를 잘라가지고 분리해서 각각의 함수를 만들어 스레드로 보낼 뿐만 아니라 변수들을 각각 스레드로 공급해줄 수 있는 시스템을 갖추고 있다. ⇒ 이 시스템을 Continuation이라 부른다.
- Continuation을 활용하는 프로그래밍 스타일을 CPS(Continuation Passing Style)라 부른다.
