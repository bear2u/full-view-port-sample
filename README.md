# Fullpage Scroll 샘플

스크롤할 때마다 화면 단위(풀뷰포트)로 넘어가는 **풀페이지 스크롤** 데모입니다. 상단 내비게이션·우측 도트로 섹션 이동이 가능합니다.

## 사용한 기술·도구

| 구분 | 내용 |
|------|------|
| **런타임** | [React](https://react.dev/) 19.x |
| **언어** | [TypeScript](https://www.typescriptlang.org/) |
| **빌드·개발 서버** | [Vite](https://vite.dev/) 8.x |
| **React 통합** | [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) (Babel 기반 Fast Refresh) |

### 의존성 (`dependencies`)

- `react`, `react-dom` — UI 구성

### 개발 의존성 (`devDependencies`)

- `vite`, `@vitejs/plugin-react` — 번들·HMR
- `typescript`, `@types/react`, `@types/react-dom`, `@types/node` — 타입 검사
- `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals` — 린트

### 별도 UI 라이브러리 없음

풀페이지 동작은 **fullPage.js 등 외부 스크롤 라이브러리를 쓰지 않고**, 브라우저 기본 기능만 사용합니다.

- **CSS [scroll-snap](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_scroll_snap)** — `scroll-snap-type`, `scroll-snap-align`, `scroll-snap-stop`으로 섹션 단위 스냅
- **[Intersection Observer API](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)** — 현재 보이는 섹션 판별 → 상단 메뉴·도트 활성 상태 동기화

스타일은 일반 **CSS** (`src/App.css`, `src/index.css`)이며, 폰트는 `index.css`에서 Google Fonts(Cinzel, Noto Sans KR)를 불러옵니다.

## 개발 방식 요약

1. **React + Vite 공식 템플릿**(`react-ts`)으로 프로젝트 생성
2. `App.tsx`에서 섹션 데이터 배열 + `IntersectionObserver`로 활성 인덱스 관리
3. 각 섹션은 `min-height: 100dvh` + 스크롤 스냅으로 풀스크린 느낌 구현
4. 샘플 콘텐츠는 페이지1~페이지7 placeholder (제목·본문은 `SECTIONS`에서 수정)

## 스크립트

```bash
npm install          # 의존성 설치 (전역 npm 캐시 권한 오류 시: npm install --cache ./.npm-cache)
npm run dev          # 개발 서버
npm run build        # 타입 검사 + 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
npm run lint         # ESLint
```

## 폴더 구조 (요지)

```
src/
  App.tsx      # 섹션·내비·도트
  App.css      # 레이아웃·패널·스냅 관련 스타일
  index.css    # 전역 스크롤 스냅·폰트
  main.tsx
```

## 라이선스

비공개(`private`) 샘플 프로젝트입니다. 필요 시 저장소 정책에 맞게 라이선스를 추가하세요.
