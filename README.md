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
    - 전체 경로로 프록시를 설정할 경우, 문제가 발생하므로, 