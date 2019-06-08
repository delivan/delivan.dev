---
title: 'Deview 2018 참관 후기-2'
date: '2018-10-21'
---

1 편에 이어 2 편을 이어가겠습니다.(굳이 1, 2 편을 왜 나눈거지..)

## JavaScript 배틀그라운드로부터 살아남기

- JavaScript 의 출현
  - 웹 페이지를 정적으로 뿐만 아니라 동적으로도 만들 필요에서 시작
  - Java 라는 언어의 마케팅적인 측면(Netscape 와 Sun 간의 협정)으로 JavaScript 라고 명명
  - 표준화를 위해 ECMA(European Computer Manufacturers Association)를 선택, ECMAScript 라고도 지칭
- Evergreen browser 의 출현

  - 자동적으로 버전업이 되는 브라우저를 칭함
  - Chrome 의 등장으로 브라우저의 스펙이 빠르게 지속적으로 변화

- 오늘날의 JavaScript

  - Vanila(기본) JavaScript 개발은 이제 일반적이지 않음
  - 보통 Framework 와 Toolchain(Transpiler, Bundling)을 사용
  - DOM 핸들링을 Framework 에 맡기고 대다수의 기능들은 npm 패키지를 통해 조립하는 형태로 구현
  - Transfiler 의 발달로 ES6+ 이후 ES5 로 컴파일 가능(낮은 버전의 브라우저 지원)

- JavaScript 의 2018 년 동향

  - 브라우저 안에서
    - WebAssembly
      - C, C++ 같은 저수준의 언어를 컴파일 타겟으로 한 프로그램을 웹에서 사용할 수 있게 함
      - 주요 브라우저와 Node.js 모두 지원
    - 정적 타입 시스템
      - JavaScript 의 loose typing 문제를 해결
      - Langauge 로써는 TypeScript, ReasonML, PureScript 가 있음
        - 현재는 TypeScript 가 독점적
      - Tool 로써는 Flow
    - React
      - 버전 16 기준
        - 2017 년에 라이선스 이슈로 골머리를 앓았으나 잘 해결
        - Improved Fragments
        - 새로운 ContextAPI
        - 새로운 Component Lifecycle
        - create-react-app 버전 2 가 릴리즈
      - 가장 많은 커뮤니티를 가지고 있으며 당분간은 1 인자를 지킬 듯
    - Vue
      - 2017 년에 엄청난 주목
      - Ecosystem 발달: Nuxt.js, Vuetify
      - NativeScript 로 앱 개발 가능
      - IE 지원 중단
      - 2019 년에 버전 3 릴리즈 예정
    - Angular
      - Ivy Renderer
      - Angular Elements
      - 글 쓴 기준 Angular 7.0 릴리즈
    - Web Components
      - 모든 Evergreen browser 에서 지원
      - 직접 재사용 가능한 Component 를 만들고 사용할 수 있음
      - 언뜻 보면 React 와 비슷해보일 수 있으나 목표가 다름
        - Web Component 는 직관적이고 재사용 가능한 Component 를 만들 수 있게 하기 위해
        - React 는 Data 와 DOM 이 서로 영향을 줄수 있게 하기 위해
  - 브라우저 밖에서
    - Node.js
      - 주로 Back-end 영역에서 사용
      - 사용하는 기업이 지속적으로 증가
      - N-API: 런타임 엔진과 Node.js 간의 추상화 레이어
      - Node-ChakraCore: Node.js 를 Microsoft Edge 의 JavaScript 엔진의 Core 인 ChakraCore 를 엔진으로 사용
    - npm
      - 전 세계에서 가장 큰 레지스트리로 성장
      - 더이상 Bower 를 사용하지 않아도 될 정도
      - 7 월부터 포럼 전환(더이상 github 이슈를 사용하지 않음)
    - Yarn
      - 현재 약 50 만개의 프로젝트에서 사용
      - yarn 을 통한 패키지의 다운로드는 npm 의 0.03%에 불과
      - 초기의 yarn 의 장점(속도)가 점점 퇴색
    - Webpack
      - 빌드시간이 약 60~98% 감소
      - webpack-cli
      - 너무 많은 Configuration
    - Parcel
      - Webpack 관 다르게 Non-Configuration 번들링 지향
    - NativeScript
      - 웹 기술로 모바일 앱 개발을 위해 등장
      - Angular 친화적, Vue 도 지원
      - AR 및 TV 플랫폼 지원 확산
    - ReactNative
      - 역시 웹 기술로 모바일 앱 개발을 위해 등장
      - 이름 그대로 React 를 사용
      - create-react-native-app 릴리즈
      - TV 플랫폼 지원
    - Electron, NW.js
      - 웹 기술로 데스크톰 앱 개발을 위해 등장
    - PWA
      - 웹의 장점과 앱의 장점을 결합한 환경
      - Safari 와 Edge 지원 추가
      - 다양한 개발 도구 등장
    - WebXR Device API
      - WebVR -> WebXR
      - Immersive Web: 웹에서 몰입 환경 구현
      - 아직은 실험단계

