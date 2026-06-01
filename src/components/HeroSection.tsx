const HERO_IMG = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/cfd03d64-4763-400a-9aef-f8e44fb6fa40.jpg';

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Сочи"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,25%,8%)]/60 via-[hsl(220,25%,8%)]/40 to-[hsl(220,25%,8%)]" />
      </div>

      {/* Декоративные частицы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/10 animate-float"
            style={{
              width: `${Math.random() * 200 + 60}px`,
              height: `${Math.random() * 200 + 60}px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p
          className="font-body text-gold/80 tracking-[0.4em] text-sm uppercase mb-6 animate-fade-up"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          Курортная столица России
        </p>

        <h1
          className="font-display text-6xl sm:text-7xl lg:text-9xl font-light text-foreground leading-none mb-6 animate-fade-up"
          style={{ animationDelay: '0.25s', opacity: 0 }}
        >
          Сочи
        </h1>

        <p
          className="font-body text-foreground/60 text-lg sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.45s', opacity: 0 }}
        >
          Где горы встречаются с морем — 365 дней в году
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          <button
            onClick={() => scrollTo('sights')}
            className="gradient-gold text-[hsl(220,25%,8%)] font-body font-600 px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:scale-105 animate-pulse-gold"
          >
            Исследовать
          </button>
          <button
            onClick={() => scrollTo('history')}
            className="glass text-foreground/80 font-body px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-white/8 transition-all duration-300 border border-white/10"
          >
            История города
          </button>
        </div>

        {/* Статистика */}
        <div
          className="flex flex-wrap justify-center gap-10 mt-20 animate-fade-up"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          {[
            { value: '176', label: 'лет истории' },
            { value: '40 км', label: 'пляжей' },
            { value: '+24°', label: 'летом' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl text-gold font-light">{stat.value}</div>
              <div className="font-body text-foreground/40 text-xs tracking-widest uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-gold/50" />
        <span className="font-body text-foreground/30 text-xs tracking-widest uppercase">скролл</span>
      </div>
    </section>
  );
}
