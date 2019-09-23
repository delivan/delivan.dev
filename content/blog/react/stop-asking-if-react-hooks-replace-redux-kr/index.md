---
title: '[번역] React Hooks가 Redux를 대체할 수 있냐고 물어보지 마세요'
date: '2019-09-23'
category: 'React'
---

이 글은 <a href="https://medium.com/@thamaxlg" target="_blank"><b>Max González</b></a>가 작성한 <a href="https://medium.com/swlh/stop-asking-if-react-hooks-replace-redux-448c54d79551" target="_blank"><b>Stop Asking if React Hooks Replace Redux</b></a>를 번역한 글입니다. 글을 그대로 직역하기 보다는 좀 더 전달이 명확할 것 같다고 생각한 뉘앙스를 첨가하여 번역을 진행했습니다. 매끄럽지 못하거나 어색한 부분에 대해 피드백을 주시면 감사하겠습니다.

----

많은 동료들이 내게 같은 질문을 다양한 방식으로 하곤 한다.

*"프로젝트에 hooks를 사용하게 된다면 Redux가 계속 필요한가요?"*

*"React hooks가 Redux를 더이상 필요없게 할까요? Redux가 할 수 있는 것들을 hooks로도 똑같이 할 수 있지 않나요?"*

구글에도 검색해보면 이와 같은 질문을 하는 사람이 많다는 걸 알 수 있다.

"React hooks가 Redux를 대체할 수 있나요?"*에 대한 빠른 답변을 하자면 "**그렇지 않습니다.**"

좀 미묘하지만 정중한 답변을 하자면 "**프로젝트의 종류에 따라 다릅니다.**"

사실 하고 싶은 답변은 "**당신이 무슨 말을 하는지 잘 모르겠습니다.**" 이다. "React hooks가 Redux를 대체할 수 있나요?"라는 이 질문이 근본적으로 잘못된 질문이라는 것에 대한 여러 이유가 있다. 우선 알아야 할 것은..

## Redux는 선택사항이다!
Dan Abramov(Redux의 창시자 중 한 명)에 따르면, <a href="https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367" target="_blank">당신은 Redux가 필요하지 않을 수 있다.</a> 처음부터 사용하지 않았다면 당연히 대체할 필요도 없다.

Redux는 JavaScript 라이브러리고 React(또 다른 JavaScript 라이브러리)로 작업을 하고 있다면, React-Redux는 Redux를 사용하기 위해 프로젝트에 import 해야 할 또 다른 JavaScript 라이브러리다. 라이브러리를 사용하는 것은 프로젝트의 번들 크기를 늘려 앱이 로드되는 데에 걸리는 시간을 증가시킨다. 그렇기 때문에 jQuery, Redux, <a href="https://mobx.js.org/intro/overview.html" target="_blank">Mobx</a>(또 다른 상태 관리 라이브러리) 같은 라이브러리들을 **적절한 이유** 없이 사용해서는 안된다.

hooks가 Redux를 대체할 수 있는지 물어보는 사람들은 자신의 React 앱이 꼭 이것들 중에 한 가지 혹은 다른 것을 '사용해야 한다고' 생각하는 것 같다. 근데 그렇지 않다. `만약 개발하고 있는 앱이 많은 상태를 저장할 필요가 없다면, 혹은 컴포넌트 구조가 과도한 prop drilling을 피할 수 있을만큼 단순하다면, 모든 상태 관리 라이브러리는 사용할 필요가 없다.` 단순한 앱의 상태는 hooks가 있건 없건, React가 제공하는 것들만으로도 충분히 관리할 수 있다.

심지어 앱이 많은 상태를 가지거나, 컴포넌트 구조가 고대의 나무 뿌리처럼 복잡해도, 여전히 상태 관리 라이브러리를 사용할 필요가 없다. Props drilling이 성가시긴 하지만, React는 충분한 상태 관리 옵션들을 지원하며 또한 hooks는 상태를 잘 정리할 수 있도록 도와준다. Redux는 가벼운 라이브러리지만, 셋업 하는데 복잡하며, 번들 크기를 증가시키는 등 사용하는데에 다양한 비용들이 발생한다. 이렇듯 Redux를 사용하지 않아도 되는 합리적이고 다양한 이유들이 있다.

