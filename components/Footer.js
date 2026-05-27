import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="nav-logo">ZILIST</Link>
          <p className="footer-desc">Building intelligent AI systems, automation platforms and premium digital experiences for the future.</p>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/about">About Us</Link>
          <Link href="/about">Our Mission</Link>
          <Link href="/about">Careers</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <Link href="/solutions">AI Automation</Link>
          <Link href="/solutions">AI Chatbots</Link>
          <Link href="/solutions">Web Development</Link>
          <Link href="/solutions">Data Analytics</Link>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <Link href="/resources">Articles</Link>
          <Link href="/resources">Guides</Link>
          <Link href="/resources">Tutorials</Link>
          <Link href="/resources">Tools</Link>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link href="/projects">Projects</Link>
          <Link href="/about">Testimonials</Link>
          <Link href="/contact">Privacy Policy</Link>
          <Link href="/contact">Terms</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2024 ZILIST by Praveen Kannan. All rights reserved.</p>
        <div style={{display:'flex',gap:'24px'}}>
          <Link href="/contact" style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>Privacy</Link>
          <Link href="/contact" style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>Terms</Link>
          <a href="mailto:praveenkicha01@gmail.com" style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>praveenkicha01@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