- Javascript 가 가고있는 길

  - Front-end 와 Back-end 의 경계를 흐릿하게 하는 중
  - Node.js 재단과 JavaScript 재단의 병합으로 역할이 다양해지는 중

- Javascript 로 부터 생존하기

  - 요즘 트렌드와 브라우저 업데이트 사항 확인하기
  - State Of JavaScript, JSConf 등 컨퍼런스, 프로젝트에 관심 갖기
  - 프레임워크, 도구들에 너무 의존하지 말 것(결국 JavaScript 로 tranfile 됨)
  - 최신 업데이트 사항을 바로 적용하는 것은 좋지 못함(언제 다시 되돌려질지 모름)
  - 모든 것을 알아야 한다는 생각에 벗어나자
  - '적당한'호기심과 '지속적인'꾸준함을 가지자

- 슬라이드 자료

<iframe src="//www.slideshare.net/slideshow/embed_code/key/nlIUvVSyAqHCTg" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/deview/123javascript" title="[123]JavaScript+배틀그라운드로부터 살아남기" target="_blank">[123]JavaScript+배틀그라운드로부터 살아남기</a> </strong> from <strong><a href="https://www.slideshare.net/deview" target="_blank">NAVER D2</a></strong> </div>

## 파파고 서비스 2 년의 경험

- Priority: 사용자에게 묻기

  - 파파고 출시 전의 타겟 유저는 '해외 여행할 때 사용하는 유저'
  - 파파고 출시 후의 실제 유저는 '외국어 공부할 때 사용하는 유저'
  - 그래서 해외 여행보단 외국어 학습용 기능을 우선적으로 개발

- UX: UX 로 응급처치 하기

  - 기술을 만드는 데 꽤 많은 시간이 필요할 때!
  - 사례 1. OCR 품질 개선
    - OCR 모드에서 사용자의 입력 실패율이 높음
    - 새로운 OCR 엔진의 개발 필요성 대두
    - OCR 엔진을 개발하고 다른 언어까지 추가하려면 많은 시간 필요
    - 개발하는 동안 임시 해결책으로 OCR 입력 오류 보완 수단 제공 => 필기 입력기 사용
  - 사례 2. 인공신경망 번역(NMT)은 비싸요
    - 번역 결과물 출력을 버튼을 누른 후가 아닌 실시간으로 보여주고 싶음
    - 인공신경망 번역(NMT)은 비싸고 속도도 빠르지 않음
    - 그렇다면 새로운 엔진을 개발해야 하는데 역시 시간이 많이 들음
    - 실시간 번역은 품질은 좀 떨어지지만 값싸고 빠른 엔진(SMT), 최종 번역은 품질이 좋은 인공신경망 엔진(NMT)을 쓰자 => 입력중에는 SMT, 일정시간 추가 입력이 없으면 NMT
  - 문제를 재정의함으로써 차선책을 찾아보는게 안하는 것보다 낫다

- Risk: 개편 리스크 줄이기

  - 어떤 서비스든 변화의 폭이 크면 그만큼 반발도 크다
  - 그에 따른 리스크를 줄이고자 시도한 것
  - 네이버 번역기 X 파파고 웹 통합 프로젝트
    - 다양한 부가기능의 네이버 번역기, 간편한 사용성을 강조한 파파고 웹
    - 서로 추구하는 가치가 다르기 때문에 단순 통합은 많은 반발 예상
    - 그래서 선택한 해법은 변화를 쪼개고 또 쪼개기
      1. 스펙을 쪼개어 수차례 업데이트
      2. 네 번으로 쪼갠 사용자 이동
      3. 사용자와의 커뮤니케이션 적극 활용
    - 결과는? 약 9%의 이탈자만이 발생

- Collaboration: 상황에 맞게 변화하기

  - 파파고는 웨일 브라우저, 라인, 클로바등 26 개의 네이버 서비스에 활용되고 있다
  - 다양한 플랫폼에서 비슷한 사용성을 가져야 한다 => 타겟에 따라 사용성 최적화
  - 결국 파파고 홍보..ㅎㅎ

- Culture: 파파고가 일하는 방법

  - 초기에는 수직적인 방식인 Rank Driven 방식을 채택
  - 현재는 수평적인 방식인 Role Driven 방식을 채택
  - 각 방식마다 장단점이 존재
  - Rank Driven 은 정해진 상품을 빠르게 개발하는데 효과적, 하지만 창조적인 기능을 구현하기 어렵다.
  - Role Driven 은 다양하고 혁신적인 상품을 개발하는데 효과적, 하지만 각 실무자의 책임이 커져 실무자가 못한다면 결과가 좋지 않다.
  - 각 상황에 맞는 의사결정 방식과 함께 일하는 문화가 중요

