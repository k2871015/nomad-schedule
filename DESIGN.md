# DESIGN.md

## 1️⃣ Overview
- **브랜드 성격**: 프리미엄(Premium), 신비로움(Mystical), 동적인(Dynamic), 현대적인(Modern)
- **전체 디자인 톤**: 다크 테마 기반의 세련된 글래스모피즘(Glassmorphism) 스타일. 사주와 운세, 게임 추천을 제공하는 신비롭고 고급스러운 분위기.
- **핵심 특징**: 투명도와 블러를 활용한 깊이감(Depth), 생동감 있는 마이크로 애니메이션, 시선을 사로잡는 비비드한 포인트 컬러(Vibrant Colors).

## 2️⃣ Colors
모든 색상은 토큰 형태로 관리하며, 다크 테마를 기본으로 합니다.

- **Brand Colors**
  - `{colors.primary}` — `#8A2BE2` (비비드 퍼플, 신비로움 강조)
  - `{colors.secondary}` — `#FF1493` (딥 핑크, 포인트 액센트)
  - `{colors.accent}` — `#00FFFF` (시안, 게임/인터랙션 요소)
- **Surface Colors (Glassmorphism)**
  - `{colors.surface.base}` — `rgba(25, 25, 35, 0.65)` (반투명 다크 그레이)
  - `{colors.surface.hover}` — `rgba(45, 45, 60, 0.8)`
  - `{colors.surface.active}` — `rgba(60, 60, 80, 0.9)`
  - `{colors.background}` — `#0B0B12` (매우 어두운 네이비/블랙)
- **Text Colors**
  - `{colors.text.primary}` — `#FFFFFF` (순백색, 높은 대비)
  - `{colors.text.secondary}` — `#B4B4C8` (연한 그레이, 보조 텍스트)
  - `{colors.text.muted}` — `#78788C` (비활성 텍스트)
- **Border Colors**
  - `{colors.border.light}` — `rgba(255, 255, 255, 0.1)` (글래스모피즘 테두리)
  - `{colors.border.focus}` — `rgba(138, 43, 226, 0.5)` (포커스 상태)

## 3️⃣ Typography
기본 폰트는 가독성이 뛰어난 `Inter`와 세련된 느낌의 `Outfit`을 혼합하여 사용합니다.

| Token | Font Family | Size | Weight | Line Height | Letter Spacing |
| --- | --- | --- | --- | --- | --- |
| `{typography.h1}` | `Outfit`, sans-serif | `48px` | `700` (Bold) | `1.2` | `-0.02em` |
| `{typography.h2}` | `Outfit`, sans-serif | `36px` | `600` (SemiBold) | `1.3` | `-0.01em` |
| `{typography.h3}` | `Outfit`, sans-serif | `24px` | `600` (SemiBold) | `1.4` | `0em` |
| `{typography.body.lg}` | `Inter`, sans-serif | `18px` | `400` (Regular) | `1.6` | `0em` |
| `{typography.body.md}` | `Inter`, sans-serif | `16px` | `400` (Regular) | `1.6` | `0em` |
| `{typography.body.sm}` | `Inter`, sans-serif | `14px` | `400` (Regular) | `1.5` | `0.01em` |
| `{typography.label}` | `Inter`, sans-serif | `12px` | `500` (Medium) | `1.4` | `0.02em` |

## 4️⃣ Layout
일관된 스페이싱 체계와 여백 철학을 유지합니다.

- **Spacing Tokens**
  - `{spacing.xs}` — `4px`
  - `{spacing.sm}` — `8px`
  - `{spacing.md}` — `16px`
  - `{spacing.lg}` — `24px`
  - `{spacing.xl}` — `32px`
  - `{spacing.2xl}` — `48px`
  - `{spacing.3xl}` — `64px`
- **Grid & Layout**
  - 최대 컨테이너 너비: `1200px` (`{layout.container.max}`)
  - 기본 그리드: 12-column grid (`gap: {spacing.lg}`)
  - 섹션 간 여백: `{spacing.3xl}` 이상 사용하여 숨 쉴 공간(Whitespace) 확보.

## 5️⃣ Elevation & Depth
글래스모피즘과 그림자를 통해 UI의 깊이(Z-axis)를 표현합니다.

- **Glassmorphism (Blur)**
  - `{backdrop.blur.sm}` — `blur(8px)` (작은 컴포넌트, 툴팁)
  - `{backdrop.blur.md}` — `blur(16px)` (기본 카드, 네비게이션)
  - `{backdrop.blur.lg}` — `blur(24px)` (모달, 중요 팝업)
