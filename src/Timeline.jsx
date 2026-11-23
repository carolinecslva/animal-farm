
import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react'
import './Timeline.css'

const events = [
  {
    number: '01',
    title: "Old Major's Speech",
    chapter: 'Chapter 1',
    image: '/images/old-major.png',
    description:
      'Old Major inspires the animals with a dream of freedom and equality.',
    significance:
      'His speech introduces the ideals that motivate the rebellion and the hope for a better society.',
    theme: 'Freedom & Equality',
  },
  {
    number: '02',
    title: 'The Rebellion',
    chapter: 'Chapter 2',
    image: '/images/rebellion.png',
    description:
      'The animals drive Mr. Jones away and take control of the farm.',
    significance:
      'The animals gain independence and hope to create a society where everyone is treated equally.',
    theme: 'Revolution',
  },
  {
    number: '03',
    title: 'The Seven Commandments',
    chapter: 'Chapter 2',
    image: '/images/commandments.png',
    description:
      'The pigs establish seven rules based on the principles of Animalism.',
    significance:
      'The commandments represent the original ideals of the revolution, but are gradually changed to benefit the pigs.',
    theme: 'Ideals & Principles',
  },
  {
    number: '04',
    title: "Snowball's Expulsion",
    chapter: 'Chapter 5',
    image: '/images/snowball.png',
    description:
      'Napoleon uses his trained dogs to chase Snowball away.',
    significance:
      'Napoleon eliminates his main rival and begins to consolidate absolute power over the farm.',
    theme: 'Abuse of Power',
  },
  {
    number: '05',
    title: 'The Windmill',
    chapter: 'Chapters 5–8',
    image: '/images/windmill.png',
    description:
      'The animals work tirelessly to build and rebuild the windmill.',
    significance:
      'The windmill becomes a symbol of sacrifice, exploitation and promises that are never fulfilled.',
    theme: 'Exploitation',
  },
  {
    number: '06',
    title: "Napoleon's Dictatorship",
    chapter: 'Chapters 5–9',
    image: '/images/napoleon.png',
    description:
      'Napoleon rules through fear, propaganda and increasingly unequal privileges.',
    significance:
      'The revolution gradually becomes a dictatorship similar to the system the animals originally fought against.',
    theme: 'Dictatorship',
  },
  {
    number: '07',
    title: "Boxer's Fate",
    chapter: 'Chapter 9',
    image: '/images/boxer.png',
    description:
      'After years of loyal work, Boxer is sold to a horse slaughterer.',
    significance:
      'His fate exposes the betrayal of the hardworking animals by the leaders they trusted.',
    theme: 'Betrayal',
  },
  {
    number: '08',
    title: 'The Final Transformation',
    chapter: 'Chapter 10',
    image: '/images/transformation.png',
    description:
      'The pigs walk on two legs and become indistinguishable from humans.',
    significance:
      'The ending reveals the complete corruption of the revolution and the loss of its original ideals.',
    theme: 'Corruption of Ideals',
  },
]

/* =====================================
   REUSABLE EVENT DETAIL
===================================== */

