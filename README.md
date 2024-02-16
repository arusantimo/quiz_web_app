# 퀴즈 웹앱 입니다.

해당 저장소 코드는 과제 제출용으로 작업한 것이므로, 실제 사용하지 않습니다.

## 앱 구동 방식

앱 구동 방식은 다음과 같습니다:

1. 사용자가 앱을 실행하면, 초기 상태로 설정된 퀴즈 데이터와 시퀀스 번호, 총 경과 시간을 가진 상태 객체가 생성됩니다.
2. 사용자는 퀴즈를 풀면서 정답을 선택하고 제출할 수 있습니다.
3. 사용자가 정답을 제출하면, 해당 문제의 정답 여부를 확인하고 상태 객체를 업데이트합니다.
4. 모든 문제의 정답을 제출하면, 시퀀스 번호를 -1로 설정하여 퀴즈 진행을 종료합니다.
5. 사용자는 퀴즈 진행 중에 메모를 작성할 수 있습니다.
6. 사용자는 퀴즈 진행 중에 다른 문제로 이동할 수 있습니다.
7. 사용자가 퀴즈를 완료하면, 총 경과 시간을 업데이트합니다.

## 주요 컴포넌트 동작

1. useTimer 훅을 사용하여 경과 시간을 관리합니다.
2. QuizStateProvider 컴포넌트를 사용하여 퀴즈 상태를 관리합니다.
3. QuizSequence 컴포넌트를 사용하여 퀴즈 진행 상태에 따라 UI를 렌더링합니다.
4. QuizStateProvider 컴포넌트를 사용하여 퀴즈 상태를 제공합니다.
5. useQuizState 커스텀 훅을 사용하여 퀴즈 상태와 디스패치 함수를 가져옵니다.

## 사용 기술 정리

- React
- TypeScript
- tailwindcss
- radix-ui
