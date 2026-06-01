import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/cfd03d64-4763-400a-9aef-f8e44fb6fa40.jpg';
const BEACH_IMG = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/20f5227b-cd58-4a2f-a866-2e7baa54c581.jpg';
const MOUNTAIN_IMG = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/9c79469b-1822-42ba-b0b1-3afe4a80d7c1.jpg';

const hotels = [
  {
    name: 'Radisson Blu Paradise',
    stars: 5,
    type: 'Пляжный resort',
    price: 'от 12 000 ₽/ночь',
    rating: 9.2,
    tags: ['Бассейн', 'Пляж', 'Спа'],
    img: BEACH_IMG,
    desc: 'Роскошный отель прямо на берегу моря с личным пляжем, несколькими ресторанами и полным спа-комплексом.',
  },
  {
    name: 'Сочи Марриотт Красная Поляна',
    stars: 5,
    type: 'Горный отель',
    price: 'от 9 500 ₽/ночь',
    rating: 9.0,
    tags: ['Горы', 'Ски-ин/аут', 'Спа'],
    img: MOUNTAIN_IMG,
    desc: 'Альпийский шарм у подножия Кавказских гор. Прямой выход на горнолыжные трассы Розы Хутор.',
  },
  {
    name: 'Pullman Сочи Центр',
    stars: 5,
    type: 'Городской отель',
    price: 'от 7 800 ₽/ночь',
    rating: 8.8,
    tags: ['Центр', 'Бассейн', 'Ресторан'],
    img: HERO_IMG,
    desc: 'Современный дизайн-отель в самом сердце Сочи. Панорамный бар на крыше с видом на море и горы.',
  },
  {
    name: 'Санаторий «Знание»',
    stars: 4,
    type: 'Санаторно-курортный',
    price: 'от 4 200 ₽/ночь',
    rating: 8.5,
    tags: ['Лечение', 'Пляж', 'Питание'],
    img: BEACH_IMG,
    desc: 'Лечебный санаторий с полным пансионом, собственным пляжем и медицинскими процедурами на основе сочинских минеральных вод.',
  },
  {
    name: 'Rosa Springs',
    stars: 4,
    type: 'Бутик-отель',
    price: 'от 5 500 ₽/ночь',
    rating: 9.1,
    tags: ['Горы', 'Уют', 'Природа'],
    img: MOUNTAIN_IMG,
    desc: 'Камерный бутик-отель в Красной Поляне. Всего 24 номера, авторская кухня и потрясающие виды на заснеженные пики.',
  },
  {
    name: 'Гранд Отель «Жемчуга»',
    stars: 4,
    type: 'Семейный отдых',
    price: 'от 3 800 ₽/ночь',
    rating: 8.3,
    tags: ['Семьи', 'Аквапарк', 'Пляж'],
    img: BEACH_IMG,
    desc: 'Идеален для семейного отдыха: детский клуб, мини-аквапарк, анимация и несколько бассейнов у самого моря.',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Icon
          key={i}
          name="Star"
          size={10}
          className={i < count ? 'text-gold fill-gold' : 'text-foreground/20'}
        />
      ))}
    </div>
  );
}

function HotelCard({ hotel, index }: { hotel: typeof hotels[0]; index: number }) {
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
    <div
      ref={ref}
      className={`card-hover glass rounded-2xl overflow-hidden group`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-shadow 0.4s ease`,
      }}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={hotel.img}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 img-overlay" />
        <div className="absolute top-4 right-4 glass text-sm font-body font-500 text-foreground px-3 py-1 rounded-full">
          <span className="text-gold">{hotel.rating}</span>
          <span className="text-foreground/40 text-xs"> / 10</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <StarRating count={hotel.stars} />
            <h3 className="font-display text-lg text-foreground mt-1 leading-tight">{hotel.name}</h3>
          </div>
        </div>

        <p className="font-body text-sea text-xs mb-3 tracking-wide">{hotel.type}</p>
        <p className="font-body text-foreground/50 text-xs leading-relaxed mb-4">{hotel.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.tags.map(tag => (
            <span key={tag} className="font-body text-xs text-foreground/40 glass px-2.5 py-1 rounded-full border border-white/5">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="font-display text-lg text-gold">{hotel.price}</span>
          <button className="font-body text-xs text-foreground/40 hover:text-gold transition-colors flex items-center gap-1">
            Забронировать <Icon name="ExternalLink" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HotelsSection() {
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
    <section id="hotels" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[600px] h-[300px] rounded-full bg-sea/4 blur-[80px] pointer-events-none -translate-x-1/2" />

      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-body text-gold/70 tracking-[0.3em] text-xs uppercase mb-3">Где остановиться</p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-foreground mb-4">
            Лучшие<br /><span className="text-gold italic">отели</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hotels.map((hotel, index) => (
            <HotelCard key={hotel.name} hotel={hotel} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