- 슬라이드 자료

<iframe src="//www.slideshare.net/slideshow/embed_code/key/acmHxSflTHI4pJ" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/deview/114-2-119060828" title="[114]파파고 서비스 2년의 경험" target="_blank">[114]파파고 서비스 2년의 경험</a> </strong> from <strong><a href="https://www.slideshare.net/deview" target="_blank">NAVER D2</a></strong> </div>

## 웹 성능 최적화에 필요한 브라우저의 모든 것

- 브라우저는 어떻게 동작하나
  1. HTML 문서를 파싱하여 DOM Tree 생성
  2. CSS 를 파싱한 CSSOM 을 DOM Tree 에 반영하여 Render Tree 생성
  3. JavaScript 코드가 파싱되어 byte code 가 되고 machine code 가 되어 실행
     - v8 엔진과 webkit 이 위와 같은 방법으로
  4. Render Tree 노드(Box)들의 좌표 계산(Layout)
     - w3c 의 CSS 2.1 을 표준으로 노드 좌표를 계산
     - 가장 랭크가 높은 노드(예를 들면 body 태그)의 viewport 는 window 의 viewport 로 계산
     - Global layout: 전체 다 레이아웃팅 ex) 브라우저 윈도우창을 움직일때
     - Incremental layout: 부분 레이아웃팅
     - display 에서 block 은 단순히 밑으로 쌓는것 inline 은 옆으로 쌓는것
  5. 렌더링에 사용될 최종 Layer 생산
  6. Layer 들을 브라우저에 Paint 하며 합성(Composite)
     - 브라우저의 페인팅은 프린터기가 종이를 프린트하는 것과 같은 원리라 생각

* 브라우저는 어떻게 한 프레임을 만드나

  - 60Hz 의 의미는 모니터가 16.6ms 단위로 Frame Buffer 의 내용을 fetch 하는 것!
  - 이 16.6ms 를 Vsync time 이라 하는데 이 안에 위의 1~6 까지의 과정이 일어나야 매끄러운 애니메이션을 구현할 수 있음
  - 이전엔 Main Thread 내에서만 위의 브라우저 동작이 진행되야 했다
    - HTML, CSS, JS 처리가 서로 유기적으로 관계가 있기 때문에 async 하게 처리할 수 없었음
  - 어떻게 해결했나?
    1. Composite 과정을 다른 thread 에서 => 그로인해 scroll 작업도 compositor thread 에서
    2. 페인팅하는 과정은? Rasterizer Thread 에서 => 예를 들어 Main Thread 에서 canvas.drawRect()하면 바로 그리지않고 record 를 하고 따로 Rasterizer Thread 에서 그린다.

* Vsync 기반의 브라우저 Processing

  - 렌더러 프로세스는 보안상의 이유로 cpu 와 메모리에만 접근하기 때문에 gpu 처리는 gpu processor 를 따로 둬서 처리하게 한다.
  - Vsync 틱과 다음 Vsync 틱의 간격의 16.6ms 가 가장 적당하다
  - 만약 Input 이 Vsync 틱 이후에 들어온다면 먼저 input 이 처리되고 Vsync 틱이 시작되도록 한다
  - 만약 Vsync 틱 간격에 모든 처리를 완료하고 시간이 남으면 못 다한 Garbage Collection Task 와 Callback Task 를 처리한다
  - chrome://tracing 처럼 whale 에서도 whale://tracing 이 가능하고 이 기능으로 프레임이 Vsync time 내에 잘 그려지는 확인 할 수 있다

* 렌더링 파이프라인 비용 줄이기

  - 웹 서비스 성능 최적화를 할때 어떤 파이프라인에 손대는 것이 최적화에 도움이 되는가에 관심을 가지자(Layout 과정인지 Paint 과정인지 Composite 과정인지)
  - Layout 과정
    - 대략 1000 개 이하의 DOM Elements 가 효율적
    - 애니메이션은 transform 이나 web animations 를 사용
  - Paint 과정
    - GPU 가속을 사용하면 대략 10 배 빨라짐
    - `<meta name="viewport" />`을 추가하면 gpu rasterize 하기때문에 렌더링 속도가 빨라짐
  - Composite 과정
    - Layer 가 많으면 많을수록 메모리를 많이 사용하고 느려짐
    - 대략 30 개의 layer 가 효율적

* 슬라이드 자료

<iframe src="//www.slideshare.net/slideshow/embed_code/key/H26669CDu0aDPI" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/deview/125-119068291" title="[125]웹 성능 최적화에 필요한 브라우저의 모든 것" target="_blank">[125]웹 성능 최적화에 필요한 브라우저의 모든 것</a> </strong> from <strong><a href="https://www.slideshare.net/deview" target="_blank">NAVER D2</a></strong> </div>
