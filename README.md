# Trip:lener
여행 플래너 사이트 Trip:lener의 프론트엔드 프로젝트입니다

## How to start
1. node.js를 설치 후 PATH 설정을 완료합니다.
2. npm update를 통해 package를 받아옵니다.

## Description
- /src/setupProxy.js 
    - proxy 설정 관련 파일
    - 배열에 원하는 경로들을 프록시를 통해 우회 접속하도록 설정할 수 있습니다.
    - 이렇게 하는 이유는 CORS를 피하기 위해서입니다.
    - 전체 경로로 프록시를 설정할 경우, 메인 페이지와 다른 페이지도 백엔드쪽 페이지로 리다이렉트 되므로 하지 마십시오.

- /src/App.jsx
    - 메인 페이지의 파일입니다.
        - 실제 개발시, 구조는 변경될 예정입니다.

- ...