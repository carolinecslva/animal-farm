
import { useState, useEffect, useRef } from 'react'
function Arrow({ direction = 'up-right', className = '' }) {
  const arrows = {
    'up-right': '↗',
    right: '→',
    left: '←',
    down: '↓',
    up: '↑',
    plus: '+',
    minus: '−',
  }

  return (
    <span className={className} aria-hidden="true">
      {arrows[direction] || '↗'}
    </span>
  )
}
import './Propaganda.css'

const methods = [
  {
    id: 1,
    title: 'Language & Persuasion',
    category: 'THE POWER OF WORDS',
    period: 'THROUGHOUT THE STORY',
    image: '/images/language-persuasion.png',
    imageAlt:
      'Squealer speaking through a megaphone to the animals',

    description:
      'Squealer uses persuasive language to manipulate the animals and justify Napoleon’s decisions.',

    explanation:
      'By using carefully chosen words, emotional arguments and misleading explanations, Squealer makes unfair decisions appear necessary for the good of the farm.',

    example:
      'Squealer convinces the animals that the pigs need milk and apples to maintain their health and leadership.',

    significance:
      'Language becomes a tool of control when those in power decide what information others receive and how they interpret it.',
  },

  {
    id: 2,
    title: 'Fear & Intimidation',
    category: 'THE POWER OF FEAR',
    period: 'THROUGHOUT THE STORY',
    image: '/images/fear-intimidation.png',
    imageAlt:
      'Napoleon’s guard dogs intimidating the other farm animals',

    description:
      'Napoleon uses fear, threats and violence to discourage resistance and maintain his authority.',

    explanation:
      'The dogs represent physical intimidation. Their presence makes the animals afraid to question Napoleon, even when his decisions contradict the original ideals of the rebellion.',

    example:
      'Napoleon uses his trained dogs to expel Snowball and later to intimidate animals who might oppose him.',

    significance:
      'Fear prevents independent thinking and allows authoritarian leadership to grow without meaningful opposition.',
  },

  {
    id: 3,
    title: 'Rewriting History',
    category: 'THE POWER OF INFORMATION',
    period: 'THROUGHOUT THE STORY',
    image: '/images/rewriting-history.png',
    imageAlt:
      'A pig changing the commandments while confused animals watch',

    description:
      'The pigs change the rules and reinterpret past events to protect their power.',

    explanation:
      'As the story progresses, the Seven Commandments are gradually altered. The animals begin to doubt their memories and accept the pigs’ version of events.',

    example:
      'Snowball is transformed from a hero of the rebellion into a supposed enemy of Animal Farm. The commandments are also modified to justify the pigs’ privileges.',

    significance:
      'Controlling the past makes it easier to control the present, especially when people cannot verify what was originally said or promised.',
  },

  {
    id: 4,
    title: 'The Cult of Napoleon',
    category: 'THE POWER OF IMAGE',
    period: 'THROUGHOUT THE STORY',
    image: '/images/cult-of-napoleon.png',
    imageAlt:
      'Napoleon standing above the animals surrounded by propaganda banners',

    description:
      'Napoleon is presented as an extraordinary and infallible leader who deserves admiration and obedience.',

    explanation:
      'Through ceremonies, praise, slogans and exaggerated achievements, Napoleon becomes the central symbol of the farm. His image is carefully constructed to discourage criticism.',

    example:
      'Napoleon receives special titles and is publicly praised for the farm’s successes, even when the animals themselves have done the work.',

    significance:
      'The glorification of a single leader replaces collective ideals with personal loyalty and unquestioning obedience.',
  },
]

/* ==========================================
   REUSABLE PROPAGANDA DETAIL
========================================== */

