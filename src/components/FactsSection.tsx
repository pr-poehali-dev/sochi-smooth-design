import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const facts = [
  { icon: 'Users', value: 7_200_000, suffix: '+', label: 'туристов в год', color: 'hsl(42,75%,58%)' },
  { icon: 'Sun', value: 287, suffix: '', label: 'солнечных дней', color: 'hsl(38,90%,60%)' },
  { icon: 'Thermometer', value: 22, suffix: '°', label: 'температура моря', color: 'hsl(195,60%,50%)' },
  { icon: 'Mountain', value: 2320, suffix: 'м', label: 'высшая точка курорта', color: 'hsl(220,40%,65%)' },
  { icon: 'Hotel', value: 400, suffix: '+', label: 'отелей и санаториев', color: 'hsl(160,50%,45%)' },
  { icon: 'Waves', value: 40, suffix: ' км', label: 'пляжной линии', color: 'hsl(210,65%,55%)' },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function FactCard({ fact, index }: { fact: typeof facts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(fact.value, 1600, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const fmt = (n: number) =>
    n >= 1_000_000
      ? (n / 1_000_000).toFixed(1) + ' млн'
      : n >= 1_000
      ? (n / 1_000).toFixed(0) + ' тыс'
      : n.toString();

  return (
    <div
      ref={ref}
      className="glass rounded-2xl p-6 flex flex-col items-center text-center group card-hover"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s, box-shadow 0.5s ease`,
        borderTop: `1px solid ${fact.color}30`,
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
        style={{ background: `${fact.color}15`, border: `1px solid ${fact.color}30` }}
      >
        <Icon name={fact.icon} size={22} style={{ color: fact.color }} fallback="Star" />
      </div>

      <div
        className="font-display text-4xl font-light mb-1 tabular-nums"
        style={{ color: fact.color }}
      >
        {fmt(count)}{fact.suffix}
      </div>
      <div className="font-body text-foreground/45 text-xs tracking-wide leading-snug">{fact.label}</div>
    </div>
  );
}

export default function FactsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Горизонтальная разделяющая линия с градиентом */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, hsl(42,75%,50%,0.3), transparent)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, hsl(195,60%,45%,0.2), transparent)' }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gold/3 blur-[80px]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-sea/4 blur-[80px]" />
      </div>

      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="font-body text-gold/70 tracking-[0.3em] text-xs uppercase mb-3">Сочи в цифрах</p>
          <h2 className="font-display text-5xl font-light text-foreground">
            Факты о<br /><span className="text-gold italic">городе</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facts.map((fact, i) => (
            <FactCard key={fact.label} fact={fact} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