function EventDetail({
  event,
  index,
  onPrevious,
  onNext,
  mobile = false,
}) {
  return (
    <article
      className={`timeline-detail ${
        mobile ? 'timeline-detail-mobile' : ''
      }`}
    >
      {/* CARD HEADER */}

      {!mobile && (
        <div className="detail-top">
          <span>{event.chapter}</span>
          <span>EVENT {event.number} / 08</span>
        </div>
      )}

      {/* ILLUSTRATION */}

      <div className="detail-illustration">
        <img
          src={event.image}
          alt={`Illustration of ${event.title}`}
          className="timeline-image"
          loading="lazy"
        />
      </div>

      {/* CONTENT */}

      <div className="detail-content">
        <span className="detail-theme">
          {event.theme}
        </span>

        {!mobile && <h3>{event.title}</h3>}

        <p className="detail-description">
          {event.description}
        </p>

        <div className="detail-significance">
          <strong>WHY DOES IT MATTER?</strong>

          <p>{event.significance}</p>
        </div>
      </div>

      {/* NAVIGATION */}

      <div className="detail-navigation">
        <button
          type="button"
          onClick={() => onPrevious(index)}
          disabled={index === 0}
        >
          <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" /> Previous
        </button>

        <span className="detail-progress">
          {event.number} / 08
        </span>

        <button
          type="button"
          onClick={() => onNext(index)}
          disabled={index === events.length - 1}
        >
          Next <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

/* =====================================
   MAIN TIMELINE COMPONENT
===================================== */

export default function Timeline() {
  const [activeEvent, setActiveEvent] = useState(0)
  const [expandedEvent, setExpandedEvent] = useState(null)

  const mobileCards = useRef([])
  const shouldScroll = useRef(false)

  const selectedEvent = events[activeEvent]

  /* =====================================
     AUTOMATIC MOBILE SCROLL
  ===================================== */

  useEffect(() => {
    if (!shouldScroll.current || expandedEvent === null) {
      return
    }

    if (!window.matchMedia('(max-width: 900px)').matches) {
      shouldScroll.current = false
      return
    }

    const frame = requestAnimationFrame(() => {
      const card = mobileCards.current[expandedEvent]

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
  }, [expandedEvent])

  /* =====================================
     EVENT SELECTION
  ===================================== */

  const selectDesktopEvent = (index) => {
    setActiveEvent(index)
    setExpandedEvent(index)
  }

  const selectMobileEvent = (index) => {
    if (expandedEvent === index) {
      shouldScroll.current = false
      setExpandedEvent(null)
      return
    }

    shouldScroll.current = true
    setActiveEvent(index)
    setExpandedEvent(index)
  }

  const navigateToEvent = (index, mobile = false) => {
    if (index < 0 || index >= events.length) {
      return
    }

    shouldScroll.current = mobile

    setActiveEvent(index)
    setExpandedEvent(index)
  }

  return (
    <section
      className="timeline-section"
      id="timeline"
    >

      {/* =====================================
          SECTION INTRODUCTION
      ===================================== */}

      <div className="timeline-heading">
        <p className="eyebrow">01 / THE STORY</p>

        <h2>
          From Revolution
          <br />
          <em>to Dictatorship.</em>
        </h2>

        <p>
          Explore the eight turning points that transformed
          a dream of equality into a system of oppression.
        </p>
      </div>

      {/* =====================================
          DESKTOP LAYOUT
      ===================================== */}

      <div className="timeline-layout timeline-desktop">

        {/* EVENTS LIST */}

        <div className="timeline-list">
          {events.map((event, index) => (
            <button
              key={event.number}
              type="button"
              className={`timeline-event ${
                activeEvent === index ? 'active' : ''
              }`}
              onClick={() => selectDesktopEvent(index)}
              aria-pressed={activeEvent === index}
            >
              <span className="timeline-number">
                {event.number}
              </span>

              <span className="timeline-event-info">
                <small>{event.chapter}</small>
                <strong>{event.title}</strong>
              </span>

              <span
                className="timeline-arrow"
                aria-hidden="true"
              >
                <ArrowUpRight size={20} strokeWidth={1.8} aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>

        {/* SELECTED EVENT */}

        <EventDetail
          key={activeEvent}
          event={selectedEvent}
          index={activeEvent}
          onPrevious={(index) =>
            navigateToEvent(index - 1)
          }
          onNext={(index) =>
            navigateToEvent(index + 1)
          }
        />

      </div>

      {/* =====================================
          MOBILE ACCORDION
      ===================================== */}

      <div className="timeline-mobile">

        <div className="timeline-mobile-hint">
          <span>SELECT AN EVENT TO EXPLORE</span>
          <span><ArrowDown size={18} strokeWidth={1.8} aria-hidden="true" /></span>
        </div>

        <div className="timeline-mobile-stack">

          {events.map((event, index) => {
            const isExpanded = expandedEvent === index

            return (
              <div
                key={event.number}
                ref={(element) => {
                  mobileCards.current[index] = element
                }}
                className={`timeline-mobile-card ${
                  isExpanded ? 'is-expanded' : ''
                }`}
              >

                {/* ACCORDION HEADER */}

                <button
                  type="button"
                  id={`timeline-trigger-${index}`}
                  className={`timeline-mobile-trigger ${
                    isExpanded ? 'active' : ''
                  }`}
                  onClick={() => selectMobileEvent(index)}
                  aria-expanded={isExpanded}
                  aria-controls={`timeline-panel-${index}`}
                >

                  <span className="timeline-mobile-number">
                    {event.number}
                  </span>

                  <span className="timeline-mobile-title">
                    <small>{event.chapter}</small>
                    <strong>{event.title}</strong>
                  </span>

                  <span
                    className="timeline-mobile-icon"
                    aria-hidden="true"
                  >
                    {isExpanded ? '−' : '+'}
                  </span>

                </button>

                {/* EXPANDABLE CONTENT */}

                <div
                  id={`timeline-panel-${index}`}
                  role="region"
                  aria-labelledby={`timeline-trigger-${index}`}
                  hidden={!isExpanded}
                  className="timeline-mobile-panel"
                >
                  {isExpanded && (
                    <EventDetail
                      event={event}
                      index={index}
                      mobile
                      onPrevious={(currentIndex) =>
                        navigateToEvent(
                          currentIndex - 1,
                          true
                        )
                      }
                      onNext={(currentIndex) =>
                        navigateToEvent(
                          currentIndex + 1,
                          true
                        )
                      }
                    />
                  )}
                </div>

              </div>
            )
          })}

        </div>
      </div>

      {/* =====================================
          FOOTNOTE
      ===================================== */}

      <div className="timeline-footnote">
        <span>1945 / GEORGE ORWELL</span>
        <span>THE STORY OF A REVOLUTION BETRAYED</span>
      </div>

    </section>
  )
}
