
import { useState } from 'react'
import './Quiz.css'

const quizzes = {
  story: {
    title: 'The Story Challenge',
    subtitle: 'Characters, events, power and symbolism.',
    questions: [
      {
        question: 'Who inspires the animals to dream of rebellion?',
        options: ['Napoleon', 'Old Major', 'Boxer', 'Snowball'],
        answer: 1,
        explanation: 'Old Major introduces the idea of a society free from human exploitation.'
      },
      {
        question: 'What is the original name of Animal Farm?',
        options: ['Foxwood Farm', 'Pinchfield Farm', 'Manor Farm', 'Willow Farm'],
        answer: 2,
        explanation: 'Before the rebellion, the farm is called Manor Farm.'
      },
      {
        question: 'Who is responsible for spreading Napoleon’s propaganda?',
        options: ['Benjamin', 'Mollie', 'Clover', 'Squealer'],
        answer: 3,
        explanation: 'Squealer uses persuasive language to defend Napoleon and manipulate the animals.'
      },
      {
        question: 'What happens to Snowball?',
        options: [
          'He is driven away by dogs',
          'He becomes the leader',
          'He leaves with Boxer',
          'He returns to Mr. Jones'
        ],
        answer: 0,
        explanation: 'Napoleon uses his trained dogs to chase Snowball away from the farm.'
      },
      {
        question: 'What does the windmill mainly represent?',
        options: [
          'The return of Mr. Jones',
          'Promises of progress and the exploitation of labor',
          'The end of all work',
          'The animals’ freedom to travel'
        ],
        answer: 1,
        explanation: 'The windmill symbolizes promised progress, but it also becomes a means of exploiting the animals.'
      },
      {
        question: 'Which animal is known for saying “I will work harder”?',
        options: ['Benjamin', 'Moses', 'Boxer', 'Muriel'],
        answer: 2,
        explanation: 'Boxer represents loyalty and hard work, even when those qualities are exploited.'
      },
      {
        question: 'How do the pigs gradually justify their privileges?',
        options: [
          'By holding free elections',
          'By sharing all resources equally',
          'By asking the humans for permission',
          'By changing rules and manipulating information'
        ],
        answer: 3,
        explanation: 'The pigs alter the commandments and use propaganda to justify inequality.'
      },
      {
        question: 'What is the fate of Boxer?',
        options: [
          'He is sold to a horse slaughterer',
          'He becomes the farm’s leader',
          'He escapes with Snowball',
          'He retires peacefully'
        ],
        answer: 0,
        explanation: 'Despite his loyalty, Boxer is sold when he is no longer useful to the pigs.'
      },
      {
        question: 'What happens to the Seven Commandments?',
        options: [
          'They remain unchanged',
          'They are gradually altered',
          'They are adopted by Mr. Jones',
          'They are replaced by free elections'
        ],
        answer: 1,
        explanation: 'The pigs gradually change the commandments to justify their behavior.'
      },
      {
        question: 'What does the final scene reveal?',
        options: [
          'Snowball has returned',
          'The rebellion has begun again',
          'The pigs have become indistinguishable from humans',
          'The animals have achieved equality'
        ],
        answer: 2,
        explanation: 'The ending reveals that the new rulers have become like the oppressors they replaced.'
      }
    ]
  },

  vocabulary: {
    title: 'The Vocabulary Challenge',
    subtitle: 'Explore the language of Animal Farm.',
    questions: [
      {
        question: 'What does “rebellion” mean?',
        options: [
          'A peaceful agreement',
          'Resistance against authority',
          'A type of punishment',
          'A celebration'
        ],
        answer: 1,
        explanation: 'A rebellion is an act of resistance against an established authority.'
      },
      {
        question: 'What does “oppression” mean?',
        options: [
          'Fair treatment',
          'Political independence',
          'Cruel or unjust exercise of power',
          'Freedom of expression'
        ],
        answer: 2,
        explanation: 'Oppression means the cruel or unjust treatment of people through power or authority.'
      },
      {
        question: 'What is the meaning of “loyalty”?',
        options: [
          'Faithfulness and support',
          'Fear of responsibility',
          'Desire for wealth',
          'Refusal to cooperate'
        ],
        answer: 0,
        explanation: 'Loyalty is the quality of remaining faithful to someone or something.'
      },
      {
        question: 'What does “deceive” mean?',
        options: [
          'To protect',
          'To forgive',
          'To encourage',
          'To make someone believe something false'
        ],
        answer: 3,
        explanation: 'To deceive someone is to mislead them deliberately.'
      },
      {
        question: 'What does “commandment” mean?',
        options: [
          'A personal memory',
          'An authoritative rule',
          'A financial reward',
          'A political speech'
        ],
        answer: 1,
        explanation: 'A commandment is a rule or instruction that people are expected to obey.'
      },
      {
        question: 'What does “betrayal” mean?',
        options: [
          'An act of cooperation',
          'A public celebration',
          'A violation of trust',
          'An expression of gratitude'
        ],
        answer: 2,
        explanation: 'Betrayal occurs when someone breaks another person’s trust.'
      },
      {
        question: 'What does “propaganda” mean?',
        options: [
          'Information used to influence opinions',
          'A type of agricultural equipment',
          'A neutral record of daily events',
          'A system of farming'
        ],
        answer: 0,
        explanation: 'Propaganda is communication designed to influence beliefs or behavior, often selectively or misleadingly.'
      },
      {
        question: 'What does “tyranny” mean?',
        options: [
          'A fair election',
          'A peaceful negotiation',
          'A shared responsibility',
          'Cruel and oppressive rule'
        ],
        answer: 3,
        explanation: 'Tyranny is the exercise of cruel, oppressive or arbitrary power.'
      },
      {
        question: 'What does “comrade” mean?',
        options: [
          'An enemy in battle',
          'A companion or fellow member of a group',
          'A person who owns a farm',
          'A political prisoner'
        ],
        answer: 1,
        explanation: 'Comrade refers to a companion or fellow member, especially in a shared political cause.'
      },
      {
        question: 'What does “manipulation” mean?',
        options: [
          'The fair distribution of resources',
          'The protection of individual rights',
          'The deliberate control or influence of others',
          'The refusal to participate in politics'
        ],
        answer: 2,
        explanation: 'Manipulation involves influencing or controlling others, often through unfair or deceptive methods.'
      }
    ]
  }
}

