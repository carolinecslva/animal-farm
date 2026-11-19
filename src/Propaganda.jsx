
import { useState } from 'react'
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
      'Language becomes a tool of control when those in power decide what information others receive and how they interpret it.'
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
      'Fear prevents independent thinking and allows authoritarian leadership to grow without meaningful opposition.'
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
      'Controlling the past makes it easier to control the present, especially when people cannot verify what was originally said or promised.'
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
      'The glorification of a single leader replaces collective ideals with personal loyalty and unquestioning obedience.'
  }
]

export default function Propaganda() {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeMethod = methods[activeIndex]

  return (
    <section className="propaganda-section" id="propaganda">
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

        {/* INTERACTIVE CONTENT */}
        <div className="propaganda-layout">

          {/* LEFT — METHODS MENU */}
          <div className="propaganda-menu">
            <p className="propaganda-menu-label">
              FOUR METHODS OF CONTROL
            </p>

            <div className="propaganda-methods">
              {methods.map((method, index) => (
                <button
                  key={method.id}
                  type="button"
                  className={
                    'propaganda-method' +
                    (activeIndex === index ? ' active' : '')
                  }
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={activeIndex === index}
                >
                  <span className="propaganda-method-number">
                    {String(method.id).padStart(2, '0')}
                  </span>

                  <span className="propaganda-method-title">
                    {method.title}
                  </span>

                  <span className="propaganda-method-arrow">
                    ↗
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — DETAIL CARD */}
          <article className="propaganda-card">

            {/* CARD HEADER */}
            <div className="propaganda-card-header">
              <span>{activeMethod.category}</span>

              <span>
                {String(activeMethod.id).padStart(2, '0')}
                {' / '}
                {String(methods.length).padStart(2, '0')}
              </span>
            </div>

            {/* NEW ILLUSTRATION */}
            <div className="propaganda-card-visual">
              <img
                key={activeMethod.image}
                src={activeMethod.image}
                alt={activeMethod.imageAlt}
                className="propaganda-illustration"
              />
            </div>

            {/* CARD CONTENT */}
            <div className="propaganda-card-content">
              <p className="propaganda-card-period">
                {activeMethod.period}
              </p>

              <h3>{activeMethod.title}</h3>

              <p className="propaganda-card-description">
                {activeMethod.description}
              </p>

              <p className="propaganda-card-explanation">
                {activeMethod.explanation}
              </p>

              <div className="propaganda-card-example">
                <span>EXAMPLE FROM THE BOOK</span>
                <p>{activeMethod.example}</p>
              </div>

              <div className="propaganda-card-significance">
                <span>WHY IT MATTERS</span>
                <p>{activeMethod.significance}</p>
              </div>
            </div>

          </article>
        </div>
      </div>
    </section>
  )
}
