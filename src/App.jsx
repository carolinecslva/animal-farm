
import { useEffect, useState } from 'react'
import './App.css'

import Timeline from './Timeline'
import Propaganda from './Propaganda'
import Commandments from './Commandments'
import Quiz from './Quiz'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)

  // Prevent scrolling while the welcome screen is visible
  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (showWelcome) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [showWelcome])

  const openWelcome = () => setShowWelcome(true)
  const closeWelcome = () => setShowWelcome(false)

  return (
    <main className="site">

      {/* =====================================
          WELCOME SCREEN
          Appears on every page load
      ===================================== */}

      {showWelcome && (
        <div className="welcome-overlay">
          <section
            className="welcome-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
          >

            {/* TOP BAR */}
            <div className="welcome-topline">
              <span>GEORGE ORWELL · 1945</span>
              <span>A LITERARY EXPLORATION</span>
            </div>

            {/* MAIN CONTENT */}
            <div className="welcome-content">

              <span className="welcome-eyebrow">
                AN INTERACTIVE UNIVERSITY PROJECT
              </span>

              <h2 id="welcome-title">
                Welcome to
                <br />
                <em>Animal Farm.</em>
              </h2>

              <p className="welcome-description">
                Explore a world where equality becomes inequality,
                language becomes manipulation, and power changes
                everything.
              </p>

              <div className="welcome-divider" />

              {/* PROJECT CREDITS */}
              <span className="welcome-credits-label">
                CREATED BY
              </span>

              <div className="welcome-names">
                <span>Fernanda Barbosa</span>
                <span className="welcome-ampersand">&</span>
                <span>Nilo [Surname]</span>
              </div>

              {/* ENTER BUTTON */}
              <button
                type="button"
                className="welcome-enter"
                onClick={closeWelcome}
              >
                Explore Animal Farm <span>↗</span>
              </button>

            </div>

            {/* BOTTOM BAR */}
            <div className="welcome-bottomline">
              <span>POWER · PROPAGANDA · EQUALITY</span>
              <span>2026</span>
            </div>

          </section>
        </div>
      )}

      {/* =====================================
          NAVIGATION
      ===================================== */}

      <header className="navigation" id="home">
        <a href="#home" className="nav-brand">
          <span className="nav-brand-title">
            Animal Farm<span>.</span>
          </span>

          <span className="nav-brand-subtitle">
            A LITERARY EXPLORATION
          </span>
        </a>

        <nav
          className="nav-links"
          aria-label="Main navigation"
        >
          <a href="#home" className="nav-home">
            Home
          </a>

          <a href="#timeline">
            Timeline
          </a>

          <a href="#propaganda">
            Propaganda
          </a>

          <a href="#commandments">
            Memory Game
          </a>

          <a href="#quiz" className="nav-cta">
            Quiz <span>↗</span>
          </a>
        </nav>
      </header>

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="editorial-hero">
        <div className="editorial-hero-content">

          <div className="editorial-hero-eyebrow">
            <span>GEORGE ORWELL · 1945</span>
            <span className="editorial-hero-rule" />
          </div>

          <h1>
            Animal
            <br />
            Farm<span>.</span>
          </h1>

          <h2>The Corruption of a Revolution</h2>

          <p className="editorial-hero-description">
            A political fable about power, manipulation
            and the betrayal of equality.
          </p>

          <a
            href="#timeline"
            className="editorial-hero-button"
          >
            Explore the Story <span>↗</span>
          </a>

        </div>

        <div className="editorial-hero-art">
          <img
            src="/images/animal-farm-hero.png"
            alt="Vintage illustration of Animal Farm with a pig, farm animals, a barn and a windmill"
          />
        </div>
      </section>

      {/* =====================================
          QUOTE BAND
      ===================================== */}

      <section className="editorial-quote">
        <span className="editorial-quote-line" />

        <p>“All animals are equal.”</p>

        <span className="editorial-quote-line" />
      </section>

      {/* =====================================
          STORY INTRODUCTION
      ===================================== */}

      <section className="story-intro" id="story">

        <p className="eyebrow">
          THE STORY
        </p>

        <h2>
          A revolution built on hope.
          <br />
          A society transformed by power.
        </h2>

        <p>
          What begins as a dream of freedom and equality
          gradually becomes a story of manipulation,
          inequality and absolute power.
        </p>

        <span className="coming-soon">
          EXPLORE THE EVENTS THAT CHANGED ANIMAL FARM
        </span>

      </section>

      {/* =====================================
          01 — TIMELINE
      ===================================== */}

      <Timeline />

      {/* =====================================
          02 — PROPAGANDA
      ===================================== */}

      <Propaganda />

      {/* =====================================
          03 — MEMORY GAME
      ===================================== */}

      <Commandments />

      {/* =====================================
          04 — QUIZ
      ===================================== */}

      <Quiz />

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="site-footer">

        <span>ANIMAL FARM</span>

        <span>GEORGE ORWELL · 1945</span>

        <span>A LITERARY EXPLORATION</span>

        <button
          type="button"
          className="footer-about"
          onClick={openWelcome}
        >
          About the Project ↗
        </button>

      </footer>

    </main>
  )
}

export default App