export default function Quiz() {
  const [mode, setMode] = useState(null)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  // START A NEW CHALLENGE
  const startQuiz = (type) => {
    setMode(type)
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  // RETURN SAFELY TO CHALLENGE SELECTION
  const returnToChallenges = () => {
    setMode(null)
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  const quiz = mode ? quizzes[mode] : null
  const question = quiz && !finished
    ? quiz.questions[index]
    : null

  const isCorrect = question
    ? selected === question.answer
    : false

  // HANDLE ANSWER SELECTION
  const chooseAnswer = (optionIndex) => {
    if (!question || selected !== null) return

    setSelected(optionIndex)

    if (optionIndex === question.answer) {
      setScore((current) => current + 1)
    }
  }

  // MOVE TO NEXT QUESTION
  const nextQuestion = () => {
    if (!quiz || selected === null) return

    if (index === quiz.questions.length - 1) {
      setFinished(true)
    } else {
      setIndex((current) => current + 1)
      setSelected(null)
    }
  }

  // FINAL RESULT
  const getResult = () => {
    if (score >= 9) return 'Orwell Expert'
    if (score >= 6) return 'Animal Farm Explorer'
    return 'Beginner Reader'
  }

  return (
    <section className="quiz-section" id="quiz">
      <div className="quiz-container">

        {/* SECTION INTRODUCTION */}
        <div className="quiz-intro">
          <p className="quiz-eyebrow">
            03 / TEST YOUR KNOWLEDGE
          </p>

          <h2>
            How Well Do You
            <br />
            <em>Know Animal Farm?</em>
          </h2>

          <p>
            Put your knowledge to the test. Explore the story,
            its characters and the English vocabulary behind
            Orwell’s powerful message.
          </p>
        </div>

        {/* CHALLENGE SELECTION */}
        {!mode && (
          <div className="quiz-choices">

            <button
              type="button"
              className="quiz-choice"
              onClick={() => startQuiz('story')}
            >
              <span className="quiz-choice-number">
                01 / STORY
              </span>

              <span className="quiz-choice-icon">
                ✦
              </span>

              <strong>The Story Challenge</strong>

              <span>
                Characters, events, power and symbolism.
              </span>

              <span className="quiz-choice-bottom">
                10 QUESTIONS <span>↗</span>
              </span>
            </button>

            <button
              type="button"
              className="quiz-choice"
              onClick={() => startQuiz('vocabulary')}
            >
              <span className="quiz-choice-number">
                02 / LANGUAGE
              </span>

              <span className="quiz-choice-icon">
                Aa
              </span>

              <strong>The Vocabulary Challenge</strong>

              <span>
                Words, meanings and expressions from the novel.
              </span>

              <span className="quiz-choice-bottom">
                10 QUESTIONS <span>↗</span>
              </span>
            </button>

          </div>
        )}

        {/* ACTIVE QUIZ */}
        {mode && !finished && question && (
          <div className="quiz-game">

            <div className="quiz-game-top">
              <span>{quiz.title}</span>

              <button
                type="button"
                onClick={returnToChallenges}
              >
                Change Challenge ×
              </button>
            </div>

            <div className="quiz-progress-info">
              <span>
                QUESTION {String(index + 1).padStart(2, '0')}
                {' / '}
                {quiz.questions.length}
              </span>

              <span>SCORE: {score}</span>
            </div>

            <div className="quiz-progress">
              <div
                style={{
                  width: `${
                    ((index + 1) / quiz.questions.length) * 100
                  }%`
                }}
              />
            </div>

            <h3>{question.question}</h3>

            <div className="quiz-options">
              {question.options.map((option, optionIndex) => {
                let className = 'quiz-option'

                if (selected !== null) {
                  if (optionIndex === question.answer) {
                    className += ' correct'
                  } else if (optionIndex === selected) {
                    className += ' incorrect'
                  }
                }

                return (
                  <button
                    type="button"
                    key={optionIndex}
                    className={className}
                    disabled={selected !== null}
                    onClick={() => chooseAnswer(optionIndex)}
                  >
                    <span className="quiz-option-letter">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>

                    <span>{option}</span>
                  </button>
                )
              })}
            </div>

            {/* ANSWER FEEDBACK */}
            {selected !== null && (
              <div
                className="quiz-feedback"
                aria-live="polite"
              >
                <strong>
                  {isCorrect
                    ? 'Correct answer!'
                    : 'Not quite!'}
                </strong>

                <p>{question.explanation}</p>

                <button
                  type="button"
                  className="quiz-next"
                  onClick={nextQuestion}
                >
                  {index === quiz.questions.length - 1
                    ? 'See My Results ↗'
                    : 'Next Question →'}
                </button>
              </div>
            )}

          </div>
        )}

        {/* FINAL RESULTS */}
        {mode && finished && quiz && (
          <div className="quiz-results">

            <span className="quiz-results-label">
              CHALLENGE COMPLETED
            </span>

            <div className="quiz-results-score">
              {score}
              <span>/{quiz.questions.length}</span>
            </div>

            <h3>{getResult()}</h3>

            <p>
              You answered {score} out of{' '}
              {quiz.questions.length} questions correctly.
            </p>

            <div className="quiz-results-actions">

              <button
                type="button"
                onClick={() => startQuiz(mode)}
              >
                Try Again ↻
              </button>

              <button
                type="button"
                onClick={returnToChallenges}
              >
                Choose Another Challenge ↗
              </button>

            </div>

          </div>
        )}

      </div>
    </section>
  )
}
