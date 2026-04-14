import { useCallback, useEffect, useState } from 'react'
import './App.css'

type SectionDef = {
  id: string
  navLabel: string
  title: string
  body?: string | readonly string[]
  variant: 'hero' | 'character' | 'world' | 'artifact' | 'roadmap' | 'sns' | 'footer'
}

const SECTIONS: SectionDef[] = [
  {
    id: 'page1',
    navLabel: '페이지1',
    title: '페이지1',
    body: ['풀페이지 스크롤 샘플의 첫 번째 화면입니다.', '아래로 스크롤하면 다음 페이지로 넘어갑니다.'],
    variant: 'hero',
  },
  {
    id: 'page2',
    navLabel: '페이지2',
    title: '페이지2',
    body: ['두 번째 섹션 샘플 내용입니다.', '제목·문구는 실제 서비스에 맞게 바꿔 쓰시면 됩니다.'],
    variant: 'character',
  },
  {
    id: 'page3',
    navLabel: '페이지3',
    title: '페이지3',
    body: ['세 번째 섹션입니다.', '우측 도트나 상단 메뉴로도 이동할 수 있습니다.'],
    variant: 'world',
  },
  {
    id: 'page4',
    navLabel: '페이지4',
    title: '페이지4',
    body: ['네 번째 섹션 샘플입니다.', '배경 색은 CSS에서 섹션별로 지정되어 있습니다.'],
    variant: 'artifact',
  },
  {
    id: 'page5',
    navLabel: '페이지5',
    title: '페이지5',
    body: ['다섯 번째 섹션입니다.', '데모·프로토타입 공개용 placeholder 텍스트입니다.'],
    variant: 'roadmap',
  },
  {
    id: 'page6',
    navLabel: '페이지6',
    title: '페이지6',
    body: ['여섯 번째 섹션입니다.', 'SNS·링크 영역은 아래 pill 형태로 표시할 수 있습니다.'],
    variant: 'sns',
  },
  {
    id: 'page7',
    navLabel: '페이지7',
    title: '페이지7',
    body: ['마지막 섹션입니다.', '이용약관·문의 등 푸터성 문구를 두기 좋은 위치입니다.'],
    variant: 'footer',
  },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function PanelBodies({ body }: { body: string | readonly string[] }) {
  const parts = Array.isArray(body) ? body : [body]
  return (
    <>
      {parts.map((p, i) => (
        <p key={i} className="panel__body">
          {p}
        </p>
      ))}
    </>
  )
}

export default function App() {
  const [active, setActive] = useState(0)

  const onObserve = useCallback(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const i = SECTIONS.findIndex((s) => s.id === e.target.id)
          if (i >= 0) setActive(i)
        }
      },
      { root: null, threshold: 0.45, rootMargin: '-12% 0px -12% 0px' },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    return onObserve()
  }, [onObserve])

  return (
    <>
      <a className="skip" href="#page1">
        본문으로 건너뛰기
      </a>

      <header className="gnb" role="banner">
        <div className="gnb__brand">Fullpage Sample</div>
        <nav className="gnb__nav" aria-label="주요 메뉴">
          {SECTIONS.slice(0, 5).map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={active === i ? 'is-active' : undefined}
              onClick={() => scrollToId(s.id)}
            >
              {s.navLabel}
            </button>
          ))}
        </nav>
        <button type="button" className="gnb__play" onClick={() => scrollToId('page5')}>
          페이지5
        </button>
      </header>

      <nav className="dots" aria-label="섹션 이동">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={active === i ? 'is-active' : undefined}
            aria-current={active === i ? 'true' : undefined}
            aria-label={s.navLabel}
            onClick={() => scrollToId(s.id)}
          />
        ))}
      </nav>

      <main>
        {SECTIONS.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className={`panel panel--${s.variant}`}
            aria-labelledby={`${s.id}-heading`}
          >
            <div className="panel__inner">
              <h2 id={`${s.id}-heading`} className="panel__title">
                {s.title}
              </h2>
              {s.body && <PanelBodies body={s.body} />}
              {s.variant === 'hero' && (
                <div className="panel__actions">
                  <button type="button" className="btn btn--primary">
                    기본 버튼
                  </button>
                  <button type="button" className="btn btn--ghost">
                    보조 버튼
                  </button>
                </div>
              )}
              {s.variant === 'sns' && (
                <div className="sns-row" role="list">
                  {['링크1', '링크2', '링크3', '링크4'].map((name) => (
                    <span key={name} className="sns-pill" role="listitem">
                      {name}
                    </span>
                  ))}
                </div>
              )}
              {s.variant === 'footer' && (
                <p className="panel__legal">
                  샘플 페이지입니다. 실제 서비스명·약관·연락처로 교체해 사용하세요.
                </p>
              )}
            </div>
          </section>
        ))}
      </main>
    </>
  )
}
