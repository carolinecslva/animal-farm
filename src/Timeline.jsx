
import { useState } from 'react'
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

export default function Timeline() {
  const [activeEvent, setActiveEvent] = useState(0)

  const selectedEvent = events[activeEvent]

  const goToPrevious = () => {
    setActiveEvent((current) => Math.max(0, current - 1))
  }

  const goToNext = () => {
    setActiveEvent((current) =>
      Math.min(events.length - 1, current + 1)
    )
  }

  return (
    <section className="timeline-section" id="timeline">

      {/* SECTION INTRODUCTION */}
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

      {/* INTERACTIVE TIMELINE */}
      <div className="timeline-layout">

        {/* EVENTS LIST */}
        <div className="timeline-list">
          {events.map((event, index) => (
            <button
              key={event.number}
              type="button"
              className={`timeline-event ${
                activeEvent === index ? 'active' : ''
              }`}
              onClick={() => setActiveEvent(index)}
              aria-pressed={activeEvent === index}
            >
              <span className="timeline-number">
                {event.number}
              </span>

              <span className="timeline-event-info">
                <small>{event.chapter}</small>
                <strong>{event.title}</strong>
              </span>

              <span className="timeline-arrow">↗</span>
            </button>
          ))}
        </div>

        {/* SELECTED EVENT CARD */}
        <article className="timeline-detail" key={activeEvent}>

          <div className="detail-top">
            <span>{selectedEvent.chapter}</span>
            <span>
              EVENT {selectedEvent.number} / 08
            </span>
          </div>

          {/* EVENT ILLUSTRATION */}
          <div className="detail-illustration">
            <img
              src={selectedEvent.image}
              alt={`Illustration of ${selectedEvent.title}`}
              className="timeline-image"
            />
          </div>

          {/* EVENT INFORMATION */}
          <div className="detail-content">

            <span className="detail-theme">
              {selectedEvent.theme}
            </span>

            <h3>{selectedEvent.title}</h3>

            <p className="detail-description">
              {selectedEvent.description}
            </p>

            <div className="detail-significance">
              <strong>WHY DOES IT MATTER?</strong>
              <p>{selectedEvent.significance}</p>
            </div>

          </div>

          {/* NAVIGATION */}
          <div className="detail-navigation">
            <button
              type="button"
              onClick={goToPrevious}
              disabled={activeEvent === 0}
            >
              ← Previous
            </button>

            <span className="detail-progress">
              {selectedEvent.number} / 08
            </span>

            <button
              type="button"
              onClick={goToNext}
              disabled={activeEvent === events.length - 1}
            >
              Next →
            </button>
          </div>

        </article>
      </div>

      {/* FOOTNOTE */}
      <div className="timeline-footnote">
        <span>1945 / GEORGE ORWELL</span>
        <span>THE STORY OF A REVOLUTION BETRAYED</span>
      </div>

    </section>
  )
}
