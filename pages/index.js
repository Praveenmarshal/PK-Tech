import Head from 'next/head';
import { useState } from 'react';
import { ArrowUpRight, Award, Crown, X } from 'lucide-react';

const navLinks = ['Projects', 'Studio', 'Offerings', 'Inquire'];

const stats = [
  { value: '250+', label: 'Brands Transformed' },
  { value: '95%', label: 'Client Retention' },
  { value: '10+', label: 'Years in the Game' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>VANGUARD — World-Class Digital Collective</title>
        <meta name="description" content="VANGUARD is a creative agency that builds fierce brand identities. Design. Disrupt. Conquer." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ========== FULLSCREEN HERO SECTION ========== */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay for readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1,
        }} />

        {/* ========== NAVBAR ========== */}
        <nav style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: undefined,
          background: 'transparent',
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          width: '100%',
          maxWidth: '100%',
          top: 0,
          left: 0,
          transform: 'none',
        }}
        className="vanguard-nav"
        >
          {/* Brand */}
          <a href="/" className="font-podium" style={{
            color: 'white',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
          }}>
            VANGUARD
          </a>

          {/* Center nav links — hidden below md */}
          <div className="vanguard-desktop-links">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-inter"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.875rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right — GET IN TOUCH button (hidden below md) */}
          <a
            href="#"
            className="vanguard-desktop-cta font-inter"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '12px 24px',
              color: 'white',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              borderRadius: 0,
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            GET IN TOUCH <ArrowUpRight size={14} />
          </a>

          {/* Hamburger — visible below md */}
          <button
            className="vanguard-hamburger"
            onClick={() => setMenuOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: '6px',
              padding: '8px',
            }}
            aria-label="Open menu"
          >
            <div style={{ width: '24px', height: '2px', background: 'white' }} />
            <div style={{ width: '24px', height: '2px', background: 'white' }} />
            <div style={{ width: '16px', height: '2px', background: 'white' }} />
          </button>
        </nav>

        {/* ========== MOBILE MENU OVERLAY ========== */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            flexDirection: 'column',
            opacity: menuOpen ? 1 : 0,
            visibility: menuOpen ? 'visible' : 'hidden',
            transition: 'all 500ms ease',
          }}
        >
          {/* Mobile menu header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
          }}>
            <a href="/" className="font-podium" style={{
              color: 'white',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
            }}>
              VANGUARD
            </a>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '8px',
              }}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Mobile nav links — centered */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}>
            {navLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                className="font-podium"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'white',
                  fontSize: 'clamp(2.5rem, 6vw, 3.125rem)',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  transitionDelay: `${i * 80 + 100}ms`,
                }}
              >
                {link}
              </a>
            ))}

            {/* Mobile GET IN TOUCH button */}
            <a
              href="#"
              className="font-inter"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '14px 28px',
                color: 'white',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                marginTop: '16px',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                transitionDelay: `${navLinks.length * 80 + 100}ms`,
              }}
            >
              GET IN TOUCH <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* ========== HERO CONTENT ========== */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          height: 'calc(100vh - 100px)',
          padding: '0 24px',
        }}
        className="vanguard-hero-content"
        >
          <div style={{ maxWidth: '900px' }}>

            {/* Tagline */}
            <div className="animate-fade-up" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}>
              <Crown size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
              <span className="font-inter" style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 'clamp(0.6875rem, 1.5vw, 0.875rem)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}>
                World-Class Digital Collective
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-podium animate-fade-up-delay-1" style={{
              color: 'white',
              textTransform: 'uppercase',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              fontWeight: 700,
              margin: 0,
              fontFamily: "'FSP DEMO - PODIUM Sharp 4.11', 'Arial Black', sans-serif",
            }}>
              Design.<br />
              Disrupt.<br />
              Conquer.
            </h1>

            {/* Subtext */}
            <p className="font-inter animate-fade-up-delay-2" style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              lineHeight: 1.7,
              maxWidth: '28rem',
              marginTop: '24px',
            }}>
              We build fierce brand identities<br />
              that don&apos;t just turn heads —{' '}
              <strong style={{ color: 'white', fontWeight: 700 }}>they lead.</strong>
            </p>

            {/* CTA Row */}
            <div className="animate-fade-up-delay-3" style={{
              marginTop: '32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
            }}>
              {/* SEE OUR WORK button */}
              <a
                href="#"
                className="font-inter vanguard-cta-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'black',
                  color: 'white',
                  padding: '14px 28px',
                  fontSize: 'clamp(0.6875rem, 1.5vw, 0.75rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.3s ease',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#171717'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'black'}
              >
                SEE OUR WORK
                <ArrowUpRight size={14} style={{ transition: 'transform 0.3s ease' }} />
              </a>

              {/* Award badge — hidden on mobile */}
              <div className="vanguard-award-badge" style={{
                display: 'none',
                alignItems: 'center',
                gap: '10px',
              }}>
                <Award size={32} style={{ color: 'rgba(255,255,255,0.5)' }} />
                <div>
                  <div className="font-inter" style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    lineHeight: 1.4,
                  }}>
                    Top-Rated
                  </div>
                  <div className="font-inter" style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    lineHeight: 1.4,
                  }}>
                    Brand Studio
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="animate-fade-up-delay-4" style={{
              marginTop: '40px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
            }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-inter" style={{
                    color: 'white',
                    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div className="font-inter" style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 'clamp(0.5625rem, 1.2vw, 0.75rem)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== RESPONSIVE STYLES ========== */}
      <style jsx>{`
        .vanguard-nav {
          padding: 20px 24px;
        }
        @media (min-width: 640px) {
          .vanguard-nav {
            padding: 20px 40px;
          }
          .vanguard-hero-content {
            padding: 0 40px !important;
          }
        }
        @media (min-width: 1024px) {
          .vanguard-nav {
            padding: 28px 64px;
          }
          .vanguard-hero-content {
            padding: 0 64px !important;
          }
        }

        /* Desktop nav links & CTA — show at md+ */
        .vanguard-desktop-links {
          display: none;
          gap: 32px;
        }
        .vanguard-desktop-cta {
          display: none !important;
        }
        .vanguard-hamburger {
          display: flex !important;
        }

        @media (min-width: 768px) {
          .vanguard-desktop-links {
            display: flex;
          }
          .vanguard-desktop-cta {
            display: inline-flex !important;
          }
          .vanguard-hamburger {
            display: none !important;
          }
        }

        /* Award badge — show at sm+ */
        @media (min-width: 640px) {
          .vanguard-award-badge {
            display: flex !important;
          }
        }

        /* Stats responsive gaps */
        @media (min-width: 640px) {
          .animate-fade-up-delay-4 {
            gap: 48px !important;
            margin-top: 40px !important;
          }
        }
        @media (min-width: 1024px) {
          .animate-fade-up-delay-4 {
            gap: 64px !important;
            margin-top: 56px !important;
          }
          .animate-fade-up-delay-3 {
            margin-top: 40px !important;
          }
          .animate-fade-up {
            margin-bottom: 32px !important;
          }
        }
      `}</style>
    </>
  );
}
