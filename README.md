# 개발자를 위한 스터디 모집 플랫폼 : Do-IT

> 4인 팀 프로젝트

<img src='https://github.com/Stendhalsynd/Do-IT/assets/96957774/f65db856-ebea-4401-a1ad-02d92a89b432' width='300' >

## 배포 주소

- [Do IT](3.34.134.92/)
  - EC2 를 통해 배포한 주소

## 프로젝트 기간

> `2023.08.31 ~ 2023.09.14`

# 1. 서비스 소개

## 1. 서비스 설명

### 개요

- 한 줄 소개 : 주니어 개발자로서 평소 관심이 많던 cs 면접이나 스터디에 대해 연습하고 모집하는 환경을 제공하는 플랫폼
- 서비스 명 : 두잇 (Do IT)

## 2. 기획 배경

부트캠프 내에서 역량 향상을 위해 7주간 [React 공식문서 톺아보기 스터디](https://github.com/Stendhalsynd/react-study) 를 진행했다. 언젠가 취업을 위해 모든 개발자가 cs 면접을 대비하고 스터디에 참여하여 역량 향상에 대해 관심이 많을 것이라 생각했고 이를 가능하게 해주는 플랫폼을 만들면 어떨까? 하는 생각으로부터 Do IT 을 기획하게 되었다.

### 목적

- OpenAPI 에 면접관이라는 역할을 부여하여 Do IT 플랫폼을 사용하는 모든 유저들이 CS 면접에 대해 대비할 수 있는 서비스를 제공하자.
- CS 면접 연습을 통해 포인트를 습득하게 하고 스터디 개설, 참여 신청에 이 포인트를 필요로 하게 두어 개설자든, 참여자든 CS 에 대한 공부를 끊임없이 할 수 있도록 하는 시스템을 마련하자.
- 스터디를 개설하고 모집할 수 있는 기능을 제공하자.

## 3. 서비스 화면

### 서비스 화면

<details>

<summary>메인페이지</summary>

![스크린샷 2023-12-13 오전 8 19 30](https://github.com/Stendhalsynd/Do-IT/assets/96957774/df9af52b-eb8c-40a5-b288-8a975ac609b1)

> 목업에 대해서는 피그마 커뮤니티중 Free Clay Mockups, iPhone 12 Free Mockups 를 활용했다.

</details>

<details>

<summary>회원가입 및 로그인</summary>

![스크린샷 2023-12-13 오전 8 19 57](https://github.com/Stendhalsynd/Do-IT/assets/96957774/3aecee3d-901f-4531-85af-9d8daf8e746b)

![](https://velog.velcdn.com/images/qmflf556/post/d4679784-9bd3-45cc-95d0-b899a185ef16/image.png)

![](https://velog.velcdn.com/images/qmflf556/post/ca102e80-62d2-4d38-a0cc-82ac22903ffd/image.gif)

> 플랫폼의 마스코트 캐릭터가 마우스를 따라 얼굴을 움직이도록 애니메이션을 적용했고 로그인, 회원가입시 비밀번호를 입력할때는 보안을 위해 뒤로 돌아보고 눈을 감는 듯한 효과를 주었다.

</details>

<details>

<summary>마이페이지</summary>

![](https://velog.velcdn.com/images/qmflf556/post/e993424d-420d-4d6e-806b-e6a89228ceda/image.png) 

![](https://velog.velcdn.com/images/qmflf556/post/3f4287d0-27cb-45c4-b06f-b9b27069090f/image.gif)

> 마이페이지에선 닉네임, 증빙 링크 (깃허브 혹은 기술블로그 링크)를 수정할 수 있다. 또한 내가 개설한 스터디 목록과 지원한 스터디 목록을 확인할 수 있다. 해당 목록에선 현재 각 스터디가 승인 완료인지 대기중인지 혹은 거절되었는지 상태를 확인할 수 있다.

</details>

<details>

<summary>스터디 목록</summary>

| 피그마 시안 | 작업 결과 |
| --- | --- |
| ![](https://velog.velcdn.com/images/qmflf556/post/d5b57a6c-98f1-468d-a47b-ee851a0e9fa1/image.png) | ![](https://velog.velcdn.com/images/qmflf556/post/6acf7d2c-d6d3-4eae-a265-6564cafc7ebb/image.png) |

> 스터디 목록을 통해 모집 현황, 스터디 제목, 소개글, 관심 IT 분야를 확인할 수 있으며 각 스터디를 클릭하여 세부 페이지로 들어갈 수 있다.

</details>

<details>

<summary>스터디 상세</summary>

`모바일`
![](https://velog.velcdn.com/images/qmflf556/post/1433523a-ce43-48ae-a4c6-5661ac7a49af/image.png)

`웹`
![](https://velog.velcdn.com/images/qmflf556/post/1e19b6c3-4c1e-4cb4-8f6d-8ebadc2637c7/image.png)

`서버 배포 - 지원자`
![](https://velog.velcdn.com/images/qmflf556/post/8b6299a7-501e-43d6-9dbc-e1d7f0ead977/image.gif)

`서버 배포 - 개설자`
![](https://velog.velcdn.com/images/qmflf556/post/4c321261-a5d1-4e27-ab4e-1e946d0171ed/image.gif)

> 스터디 상세 페이지에서는 스터디 개설자와 스터디 참여자가 볼 수 있는 화면이 다르다. 누구나 현재 스터디에 합류한 리더, 참여한 크루원을 확인할 수 있다. 다만 스터디 지원자만 지원하기 / 승인 대기중 / 모집 완료 버튼을 확인할 수 있고 스터디 개설자만 내가 개설한 스터디에 지원한 크루들의 참여 여부를 승낙 / 거절할 수 있다.

</details>

<details>

<summary>스터디 개설</summary>

![](https://velog.velcdn.com/images/qmflf556/post/076d4368-8a4f-44f4-95e4-0655afa58c2c/image.png)

스터디 개설시엔 모집 인원, 관심 분야, 시작, 종료일을 지정할 수 있고 스터디 제목과 소개란을 채우도록 했다.

스터디를 개설 신청하면 슬랙으로 해당 정보를 담은 알림 스레드가 생성된다.

![](https://velog.velcdn.com/images/qmflf556/post/2dae82e3-b6b0-4305-9d82-4fc1db516669/image.png)

링크와 스터디 소개글을 참고하여 운영진은 스터디 개설여부를 결정할 수 있다.

![](https://velog.velcdn.com/images/qmflf556/post/3ec31eed-ae3c-48a3-b336-fbc0159012a4/image.png)

운영진의 결정은 위와 같이 번복할 수 있으며 결정된 사항에 대해 해당 스레드의 댓글을 슬랙봇을 통해 생성하도록 했다.

</details>

<details>

<summary>CS 면접 연습하기</summary>

주제 선택하기와 CS 면접 연습 2가지 기능이 있다.

![](https://velog.velcdn.com/images/qmflf556/post/80a4b8cb-5d58-4ac9-92be-928d3aee90f0/image.png)

먼저 면접 연습할 주제를 선택한다.

![](https://velog.velcdn.com/images/qmflf556/post/d01e678f-ade9-454d-80b2-32bc74624f4d/image.png)

이후 선택한 주제에 대해 `OpenAI API` 를 활용하여 해당 주제에 맞는 면접 질문을 유저에게 보이고 유저의 답변에 대해 즉시 ChatGPT 에 사용되는 OpenAI API 로 피드백을 생성한다.

유저의 답변에 맞춰 한번의 면접 연습을 통해 총 30 포인트까지 획득할 수 있다.

각각의 답변에 대한 피드백을 생성하는데 5초에서 10초 혹은 그 이상 시간이 소요된다. 이 시간을 줄이기 어렵지만 UX 를 위해 중간에 gif 로 로딩동안 보여줄 화면을 구성했다.

![](https://velog.velcdn.com/images/qmflf556/post/7ac89b0c-320f-47be-bfe9-8819f07b28d3/image.png)

</details>

## 설치 라이브러리

- express
- ejs
- sequelize
- sequelize-cli
- mysql2
- @slack/bolt
- dotenv
- cross-env
- uuid
- bcrypt
- jsonwebtoken
- sass
- axios
- aos

# 2. 기술스택

## Frontend

> scss, css, ejs, sweetalert2, aos

## Backend

> node.js, sequelize, mysql, bolt.js, webhook, slackAPI, openAPI

# 3. 파일 구조

<details>

<summary>프론트엔드 프로젝트 구조</summary>

```
├── README.md
├── config/
│   └── config.js
├── controller/
│   ├── CMain.js
│   ├── CStudy.js
│   ├── CUser.js
│   ├── Cinterview.js
│   └── Csocket.js
├── dist/
├── index.js
├── models/
│   ├── MCsSubject.js
│   ├── MQuestionList.js
│   ├── MStudy.js
│   ├── MStudyUser.js
│   ├── MTheme.js
│   ├── MUser.js
│   └── index.js
├── package-lock.json
├── package.json
├── routes/
│   ├── interview.js
│   ├── main.js
│   ├── socket.js
│   ├── study.js
│   └── user.js
├── slack.js
├── static/
│   ├── images/
│   ├── script
│   │   ├── common
│   │   ├── interview
│   │   ├── main
│   │   ├── mypage
│   │   └── study
│   └── style
│       ├── css
│       │   ├── common
│       │   ├── interview
│       │   ├── main
│       │   ├── mypage
│       │   └── study
│       └── scss
│           ├── common
│           ├── helper
│           ├── interview
│           ├── main
│           ├── mypage
│           └── study
├── utils/
│   ├── date.js
│   ├── loading.js
│   └── payload.js
├── views/
│   ├── 404.ejs
│   ├── chat.ejs
│   ├── main.ejs
│   ├── mypage.ejs
│   ├── studydetail.ejs
│   ├── studylist.ejs
│   ├── studyregister.ejs
│   └── subject.ejs
└── slack.js
```

</details>

# 4. 설계 문서

## db 설계

![](https://velog.velcdn.com/images/qmflf556/post/f9fb0f92-e8d1-461e-b0d8-196e3bd504d1/image.png)

db 구조는 miro 를 통해 릴레이션의 어트리뷰트, 관계등을 논의후 바로 sequelize 를 사용하여 model 을 생성해줬다.

## Workflow

![스크린샷 2023-12-13 오전 8 50 31](https://github.com/Stendhalsynd/Do-IT/assets/96957774/a6ec3053-4424-4d48-b7f5-fb3631ebc69b)

## 스크럼 회의록

| 스크럼 기록 | 스크럼 회의록 일부 |
| --- | --- |
| ![](https://velog.velcdn.com/images/qmflf556/post/dd08bc6b-b6fe-415b-b3c6-8ee29272116e/image.png) | ![](https://velog.velcdn.com/images/qmflf556/post/960e81e2-d07d-41ed-9371-814d81da2962/image.png) |

Do IT 팀의 스프린트 주기는 1주일로 잡았다. 이번 프로젝트는 2주로 지난 프로젝트보다 기한이 길었기에 1주 단위 스프린트를 2회로 잡아 두번의 스프린트 회고를 진행하고자 했다.

각 스프린트 회고는 한 주가 지나고 해당 주간 진행했던 GROUND_RULE, 개발 방식, 진행 방식 등에 대해 느낀점, 개선점, 의견등을 공유하고 한주간 해온 일들을 공유하는 식의 회고를 말한다.

이 과정을 통해 1주일마다 팀 단위로 이번 스프린트동안의 개발 방식에 대한 끊임없는 피드백을 받아 더 나은 방식의 개발문화를 형성할 수 있다.

## FIGMA

![스크린샷 2023-12-13 오전 8 52 57](https://github.com/Stendhalsynd/Do-IT/assets/96957774/075bd1cb-8d60-4cca-9ade-b821e5c81b09)

- [figma 링크](https://www.figma.com/file/5qcxByT9Hzdxf3vDC9tXeo/Do-IT?type=design&node-id=0%3A1&mode=design&t=Vt8AEQLEpV1zRoVe-1)

# 5. 결과

![](https://velog.velcdn.com/images/qmflf556/post/a7c6f487-e12a-4977-bc9c-5547fd1036f9/image.png)

[Do IT 깃허브 레포](https://github.com/dawncoding/Do-IT)

[피그마 디자인 바로보기](https://www.figma.com/file/5qcxByT9Hzdxf3vDC9tXeo/Do-IT?type=design&node-id=0%3A1&mode=design&t=mGKIwH5MbULg2URZ-1)

[발표 구글 슬라이드](https://docs.google.com/presentation/d/1xhVMr-46AZJJ4oCyhcoH1-PRfUZg3ZswrbAo0IFRllM/edit?usp=sharing)

[miro db 설계 및 work flow](https://miro.com/app/board/uXjVMp1UPIw=/?share_link_id=141935779765)

| 레포지토리                                               | 블로그 정리글                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Do IT](https://github.com/dawncoding/Do-IT) | [1탄 slackbot 도입을 위한 조사](https://velog.io/@qmflf556/%ED%8F%AC%EC%8A%A4%EC%BD%94x%EC%BD%94%EB%94%A9%EC%98%A8-KDT-Web-8-%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Do-IT-%ED%9A%8C%EA%B3%A01) <br> [2탄 프로젝트 회고](https://velog.io/@qmflf556/%ED%8F%AC%EC%8A%A4%EC%BD%94x%EC%BD%94%EB%94%A9%EC%98%A8-KDT-Web-8-%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Do-IT-%EC%B4%9D%ED%9A%8C%EA%B3%A0) <br> [3탄 slackbot 도입기 정리](https://velog.io/@qmflf556/%ED%8F%AC%EC%8A%A4%EC%BD%94x%EC%BD%94%EB%94%A9%EC%98%A8-KDT-Web-8-%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Do-IT-%EC%8A%AC%EB%9E%99%EB%B4%87-%EC%A0%84%EC%B2%B4-%EC%83%9D%EC%84%B1%EA%B3%BC%EC%A0%95)|


# 6. 팀 소개

## 팀명

> 🔍 안녕하세요! 포스코 x 코딩온 풀스택 웹 개발자 8기 교육생으로 조직된 프로젝트 팀 `Do IT` 입니다. 고민하지 말고 지금 당장 Just Do IT 이라는 의미와 IT 직무에서 일하고 싶은 주니어 개발자들에게 Do IT 라는 의미를 섞어 팀명을 정했습니다.

## 멤버

| <a href="https://github.com/dawncoding"><img src="https://velog.velcdn.com/images/qmflf556/post/23b29140-1247-43f6-a393-6ddaf7a65371/image.png" width="150px"/></a> | <a href="https://github.com/Stendhalsynd"><img src="https://velog.velcdn.com/images/qmflf556/post/19704a5b-0640-4675-b149-abb432c38cd2/image.png" width="150px"/></a> | <a href="https://github.com/best0611"><img src="https://avatars.githubusercontent.com/u/124340520?v=4" width="150px"/></a> | <a href="https://github.com/syxxne"><img src="https://avatars.githubusercontent.com/u/76808245?v=4" width="150px"/></a> |
| --- | --- | --- | --- |
| dawncoding | Stendhalsynd | best0611 | syxxne |
