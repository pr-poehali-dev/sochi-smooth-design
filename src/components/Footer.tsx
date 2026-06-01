export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            onClick={() => scrollTo('home')}
            className="font-display text-2xl font-light text-gold tracking-widest"
          >
            СОЧИ
          </button>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { id: 'history', label: 'История' },
              { id: 'sights', label: 'Достопримечательности' },
              { id: 'tours', label: 'Экскурсии' },
              { id: 'hotels', label: 'Отели' },
              { id: 'weather', label: 'Погода' },
              { id: 'contacts', label: 'Контакты' },
            ].map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-body text-xs text-foreground/30 hover:text-foreground/70 transition-colors tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>

          <p className="font-body text-xs text-foreground/20">
            © {new Date().getFullYear()} Сочи · Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
}
