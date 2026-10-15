import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Ghost,
  ChevronDown,
  Heart,
  Instagram,
  Menu,
  Music2,
  Sparkles,
  Star,
  X,
  Zap,
} from 'lucide-react';

const heroImage = '/images/image.png';

const navItems = [
  { label: 'The Ghoul', href: '#the-ghoul' },
  { label: 'Style Files', href: '#style' },
  { label: 'Moodboard', href: '#aesthetic' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Fan Zone', href: '#fan-zone' },
];

const looks = [
  { number: '01', title: 'Pink Voltage', detail: 'Satin corsets / silver shine', position: 'center 25%' },
  { number: '02', title: 'Batty Romance', detail: 'Lace gloves / heart hardware', position: 'left 45%' },
  { number: '03', title: 'After Dark', detail: 'Platform attitude / glossy lips', position: 'right 55%' },
];

const moodTiles = [
  { label: 'Pretty in pink', className: 'mood-pink' },
  { label: 'Main character energy', className: 'mood-black' },
  { label: 'Love bites', className: 'mood-white' },
  { label: 'Eek, iconic', className: 'mood-checker' },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="section-label">
      <span className="label-line" />
      <span>{children}</span>
      <span className="label-line label-line-right" />
    </div>
  );
}

function SparkleField() {
  return (
    <div className="sparkle-field" aria-hidden="true">
      <Sparkles className="sparkle sparkle-one" />
      <Star className="sparkle sparkle-two" />
      <Sparkles className="sparkle sparkle-three" />
      <Star className="sparkle sparkle-four" />
      <span className="floating-heart heart-one">♥</span>
      <span className="floating-heart heart-two">♥</span>
      <span className="floating-heart heart-three">♥</span>
    </div>
  );
}

