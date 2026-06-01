import { useEffect, useRef, useState } from 'react';

const timeline = [
  {
    year: '1838',
    title: 'Основание крепости',
    text: 'На берегу Чёрного моря основана русская военная крепость Александрия, ставшая прообразом современного Сочи.',
  },
  {
    year: '1896',
    title: 'Статус города',
    text: 'Посёлок получает статус города и переименовывается в Сочи. Начинается строительство первых курортных зданий и санаториев.',
  },
  {
    year: '1934',
    title: 'Всесоюзная здравница',
    text: 'Сталин лично выбирает Сочи местом отдыха советской элиты. Строятся грандиозные санатории в стиле сталинского ампира.',
  },
  {
    year: '1979',
    title: 'Олимпийская мечта',
    text: 'Сочи впервые подаёт заявку на проведение Олимпийских игр. Город активно развивается как международный курорт.',
  },
  {
    year: '2014',
    title: 'Зимняя Олимпиада',
    text: 'XXII Зимние Олимпийские игры. Масштабная трансформация города: новые дороги, стадионы и горнолыжные курорты мирового уровня.',
  },
  {
    year: 'Сегодня',
    title: 'Круглогодичный курорт',
    text: 'Более 7 миллионов туристов ежегодно. Уникальное сочетание субтропического климата, горного воздуха и морского побережья.',
  },
];

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex gap-6 transition-all duration-700 ${
        visible ? 'opacity-100 translate-x-0' : index % 2 === 0 ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Левая часть (год) */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-gold" />
        </div>
        {index < timeline.length - 1 && (
          <div className="w-[1px] flex-1 bg-gradient-to-b from-gold/30 to-transparent mt-2" />
        )}
      </div>

      {/* Контент */}
      <div className="pb-10 flex-1">
        <div className="font-display text-gold text-2xl font-light mb-1">{item.year}</div>
        <h3 className="font-display text-xl text-foreground mb-2">{item.title}</h3>
        <p className="font-body text-foreground/55 text-sm leading-relaxed">{item.text}</p>
      </div>
    </div>
  );
}

export default function HistorySection() {
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
    <section id="history" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-body text-gold/70 tracking-[0.3em] text-xs uppercase mb-3">История</p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-foreground mb-4">
            Два века<br /><span className="text-gold italic">у моря</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="max-w-2xl">
          {timeline.map((item, index) => (
            <TimelineItem key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
