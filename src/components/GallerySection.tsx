import { useEffect, useRef, useState } from 'react';

const BEACH = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/20f5227b-cd58-4a2f-a866-2e7baa54c581.jpg';
const MOUNTAIN = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/9c79469b-1822-42ba-b0b1-3afe4a80d7c1.jpg';
const HERO = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/cfd03d64-4763-400a-9aef-f8e44fb6fa40.jpg';

const ROW1 = [
  { src: HERO,     label: 'Панорама Сочи',       mood: 'Закат' },
  { src: BEACH,    label: 'Пляжи Ривьеры',        mood: 'Лето' },
  { src: MOUNTAIN, label: 'Роза Хутор',           mood: 'Зима' },
  { src: HERO,     label: 'Набережная',           mood: 'Вечер' },
  { src: BEACH,    label: 'Морской бриз',         mood: 'Рассвет' },
];

const ROW2 = [
  { src: MOUNTAIN, label: 'Кавказские горы',      mood: 'Высота' },
  { src: BEACH,    label: 'Лазурное побережье',   mood: 'Прибой' },
  { src: HERO,     label: 'Сочи с воздуха',       mood: 'Панорама' },
  { src: MOUNTAIN, label: 'Снежные вершины',      mood: 'Альпы' },
  { src: BEACH,    label: 'Пальмы у моря',        mood: 'Субтропики' },
];

function InfiniteRow({
  items,
  direction = 1,
  speed = 40,
}: {
  items: typeof ROW1;
  direction?: 1 | -1;
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const posRef = useRef(0);
  const rafRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfW = track.scrollWidth / 2;

    const animate = (ts: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;

      if (!paused) {
        posRef.current += direction * speed * dt;
        if (direction === 1 && posRef.current >= halfW) posRef.current -= halfW;
        if (direction === -1 && posRef.current <= -halfW) posRef.current += halfW;
        if (direction === -1 && posRef.current > 0) posRef.current -= halfW;
        track.style.transform = `translateX(${-posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, direction, speed]);

  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
            style={{ width: '280px', height: '180px' }}
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(to top, rgba(12,18,28,0.85) 0%, transparent 60%)',
                opacity: 0,
              }}
            />
            <div
              className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: 'linear-gradient(to top, rgba(12,18,28,0.85) 0%, transparent 60%)' }}
            >
              <span className="font-body text-gold text-xs tracking-widest uppercase">{item.mood}</span>
              <span className="font-display text-base text-foreground">{item.label}</span>
            </div>
            {/* Рамка-блик при hover */}
            <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/30 transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GallerySection() {
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
    <section id="gallery" className="py-24 relative overflow-hidden">
      {/* Фоновые блобы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/2 w-96 h-96 rounded-full bg-sea/5 blur-[90px]" />
        <div className="absolute right-1/4 top-0 w-80 h-80 rounded-full bg-gold/4 blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 mb-12">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-body text-gold/70 tracking-[0.3em] text-xs uppercase mb-3">Атмосфера</p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-foreground mb-2">
            Галерея<br /><span className="text-gold italic">впечатлений</span>
          </h2>
          <p className="font-body text-foreground/40 text-sm mt-3">Наведи на фото, чтобы остановить</p>
        </div>
      </div>

      {/* Бесконечные ряды */}
      <div className="space-y-4">
        <InfiniteRow items={ROW1} direction={1} speed={38} />
        <InfiniteRow items={ROW2} direction={-1} speed={30} />
      </div>

      {/* Маски по краям */}
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, hsl(220,25%,8%), transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, hsl(220,25%,8%), transparent)' }}
      />
    </section>
  );
}