function PropagandaDetail({
  method,
  mobile = false,
}) {
  return (
    <article
      className={`propaganda-card ${
        mobile ? 'propaganda-card-mobile' : ''
      }`}
    >

      {/* CARD HEADER */}

      {!mobile && (
        <div className="propaganda-card-header">
          <span>{method.category}</span>

          <span>
            {String(method.id).padStart(2, '0')}
            {' / '}
            {String(methods.length).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* ILLUSTRATION */}

      <div className="propaganda-card-visual">
        <img
          key={method.image}
          src={method.image}
          alt={method.imageAlt}
          className="propaganda-illustration"
          loading="lazy"
        />
      </div>

      {/* CARD CONTENT */}

      <div className="propaganda-card-content">

        <p className="propaganda-card-period">
          {method.period}
        </p>

        {!mobile && <h3>{method.title}</h3>}

        {mobile && (
          <span className="propaganda-mobile-category">
            {method.category}
          </span>
        )}

        <p className="propaganda-card-description">
          {method.description}
        </p>

        <p className="propaganda-card-explanation">
          {method.explanation}
        </p>

        <div className="propaganda-card-example">
          <span>EXAMPLE FROM THE BOOK</span>

          <p>{method.example}</p>
        </div>

        <div className="propaganda-card-significance">
          <span>WHY IT MATTERS</span>

          <p>{method.significance}</p>
        </div>

      </div>
    </article>
  )
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export default function Propaganda() {
  const [activeIndex, setActiveIndex] = useState(0)

  const [expandedIndex, setExpandedIndex] =
    useState(null)

  const mobileCards = useRef([])
  const shouldScroll = useRef(false)

  const activeMethod = methods[activeIndex]

  /* ==========================================
     AUTOMATIC MOBILE SCROLL
  ========================================== */

  useEffect(() => {
    if (
      !shouldScroll.current ||
      expandedIndex === null
    ) {
      return
    }

    if (
      !window.matchMedia('(max-width: 900px)').matches
    ) {
      shouldScroll.current = false
      return
    }

    const frame = requestAnimationFrame(() => {
      const card = mobileCards.current[expandedIndex]

      if (card) {
        const navigation =
          document.querySelector('.navigation')

        const navigationHeight =
          navigation?.getBoundingClientRect().height || 0

        const top =
          card.getBoundingClientRect().top +
          window.scrollY -
          navigationHeight -
          16

        const reducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches

        window.scrollTo({
          top: Math.max(0, top),
          behavior: reducedMotion ? 'instant' : 'smooth',
        })
      }

      shouldScroll.current = false
    })

    return () => cancelAnimationFrame(frame)
  }, [expandedIndex])

  /* ==========================================
     EVENT SELECTION
  ========================================== */

  const selectDesktopMethod = (index) => {
    setActiveIndex(index)
    setExpandedIndex(index)
  }

  const selectMobileMethod = (index) => {
    if (expandedIndex === index) {
      shouldScroll.current = false
      setExpandedIndex(null)
      return
    }

    shouldScroll.current = true

    setActiveIndex(index)
    setExpandedIndex(index)
  }

  const navigateToMethod = (index) => {
    if (index < 0 || index >= methods.length) {
      return
    }

    shouldScroll.current = true

    setActiveIndex(index)
    setExpandedIndex(index)
  }

  return (
    <section
      className="propaganda-section"
      id="propaganda"
    >
      <div className="propaganda-container">

        {/* SECTION INTRODUCTION */}

        <div className="propaganda-intro">
          <p className="propaganda-eyebrow">
            02 / UNDERSTANDING POWER
          </p>

          <h2>
            Propaganda:
            <br />
            <em>A Continuous Tool of Control.</em>
          </h2>

          <p className="propaganda-description">
            In Animal Farm, propaganda is not a single event.
            It is a continuous strategy that helps Napoleon
            maintain power throughout the story.
          </p>
        </div>

        {/* ==========================================
            DESKTOP LAYOUT
        ========================================== */}

        <div className="propaganda-layout propaganda-desktop">

          <div className="propaganda-menu">

            <p className="propaganda-menu-label">
              FOUR METHODS OF CONTROL
            </p>

            <div className="propaganda-methods">
              {methods.map((method, index) => (
                <button
                  key={method.id}
                  type="button"
                  className={`propaganda-method ${
                    activeIndex === index ? 'active' : ''
                  }`}
                  onClick={() =>
                    selectDesktopMethod(index)
                  }
                  aria-pressed={activeIndex === index}
                >

                  <span className="propaganda-method-number">
                    {String(method.id).padStart(2, '0')}
                  </span>

                  <span className="propaganda-method-title">
                    {method.title}
                  </span>

                  <Arrow
                    className="propaganda-method-arrow"
                    size={21}
                  />

                </button>
              ))}
            </div>

          </div>

          {/* SELECTED METHOD */}

          <PropagandaDetail
            key={activeIndex}
            method={activeMethod}
          />

        </div>

        {/* ==========================================
            MOBILE ACCORDION
        ========================================== */}

        <div className="propaganda-mobile">

          <div className="propaganda-mobile-hint">
            <span>FOUR METHODS OF CONTROL</span>

            <Arrow direction="down" size={18} />
          </div>

          <div className="propaganda-mobile-stack">

            {methods.map((method, index) => {
              const isExpanded =
                expandedIndex === index

              return (
                <div
                  key={method.id}
                  ref={(element) => {
                    mobileCards.current[index] = element
                  }}
                  className={`propaganda-mobile-item ${
                    isExpanded ? 'is-expanded' : ''
                  }`}
                >

                  {/* ACCORDION HEADER */}

                  <button
                    type="button"
                    id={`propaganda-trigger-${index}`}
                    className={`propaganda-mobile-trigger ${
                      isExpanded ? 'active' : ''
                    }`}
                    onClick={() =>
                      selectMobileMethod(index)
                    }
                    aria-expanded={isExpanded}
                    aria-controls={`propaganda-panel-${index}`}
                  >

                    <span className="propaganda-mobile-number">
                      {String(method.id).padStart(2, '0')}
                    </span>

                    <span className="propaganda-mobile-title">

                      <small>{method.category}</small>

                      <strong>{method.title}</strong>

                    </span>

                    <span className="propaganda-mobile-icon">
                      <Arrow
                        direction={
                          isExpanded ? 'minus' : 'plus'
                        }
                        size={16}
                      />
                    </span>

                  </button>

                  {/* EXPANDABLE CONTENT */}

                  <div
                    id={`propaganda-panel-${index}`}
                    role="region"
                    aria-labelledby={`propaganda-trigger-${index}`}
                    hidden={!isExpanded}
                    className="propaganda-mobile-panel"
                  >

                    {isExpanded && (
                      <>
                        <PropagandaDetail
                          method={method}
                          mobile
                        />

                        {/* MOBILE NAVIGATION */}

                        <div className="propaganda-mobile-navigation">

                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() =>
                              navigateToMethod(index - 1)
                            }
                          >
                            <Arrow
                              direction="left"
                              size={15}
                            />

                            Previous
                          </button>

                          <span>
                            {String(method.id).padStart(2, '0')}
                            {' / '}
                            {String(methods.length).padStart(2, '0')}
                          </span>

                          <button
                            type="button"
                            disabled={
                              index === methods.length - 1
                            }
                            onClick={() =>
                              navigateToMethod(index + 1)
                            }
                          >
                            Next

                            <Arrow
                              direction="right"
                              size={15}
                            />
                          </button>

                        </div>
                      </>
                    )}

                  </div>
                </div>
              )
            })}

          </div>
        </div>

      </div>
    </section>
  )
}
