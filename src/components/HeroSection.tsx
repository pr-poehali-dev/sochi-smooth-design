import { useEffect, useRef, useState } from 'react';

const IMAGES = [
  'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/cfd03d64-4763-400a-9aef-f8e44fb6fa40.jpg',
  'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/20f5227b-cd58-4a2f-a866-2e7baa54c581.jpg',
  'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/9c79469b-1822-42ba-b0b1-3afe4a80d7c1.jpg',
];

const CAPTIONS = ['Черноморское побережье', 'Пляжи и лазурь', 'Роза Хутор'];

const PARTICLES = [
  { w: 260, h: 260, l: 8,  t: 10, delay: 0,   dur: 5.5 },
  { w: 160, h: 160, l: 75, t: 60, delay: 1.2, dur: 4.8 },
  { w: 200, h: 200, l: 50, t: 5,  delay: 2.1, dur: 6.2 },
  { w: 100, h: 100, l: 20, t: 70, delay: 0.5, dur: 4.2 },
  { w: 140, h: 140, l: 85, t: 20, delay: 1.8, dur: 5.0 },
  { w: 80,  h: 80,  l: 60, t: 80, delay: 3.0, dur: 3.8 },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const goTo = (idx: number) => {
    if (transitioning || idx === current) return;
    setPrev(current);
    setCurrent(idx);
    setTransitioning(true);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 1000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % IMAGES.length;
        setPrev(c);
        setTransitioning(true);
        setTimeout(() => { setPrev(null); setTransitioning(false); }, 1000);
        return next;
      });
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Слайдер с Ken Burns + cross-fade */}
      <div className="absolute inset-0">
        {IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : i === prev ? 0 : 0,
              transition: i === current
                ? 'opacity 1.2s cubic-bezier(0.4,0,0.2,1)'
                : i === prev
                ? 'opacity 1.2s cubic-bezier(0.4,0,0.2,1)'
                : 'none',
              zIndex: i === current ? 2 : i === prev ? 1 : 0,
            }}
          >
            <img
              src={src}
              alt={CAPTIONS[i]}
              className="w-full h-full object-cover"
              style={{
                transform: i === current
                  ? `scale(1.08) translateY(${scrollY * 0.25}px)`
                  : 'scale(1.0)',
                transition: i === current
                  ? 'transform 8s cubic-bezier(0.25,0.46,0.45,0.94)'
                  : 'none',
              }}
            />
          </div>
        ))}
        {/* Градиентный оверлей */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to bottom, hsl(220,25%,8%,0.55) 0%, hsl(220,25%,8%,0.25) 40%, hsl(220,25%,8%,0.85) 80%, hsl(220,25%,8%) 100%)',
          }}
        />
        {/* Боковые затемнения */}
        <div className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to right, hsl(220,25%,8%,0.6) 0%, transparent 30%, transparent 70%, hsl(220,25%,8%,0.6) 100%)' }}
        />
      </div>

      {/* Плавающие частицы-блобы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: p.w,
              height: p.h,
              left: `${p.l}%`,
              top: `${p.t}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
              filter: 'blur(50px)',
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)'
                : 'radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)',
            }}
          />
        ))}
        {/* Волновая линия снизу */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ opacity: 0.15 }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="hsl(42,75%,58%)"
          />
        </svg>
      </div>

      {/* Контент */}
      <div className="relative z-30 text-center px-6 max-w-5xl mx-auto">
        {/* Текущий caption */}
        <div
          className="font-body text-gold/60 tracking-[0.5em] text-xs uppercase mb-4 animate-fade-up"
          style={{ animationDelay: '0.05s', opacity: 0, transition: 'all 0.6s ease' }}
        >
          {CAPTIONS[current]}
        </div>

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
            className="gradient-gold text-[hsl(220,25%,8%)] font-body px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:scale-105 animate-pulse-gold font-semibold"
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

      {/* Точки-пагинация слайдера */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-500"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? 'hsl(42,75%,58%)' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float z-30">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-gold/50" />
        <span className="font-body text-foreground/30 text-xs tracking-widest uppercase">скролл</span>
      </div>
    </section>
  );
}
