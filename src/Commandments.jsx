
import { useEffect, useRef, useState } from 'react'
import './Commandments.css'

const pairs = [
  {
    id: 1,
    original: 'No animal shall sleep in a bed.',
    manipulated: 'No animal shall sleep in a bed with sheets.',
    change: 'with sheets',
    explanation:
      'The pigs added “with sheets” to justify sleeping in beds while pretending they had not broken the original rule.'
  },
  {
    id: 2,
    original: 'No animal shall drink alcohol.',
    manipulated: 'No animal shall drink alcohol to excess.',
    change: 'to excess',
    explanation:
      'The words “to excess” were added to allow the pigs to drink alcohol while maintaining the appearance of following the commandments.'
  },
  {
    id: 3,
    original: 'No animal shall kill any other animal.',
    manipulated: 'No animal shall kill any other animal without cause.',
    change: 'without cause',
    explanation:
      'The addition of “without cause” allowed Napoleon to justify violence against other animals.'
  },
  {
    id: 4,
    original: 'All animals are equal.',
    manipulated:
      'All animals are equal, but some animals are more equal than others.',
    change: 'but some animals are more equal than others',
    explanation:
      'The final commandment contradicts the original promise of equality and reveals how completely the revolution has been corrupted.'
  }
]

function createDeck() {
  const cards = pairs.flatMap((pair) => [
    {
      id: `${pair.id}-original`,
      pairId: pair.id,
      type: 'original',
      text: pair.original
    },
    {
      id: `${pair.id}-manipulated`,
      pairId: pair.id,
      type: 'manipulated',
      text: pair.manipulated
    }
  ])

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }

  return cards
}