물론 Redux를 사용할 만한 다양한 이유들 또한 존재한다. 만약 처음부터 프로젝트에서 Redux를 사용했다면, 구조적인 측면(상태에 대해 예측가능한 단일 소스를 갖는 것은 복잡한 앱에서 유용할 수 있다), 미들웨어, 강력한 Redux developer tools, 좀 더 쉬운 디버깅 등 많은 이점들을 가질 수 있다. React hooks는 이 이유들을 **무효화** 시키지 않는다. Redux가 필요했었다면, 여전히 필요하다는 말이다. 왜냐하면,

## React hooks와 Redux는 같은 문제를 해결하는 것이 아니다!
Redux는 상태 관리 라이브러리다. Hooks는 최근의 React 업데이트 사항 중 한 부분이며, 클래스 컴포넌트로 할 수 있는 것들을 함수 컴포넌트로도 할 수 있게 한다.

그렇다면 클래스 없이도 React 앱을 개발할 수 있게 하는 기능이 갑자기 상태 관리 라이브러리를 쓸모없게 만들까? **그렇지 않다.**

<a href="https://reactjs.org/docs/hooks-intro.html" target="_blank">문서</a>에 따르면, React hooks는 다음 세 가지의 이유로 인해 개발되었다.
- 클래스 컴포넌트는 로직들을 재사용하기 어렵다.
- 구현한 Lifecycle 메소드들에 관련없는 로직들을 포함되곤 한다.
- 클래스는 컴퓨터와 인간 모두에게 이해하기 어려운 개념이다.

이러한 동기들 중 어떠한 것도 상태 관리와 직접적인 관련이 없다.

React hooks는 앱의 상태를 관리하는데에 새로운 옵션들을 제공한다. 특히 <a href="https://reactjs.org/docs/hooks-reference.html#usestate" target="_blank">useState</a>, <a href="https://reactjs.org/docs/hooks-reference.html#usereducer" target="_blank">useReducer</a> 그리고 <a href="https://reactjs.org/docs/hooks-reference.html#usecontext" target="_blank">useContext</a> 메소드는 hooks 이전의 React가 제공했던 옵션들보다 틀림없이 더 좋은 상태 관리 방법들을 제공한다.

이 hooks 들은 새롭거나 마법 같은 것이 아니며, 상태 관리 라이브러리들을 쓸모없게 만들지 않는다.

## React hooks는 당신의 React 앱이 이전엔 할 수 없던 것을 할 수 있게 하지 않는다!
그렇다. '이제 클래스 컴포넌트로만 할 수 있던 것들을 함수 컴포넌트로도 할 수 있다는 것'과 '더 나은 구조와 코드 재사용성을 가질 수 있다는 것' 말곤 달라진 것이 없다. Hooks는 **개발자의 경험**을 더 좋게 할 뿐이다.

`useState`와 `useReducer`는 컴포넌트의 상태를 관리하는 방법일 뿐이며, 클래스 컴포넌트에서 사용하는 `this.state`와 `this.setState`와 똑같이 동작한다. 위 메소드들로도 여전히 props를 내려줘야 한다.

`useContext`는 컴포넌트 간에 앱의 상태를 prop drilling 없이 공유할 수 있다는 점 때문에, Redux를 필요없게 만든다고 생각할 수 있지만 이는 새로운 것이 아니다. context API는 이전부터 React의 기능 중 하나였다. `useContext` hook은 `<Consumer>`로 감싸지 않고도 context를 사용할 수 있게 할 뿐이다. 그리고 몇몇 개발자들이 앱의 상태를 context로 관리하곤 하는데, context는 그렇게 하도록 설계된 것이 아니다. 문서에 따르면,

> Context는 권한이 부여된 사용자, 테마, 선호되는 언어 등과 같은 "전역적"이라고 여겨질 만한 데이터를 React 컴포넌트 트리에서 공유할 수 있도록 설계되었다.

즉 **자주 변경되는 것들이 아니다.**

또한 문서에서 "context는 컴포넌트 재사용을 어렵게 만든다." 라며, 최대한 사용을 줄이는 걸 권장한다. 또한 개발자가 이를 세심히 다루지 않는다면, 불필요한 렌더링을 초래하기 쉽다고 경고한다.

나는 앱의 상태를 관리하기 위해 context를 성공적으로 사용한 프로젝트를 본 적이 있다. 이는 가능한 일이다. 그러나 Redux와 다른 상태 관리 라이브러리들이 이러한 목적으로 만들어진 데에 반해, context는 그런 목적으로 설계된 것이 아니다.

