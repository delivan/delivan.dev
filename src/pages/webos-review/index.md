---
title: '2018 공개SW 컨트리뷰톤 WebOS 참여 후기'
date: '2018-10-24'
---

8월 16일부터 <a href="https://contributhon.kr/" target="_blank">2018 공개SW 컨트리뷰톤</a>에 WebOS 프로젝트로 참여해왔고 곧 마감을 달리고 있습니다. 그동안 알게된 것들, 느낀점 등을 정리하고 공유하고자 포스팅 하게 됐습니다.

## 공개SW 컨트리뷰톤?

과기부와 NIPA 주관으로 다양한 공개SW에 참여/기여 해볼 수 있게 하는 해커톤입니다. 각 프로젝트마다 멘토가 있어 멘토를 중심으로 공개SW에 어떻게 참여 혹은 기여하고 협업하는 방식을 배우게 됩니다. 이번년도에는 프로젝트가 굉장히 다양해져서 어떤 걸 참여할지 고민을 많이 했었는데 저는 제일 처음에 관심이 갔던 <a href="http://webosose.org/" target="_blank">WebOS</a> 에 참여하게 됐습니다. Web과 OS가 어떻게 공존할까에 대한 호기심 때문도 있었지만 무엇보다 WebOS 캐릭터가 너무 귀여워서 끌린게 아닌가 싶습니다..ㅎㅎ

<img src="./beanbird.jpeg" alt="beanbird" width="100" /> (너무 귀엽ㅠㅡㅠ)

## WebOS?

WebOS는 한 때 유명했던 스마트폰 제조업체인 Palm에서 만든 Palm OS로 시작해 HP가 인수했다가 현재 LG에 인수된 다사다난한 삶을 살아온 운영체제입니다. 주로 LG의 스마트 TV에 탑재되고 있으며 스마트워치, 스마트냉장고 등등 여러 플랫폼에서 활용하고 있고 올해 3월에 WebOS OSE(Open Source Edition)이 공개되면서 라즈베리파이에서도 구동해 볼 수 있게 됐습니다. 자세한 것은 <a href="http://webosose.org/" target="_blank">WebOS 홈페이지</a>에서 확인하시길 바랍니다. ~~모조리 영어로 되어있는 건 비밀~~    

WebOS 라는 이름을 처음 봤을 때는 '웹 위에서 돌아가는 운영체제' 인가 싶었는데 지금까지 제가 보고 느낀 바로는 '웹 기술을 활용할 수 있는 운영체제' 인 것 같습니다. 즉, HTML, CSS, Javascript를 적극 활용 할 수 있으며 앱을 개발할 때 LG에서 자체적으로 만든 웹 프레임워크인 Enyo와 React를 합친 Enact라는 프레임워크를 제공합니다. React로 웹 앱을 만들어봤고 WebOS에 대해 조금만 공부하신 분이라면 누구나 쉽게 앱을 만들어 볼 수 있습니다. 물론 C, C++과 앱 프레임워크인 Qt로도 개발이 가능합니다.

## WebOS 개발환경 셋팅

개발환경을 셋팅하기 앞서 WebOS를 구동하고 테스트 하기위한 몇 가지 준비물들이 있습니다.
- Raspberry Pi 3 
- 8GB 이상의 microSD 카드(물론 리더기도)
- HDMI 케이블과 모니터
- 키보드와 마우스
- LAN선

WebOS 이미지를 빌드하기 위해선 Linux 머신이 필요하며 Windows와 Mac은 지원하지 않습니다.
운영체제는 Ubuntu 14.04 LTS와 그 이후 버전만 지원합니다.
머신의 스펙은 적어도 CPU가 4코어, RAM이 8GB, 100GB 이상의 저장공간을 필요로 합니다.
또한 Git과 Python이 설치되어 있어야 합니다.

이제 WebOS를 빌드하는 과정을 간략하게 살펴보겠습니다.

1. 빌드에 필요한 소스 받아오기
    ```bash
    $ git clone https://github.com/webosose/build-webos.git
    ```
2. 필요한 Tool 들을 설치
    ```bash
    $ cd build-webos
    $ sudo scripts/prerequisites.sh
    ```
3. 타겟에 따른 빌드 환경 설정 및 소스 받아오기
    ```bash
    $ ./mcf raspberrypi3
    ```
4. 빌드
    ```bash
    $ make webos-image
    ```

위 순서와 코드는 간략한 예시며 클린 빌드하는 방법 등 자세한 것은 역시 <a href="http://webosose.org/discover/setting/building-webos-ose/" target="_blank">홈페이지</a>를 참조해주세요.

## 느낀점

이번 컨트리뷰톤의 목적인 '공개SW 프로젝트에 참여보는 것' 에는 어느정도 달성했지만 실력과 시간이 부족한 탓인지 코드기여까지는 못한게 많이 아쉽고 부끄러웠습니다. 하지만 웹 개발자로서 경험하기 힘든 실제 운영체제의 소스코드와 개발방식, 오픈소스 프로젝트가 어떤 프로세스로 개발이 되는지 등을 알게된 감사한 시간들이었습니다. 멘토님들이 저같이 아무것도 모르는 학생들 챙겨주느라 고생이 많으셨던 것 같습니다..ㅎㅎ 내년에도 참여할 여건이 된다면 또 참여하고 싶고 그동안 열심히 실력을 쌓아야 겠다는 다짐으로 포스팅을 마무리 하겠습니다. 