export default function Commandments() {
  const [deck, setDeck] = useState(createDeck)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [activeExplanation, setActiveExplanation] = useState(null)
  const [locked, setLocked] = useState(false)
  const [started, setStarted] = useState(false)

  const timeoutRef = useRef(null)

  const completed = matched.length === pairs.length

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  function handleCardClick(card) {
    if (
      locked ||
      completed ||
      flipped.includes(card.id) ||
      matched.includes(card.pairId)
    ) {
      return
    }

    if (!started) {
      setStarted(true)
    }

    const nextFlipped = [...flipped, card.id]
    setFlipped(nextFlipped)

    if (nextFlipped.length !== 2) return

    setMoves((current) => current + 1)
    setLocked(true)

    const firstCard = deck.find(
      (item) => item.id === nextFlipped[0]
    )

    const secondCard = deck.find(
      (item) => item.id === nextFlipped[1]
    )

    const isMatch =
      firstCard.pairId === secondCard.pairId &&
      firstCard.type !== secondCard.type

    if (isMatch) {
      timeoutRef.current = setTimeout(() => {
        setMatched((current) => [...current, card.pairId])
        setActiveExplanation(
          pairs.find((pair) => pair.id === card.pairId)
        )
        setFlipped([])
        setLocked(false)
        timeoutRef.current = null
      }, 650)
    } else {
      setMistakes((current) => current + 1)

      timeoutRef.current = setTimeout(() => {
        setFlipped([])
        setLocked(false)
        timeoutRef.current = null
      }, 1200)
    }
  }

  function restartGame() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setDeck(createDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
    setMistakes(0)
    setActiveExplanation(null)
    setLocked(false)
    setStarted(false)
  }

  function closeExplanation() {
    setActiveExplanation(null)
  }

  return (
    <section className="commandments-section" id="commandments">
      <div className="commandments-container">

        {/* SECTION INTRO */}
        <div className="commandments-intro">
          <p className="commandments-eyebrow">
            03 / THE SEVEN COMMANDMENTS
          </p>

          <h2>
            Match the
            <br />
            <em>Manipulation.</em>
          </h2>

          <p className="commandments-description">
            The rules of Animal Farm were meant to protect
            equality. But as Napoleon gained power, the
            commandments began to change.
          </p>

          <p className="commandments-description-secondary">
            Flip the cards and match each original commandment
            with its manipulated version. Can you uncover all
            four pairs?
          </p>
        </div>

        {/* GAME AREA */}
        <div className="commandments-game">

          {/* GAME HEADER */}
          <div className="commandments-game-header">
            <div>
              <span className="commandments-game-label">
                MEMORY CHALLENGE
              </span>
              <h3>Find the Original. Reveal the Truth.</h3>
            </div>

            <button
              type="button"
              className="commandments-restart"
              onClick={restartGame}
            >
              ↻ Restart Game
            </button>
          </div>

          <div className="commandments-game-layout">

            {/* CARDS */}
            <div className="commandments-board">
              {deck.map((card) => {
                const isMatched = matched.includes(card.pairId)
                const isFlipped =
                  flipped.includes(card.id) || isMatched

                return (
                  <button
                    key={card.id}
                    type="button"
                    className={[
                      'commandments-card',
                      isFlipped ? 'is-flipped' : '',
                      isMatched ? 'is-matched' : ''
                    ].join(' ')}
                    onClick={() => handleCardClick(card)}
                    disabled={isMatched || completed}
                    aria-label={
                      isFlipped
                        ? card.text
                        : 'Flip hidden commandment card'
                    }
                    aria-pressed={isFlipped}
                  >
                    <span className="commandments-card-inner">

                      {/* BACK */}
                      <span className="commandments-card-back">
                        <span className="commandments-card-symbol">
                          ✦
                        </span>
                        <span className="commandments-card-back-label">
                          ANIMAL FARM
                        </span>
                        <span className="commandments-card-back-number">
                          VII
                        </span>
                      </span>

                      {/* FRONT */}
                      <span className="commandments-card-front">
                        <span className="commandments-card-type">
                          {card.type === 'original'
                            ? 'ORIGINAL'
                            : 'REWRITTEN'}
                        </span>

                        <span className="commandments-card-text">
                          {card.text}
                        </span>

                        <span className="commandments-card-bottom">
                          {isMatched ? '✓ MATCHED' : 'THE COMMANDMENTS'}
                        </span>
                      </span>

                    </span>
                  </button>
                )
              })}
            </div>

            {/* GAME SIDEBAR */}
            <aside className="commandments-sidebar">
              <div className="commandments-stat">
                <span>PAIRS FOUND</span>
                <strong>
                  {matched.length}
                  <small> / {pairs.length}</small>
                </strong>
              </div>

              <div className="commandments-stat">
                <span>ATTEMPTS</span>
                <strong>{moves}</strong>
              </div>

              <div className="commandments-stat">
                <span>MISTAKES</span>
                <strong>{mistakes}</strong>
              </div>

              <div className="commandments-progress">
                <span>TRUTH RECOVERED</span>

                <div className="commandments-progress-track">
                  <div
                    className="commandments-progress-fill"
                    style={{
                      width: `${(matched.length / pairs.length) * 100}%`
                    }}
                  />
                </div>

                <small>
                  {Math.round(
                    (matched.length / pairs.length) * 100
                  )}%
                </small>
              </div>

              <p className="commandments-sidebar-quote">
                “All animals are equal.”
              </p>

              <p className="commandments-sidebar-note">
                {started
                  ? 'Every word matters. Look closely at how the rules have changed.'
                  : 'Select any two cards to begin your investigation.'}
              </p>
            </aside>
          </div>

          {/* EXPLANATION AFTER A MATCH */}
          {activeExplanation && (
            <div
              className="commandments-overlay"
              onClick={closeExplanation}
            >
              <div
                className="commandments-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="commandments-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                <span className="commandments-modal-eyebrow">
                  ✓ TRUTH UNCOVERED
                </span>

                <h3 id="commandments-modal-title">
                  You found a manipulation!
                </h3>

                <div className="commandments-modal-comparison">
                  <div>
                    <span>ORIGINAL RULE</span>
                    <p>{activeExplanation.original}</p>
                  </div>

                  <div>
                    <span>MANIPULATED RULE</span>
                    <p>{activeExplanation.manipulated}</p>
                  </div>
                </div>

                <p className="commandments-modal-explanation">
                  {activeExplanation.explanation}
                </p>

                <button
                  type="button"
                  className="commandments-modal-button"
                  onClick={closeExplanation}
                >
                  {completed
                    ? 'See My Results →'
                    : 'Continue Playing →'}
                </button>
              </div>
            </div>
          )}

          {/* FINAL RESULT */}
          {completed && !activeExplanation && (
            <div className="commandments-results">
              <span>THE TRUTH HAS BEEN REVEALED</span>

              <h3>All Commandments Uncovered!</h3>

              <p>
                You matched all four pairs in{' '}
                <strong>{moves} attempts</strong>.
              </p>

              <p className="commandments-results-reflection">
                In Animal Farm, changing a few words was enough
                to transform the meaning of the rules. Orwell
                reminds us that controlling language can become
                a way of controlling power and truth.
              </p>

              <button
                type="button"
                className="commandments-play-again"
                onClick={restartGame}
              >
                Play Again ↻
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