export function DraculauraPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="draculaura-site">
      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <a className="brand-mark" href="#top" onClick={closeMenu} aria-label="Draculaura home">
          <span className="brand-icon"><Ghost size={19} strokeWidth={2.4} /></span>
          <span>DRACULAURA<span className="brand-dot">.</span></span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="nav-cta" href="#fan-zone" onClick={closeMenu}>Join the coven <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <SparkleField />
        <div className="hero-copy">
          <p className="eyebrow">The original pink ghoul <span>✦</span> Est. 2008</p>
          <h1>TOO GHOUL<br /><em>FOR SCHOOL</em></h1>
          <p className="hero-subtitle">Fierce looks. Dark secrets.<br /><strong>Pink perfection.</strong></p>
          <div className="hero-actions">
            <a className="button button-dark" href="#the-ghoul">Enter the ghoul world <ArrowUpRight size={17} /></a>
            <a className="button button-light" href="#style">Explore the looks <ChevronDown size={17} /></a>
          </div>
        </div>
        <div className="hero-character-wrap">
          <div className="hero-ring hero-ring-one" />
          <div className="hero-ring hero-ring-two" />
          <div className="hero-badge"><span>♡</span><small>FANGS<br />OUT</small></div>
          <img className="hero-character" src={heroImage} alt="Draculaura in her signature pink and black look" />
          <div className="hero-side-note">VOL. 13 <span>—</span> DARK GLAMOUR</div>
        </div>
        <div className="scroll-cue"><ArrowDown size={14} /><span>Scroll to haunt</span></div>
      </section>

      <section className="intro section-shell" id="the-ghoul">
        <div className="intro-stamp">MH<br /><span>01</span></div>
        <div className="intro-image-card">
          <div className="card-frame" />
          <img src={heroImage} alt="Draculaura editorial portrait" />
          <span className="image-caption">Pink is a power color.</span>
        </div>
        <div className="intro-copy">
          <SectionLabel>The Ghoul</SectionLabel>
          <h2>Sweet like<br /><span>nightshade.</span></h2>
          <p className="lead">Meet the icon who made being a little different look completely irresistible.</p>
          <p>Draculaura is equal parts romantic, rebellious, and radically herself. With a heart for her friends and a wardrobe that could stop traffic in the underworld, she proves that the darkest nights can still have the brightest style.</p>
          <div className="fact-row"><span>01</span><p>Born to stand out. Dressed to haunt.</p></div>
          <a className="text-link" href="#style">Read her style story <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section className="style-section" id="style">
        <div className="style-top section-shell">
          <div>
            <SectionLabel>Signature Style</SectionLabel>
            <h2>Looks that<br /><span>bite back.</span></h2>
          </div>
          <p className="style-intro">A little lace. A lot of attitude.<br />Never, ever basic.</p>
        </div>
        <div className="looks-grid section-shell">
          {looks.map((look, index) => (
            <article className={`look-card look-card-${index + 1}`} key={look.number}>
              <div className="look-image">
                <img src={heroImage} alt={look.title} style={{ objectPosition: look.position }} />
                <span className="look-number">{look.number}</span>
                <span className="look-arrow"><ArrowUpRight size={19} /></span>
              </div>
              <div className="look-meta"><h3>{look.title}</h3><p>{look.detail}</p></div>
            </article>
          ))}
        </div>
        <div className="style-marquee" aria-hidden="true"><span>GOTHIC GLAMOUR</span><span>♡</span><span>GOTHIC GLAMOUR</span><span>♡</span></div>
      </section>

      <section className="aesthetic section-shell" id="aesthetic">
        <div className="aesthetic-copy">
          <SectionLabel>The Aesthetic</SectionLabel>
          <h2>Soft heart.<br /><span>Sharp edges.</span></h2>
          <p>Welcome to a world of candy-colored darkness, where every detail is a little bit extra and the rules are made to be rewritten.</p>
          <div className="aesthetic-signature">xoxo, <strong>Drac</strong></div>
        </div>
        <div className="moodboard">
          <div className="moodboard-sticker sticker-top">NO<br />BASIC<br />BITES</div>
          {moodTiles.map((tile) => <div className={`mood-tile ${tile.className}`} key={tile.label}><span>{tile.label}</span></div>)}
          <div className="moodboard-sticker sticker-bottom"><Heart size={20} fill="currentColor" /> always<br />be you</div>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-shell">
          <SectionLabel>From the Coffin</SectionLabel>
          <div className="gallery-heading"><h2>Gallery of<br /><span>glamour.</span></h2><p>Save the looks.<br />Steal the mood.</p></div>
          <div className="gallery-grid">
            <figure className="gallery-card gallery-tall"><img src={heroImage} alt="Draculaura pink fashion detail" style={{ objectPosition: '15% 50%' }} /><figcaption><span>01 / Pink Power</span><ArrowUpRight size={17} /></figcaption></figure>
            <figure className="gallery-card gallery-wide"><img src={heroImage} alt="Draculaura gothic beauty look" style={{ objectPosition: '86% 35%' }} /><figcaption><span>02 / Batty but make it fashion</span><ArrowUpRight size={17} /></figcaption></figure>
            <figure className="gallery-card gallery-square"><img src={heroImage} alt="Draculaura signature style" style={{ objectPosition: '50% 15%' }} /><figcaption><span>03 / Love bites</span><ArrowUpRight size={17} /></figcaption></figure>
          </div>
        </div>
      </section>

      <section className="fan-zone section-shell" id="fan-zone">
        <div className="fan-zone-card">
          <div className="fan-sparkle"><Sparkles size={24} /></div>
          <SectionLabel>Fan Zone</SectionLabel>
          <h2>What kind of<br /><span>ghoul are you?</span></h2>
          <p>Pick your poison. We already know it will be fabulous.</p>
          <div className="quiz-options">
            {['Pink heart romantic', 'Midnight mischief maker', 'Glamour ghoul supreme'].map((answer) => (
              <button className={quizAnswer === answer ? 'quiz-option selected' : 'quiz-option'} key={answer} onClick={() => setQuizAnswer(answer)}>
                <span className="quiz-icon">{answer === 'Pink heart romantic' ? '♡' : answer === 'Midnight mischief maker' ? '✦' : '★'}</span>{answer}<ArrowUpRight size={15} />
              </button>
            ))}
          </div>
          {quizAnswer && <div className="quiz-result"><Zap size={16} /> Your result: <strong>{quizAnswer}</strong>. Obviously iconic.</div>}
          <div className="fan-bottom"><span>Tag your looks <strong>#TooGhoulForSchool</strong></span><span className="social-row"><Instagram size={17} /><Music2 size={17} /><Heart size={17} fill="currentColor" /></span></div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-icon"><Ghost size={19} /></span><span>DRACULAURA<span className="brand-dot">.</span></span></div>
        <p>For ghouls who were never meant to blend in.</p>
        <div className="footer-links"><a href="#top">Back to top <ArrowUpRight size={14} /></a><span>© 2026 Pink &amp; Fang Co.</span></div>
      </footer>
    </main>
  );
}
