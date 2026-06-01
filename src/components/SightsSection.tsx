import { useEffect, useRef, useState } from 'react';

const BEACH_IMG = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/20f5227b-cd58-4a2f-a866-2e7baa54c581.jpg';
const MOUNTAIN_IMG = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/9c79469b-1822-42ba-b0b1-3afe4a80d7c1.jpg';

const sights = [
  {
    emoji: '🌊',
    title: 'Ривьера',
    subtitle: 'Парк развлечений',
    desc: 'Старейший парк Сочи основан в 1898 году. Пышные субтропические сады, аттракционы, концертные площадки на берегу моря.',
    tag: 'Парк',
    img: BEACH_IMG,
  },
  {
    emoji: '⛷️',
    title: 'Роза Хутор',
    subtitle: 'Горнолыжный курорт',
    desc: 'Курорт мирового уровня на высоте до 2320 м. 102 км горнолыжных трасс, построенных к Олимпиаде 2014 года.',
    tag: 'Горы',
    img: MOUNTAIN_IMG,
  },
  {
    emoji: '🌿',
    title: 'Дендрарий',
    subtitle: 'Ботанический сад',
    desc: 'Один из крупнейших дендрариев России. Более 1800 видов растений со всего мира на площади 48 гектаров.',
    tag: 'Природа',
    img: BEACH_IMG,
  },
  {
    emoji: '🏔️',
    title: 'Агурские водопады',
    subtitle: 'Природный заповедник',
    desc: 'Каскад живописных водопадов в ущелье реки Агура. Маршрут протяжённостью 6 км через реликтовый лес.',
    tag: 'Природа',
    img: MOUNTAIN_IMG,
  },
  {
    emoji: '🎢',
    title: 'Олимпийский парк',
    subtitle: 'Спортивный комплекс',
    desc: 'Наследие Олимпиады 2014 года. Стадион «Фишт», арена «Айсберг», трассы «Санки» и «Лаура» открыты для посетителей.',
    tag: 'Спорт',
    img: BEACH_IMG,
  },
  {
    emoji: '🌸',
    title: 'Мацеста',
    subtitle: 'Бальнеологический курорт',
    desc: 'Знаменитые сероводородные источники, известные с XIX века. Природные ванны с целебными минеральными водами.',
    tag: 'Здоровье',
    img: MOUNTAIN_IMG,
  },
];

function SightCard({ sight, index }: { sight: typeof sights[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`card-hover glass rounded-2xl overflow-hidden group transition-all duration-600 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={sight.img}
          alt={sight.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 img-overlay" />
        <span className="absolute top-4 left-4 glass text-xs font-body text-gold px-3 py-1 rounded-full border border-gold/20 tracking-wider">
          {sight.tag}
        </span>
        <span className="absolute bottom-4 left-4 text-3xl">{sight.emoji}</span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl text-foreground mb-1">{sight.title}</h3>
        <p className="font-body text-sea text-xs mb-3 tracking-wide">{sight.subtitle}</p>
        <p className="font-body text-foreground/50 text-sm leading-relaxed">{sight.desc}</p>
      </div>
    </div>
  );
}

export default function SightsSection() {
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
    <section id="sights" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-sea/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-body text-gold/70 tracking-[0.3em] text-xs uppercase mb-3">Что посмотреть</p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-foreground mb-4">
            Достопримеча-<br /><span className="text-gold italic">тельности</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sights.map((sight, index) => (
            <SightCard key={sight.title} sight={sight} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