게다가 최근 <a href="https://react-redux.js.org/next/api/hooks" target="_blank">React-Redux 업데이트 사항에 대한 문서</a>를 살펴보면 React hooks는 Redux의 종말을 의미하지 않는다는 걸 알 수 있다. 왜냐면,

## React-Redux도 자체의 hooks가 존재한다!
그렇다. React hooks는 React-Redux 라이브러리에 새로운 활력을 주며, 구현하는데 따르는 고통을 일부 줄여준다는 점에서 '대체'하는 것과는 거리가 멀다.

<a href="https://medium.com/swlh/clean-up-redux-code-with-react-redux-hooks-71587cfcf87a" target ="_blank">다른 글에서 React-Redux의 hooks에 대해 설명했지만</a>, 요점은 이 글에 있다. hooks 이전에는 `mapStateToProps`와 `mapDispatchToProps` 함수를 정의하고 `connect` 함수로 컴포넌트를 감싸고, 맵핑하는 함수에서 지정한 Redux store의 dispatch 함수를 props로 전달하는 Higher Order Component(HOC)을 구현해야 한다.

매우 단순한 카운터 앱(Redux를 사용하기엔 너무 단순하지만 예시를 들기 위해)을 예시로 들어보겠다. 어딘가에 Redux store와 `increment`와 `decrement` 액션 생성자를 정의했다고 가정해보자.(작성된 모든 Redux 코드를 보려면 위에 링크된 글을 보라.)

```js
import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {count, increment, decrement} = this.props;

    return (
      <div>
        <h1>The count is {count}</h1>
        <button onClick={() => increment(count)}>+</button>
        <button onClick={() => decrement(count)}>-</button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  count: store.count
});

const mapDispatchToProps = dispatch => ({
  increment: count => dispatch(actions.increment(count)),
  decrement: count => dispatch(actions.decrement(count))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

넘나 귀찮은 것😢 Redux store에 접근하기 위해 컴포넌트를 Higher Order Component(HOC)로 매번 감싸는 일을 하지 않아도 된다면 얼마나 좋을까? 그런데 그것이 hooks로 가능하다. Hooks는 코드 재사용과 HOC으로 인한 "wrapper hell"을 제거하는 것에 관한 것이다. 아래에 작성된 컴포넌트는 React-Redux hooks를 사용하여 위의 예시와 똑같이 동작하는 함수 컴포넌트다.

```js
import React from 'react';
import * as actions from '../actions/actions';
import {useSelector, useDispatch} from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector(store => store.count);

  return (
    <div>
      <h1>The count is {count}</h1>
      <button onClick={() => dispatch(actions.increment(count))}>+</button>
      <button onClick={() => dispatch(actions.decrement(count))}>-</button>
    </div>
  );
}

export default App;
```

아름답지 않은가? 간략히 설명하자면, `useSelector`를 사용하면 컴포넌트에서 Redux store의 일부를 변수로 저장할 수 있다. `useDispatch`는 정말 간단하다. 단지 dispatch 함수를 전달한다. 무엇보다도 더이상 못생긴 매핑 함수들을 작성하거나 컴포넌트를 `connect` 함수로 감쌀 필요가 없다. 이제 필요한 모든 것들이 컴포넌트에 포함되어 있다. 더 간단히 말해서, 더 읽기 쉽고, 더 잘 정돈되었다. 핵심은,

## React hooks와 Redux를 서로 경쟁적인 기술로 볼 필요가 없다.
이 두 기술은 훌륭하게도 상호 보완적이다. React hooks는 "**Redux를 대체하지 않는다.**" 단지 당신의 React 앱을 새롭고 더 나은 방법으로 정돈시킬 수 있을 뿐이며, Redux를 사용한다면 더 쉽게 connect 된 컴포넌트를 작성할 수 있다.

그러니 제-발 "React hooks가 Redux를 대체할 수 있나요?"라고 물어보지 말았으면 좋겠다.

대신 "어떤 앱을 만드는 것이 좋을까? 상태 관리를 어떻게 하면 좋을까? Redux를 사용하는 것이 괜찮을까, 과하지 않을까? hooks를 사용하는 것이 괜찮을까 클래스 사용을 고수하는 것이 괜찮을까? 만약 Redux와 React hooks를 사용하기로 했다면 어떻게 서로가 상호보완적일 수 있을까?"와 같은 질문들을 스스로에게 하라.