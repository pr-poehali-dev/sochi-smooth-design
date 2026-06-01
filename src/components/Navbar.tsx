import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const links = [
  { href: '#home', label: 'Главная' },
  { href: '#history', label: 'История' },
  { href: '#sights', label: 'Достопримечательности' },
  { href: '#tours', label: 'Экскурсии' },
  { href: '#hotels', label: 'Отели' },
  { href: '#weather', label: 'Погода' },
  { href: '#contacts', label: 'Контакты' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = links.map(l => document.querySelector(l.href));
      let current = '#home';
      sections.forEach((sec) => {
        if (sec && window.scrollY >= (sec as HTMLElement).offsetTop - 120) {
          current = '#' + sec.id;
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => handleClick('#home')}
          className="font-display text-2xl font-light text-gold tracking-widest"
        >
          СОЧИ
        </button>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleClick(link.href)}
                className={`nav-link font-body text-sm tracking-wide transition-colors ${
                  active === link.href
                    ? 'text-gold active'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile */}
        <button
          className="lg:hidden text-foreground/70"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden glass border-t border-white/5 mt-1">
          <ul className="flex flex-col py-4 px-6 gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleClick(link.href)}
                  className={`text-left font-body text-sm tracking-wide transition-colors ${
                    active === link.href ? 'text-gold' : 'text-foreground/60'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