- **Shadows**
  - `{shadow.sm}` — `0 4px 6px rgba(0, 0, 0, 0.3)`
  - `{shadow.md}` — `0 8px 12px rgba(0, 0, 0, 0.4)`
  - `{shadow.lg}` — `0 16px 24px rgba(0, 0, 0, 0.5)`
  - `{shadow.glow}` — `0 0 15px rgba(138, 43, 226, 0.6)` (강조 요소 빛 번짐 효과)

## 6️⃣ Shapes
UI 요소의 모서리 둥글기(Border-radius) 체계입니다.

- `{radius.sm}` — `8px` (인풋, 태그, 작은 버튼)
- `{radius.md}` — `12px` (일반 버튼, 드롭다운)
- `{radius.lg}` — `20px` (카드, 모달 창)
- `{radius.full}` — `9999px` (원형 프로필, 알약 형태 버튼)

## 7️⃣ Components

- **Buttons**
  - **Primary**: 배경색 `{colors.primary}`, 글자색 `{colors.text.primary}`, 호버 시 `{shadow.glow}` 및 스케일 업(`transform: scale(1.05)`).
  - **Secondary**: 글래스모피즘 배경 `{colors.surface.base}`, 테두리 `{colors.border.light}`, 호버 시 배경색 `{colors.surface.hover}`.
  - 패딩: `padding: {spacing.sm} {spacing.lg}`.
- **Cards (운세/게임 결과 등)**
  - 배경: `{colors.surface.base}`, 블러 `{backdrop.blur.md}`, 테두리 `{colors.border.light}`.
  - 여백: 내부 패딩 `{spacing.lg}`, 모서리 `{radius.lg}`.
  - 인터랙션: 호버 시 Y축 이동(`transform: translateY(-4px)`), 테두리 색상 `{colors.primary}`로 부드럽게 변경.
- **Navigation**
  - 고정(Sticky) 헤더, 스크롤 시 블러 `{backdrop.blur.lg}` 활성화.
- **Inputs**
  - 배경: 투명, 전체 `{radius.sm}` 테두리.
  - 포커스 시 테두리 `{colors.border.focus}`, 부드러운 전환 효과 `0.3s ease`.

## 8️⃣ Do’s and Don’ts
**✅ Do's (반드시 지킬 것)**
- 모든 상호작용 요소(버튼, 링크, 카드)에 마이크로 애니메이션(hover, active)을 적용해 생동감을 부여할 것.
- 다크 모드에 어울리는 선명하고 조화로운 포인트 컬러(Vibrant Colors)를 적재적소에 사용할 것.
- 글래스모피즘 사용 시 가독성을 위해 텍스트 뒤에는 충분한 명도 대비를 확보할 것.
- 여백(`spacing` 토큰)을 아낌없이 사용하여 쾌적하고 프리미엄한 느낌을 유지할 것.

**❌ Don’ts (절대 하지 말 것)**
- 원색(순수 빨강 `#FF0000`, 순수 파랑 `#0000FF` 등)을 그대로 사용하지 말 것. 반드시 조색된 컬러를 사용할 것.
- 복잡한 정보를 빽빽하게 배치하거나 카드를 과도하게 중첩(Nested Cards)하지 말 것. (Cardocalypse 지양)
- 읽기 힘든 화려한 그라데이션이나 그림자를 텍스트에 과도하게 넣지 말 것.
- 버튼과 텍스트 대비(Contrast)가 낮은 색상 조합을 사용하지 말 것.

## 9️⃣ Responsive
- **Breakpoints**
  - `{breakpoint.sm}` — `640px` (Mobile)
  - `{breakpoint.md}` — `768px` (Tablet)
  - `{breakpoint.lg}` — `1024px` (Desktop)
- **Touch Targets**
  - 모바일 환경에서 모든 클릭 가능한 요소는 최소 `44px` x `44px` 크기를 유지할 것.
- **반응형 전략**
  - 데스크탑에서는 다단 그리드(Multi-column)를 사용하고, 모바일에서는 1단(Single-column) 레이아웃으로 부드럽게 전환되도록 설계.

## 🔟 Known Gaps
- 에러 상태(Error) 및 성공 상태(Success)에 대한 구체적인 컬러/아이콘 토큰이 부족함.
- 로딩 스피너(Loading Spinners)와 스켈레톤 UI(Skeleton UI)에 대한 애니메이션 타이밍 규칙이 정의되지 않음.
