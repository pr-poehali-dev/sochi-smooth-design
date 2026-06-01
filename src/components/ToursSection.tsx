import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const tours = [
  {
    icon: 'Mountain',
    title: 'Горный треккинг',
    duration: '8 часов',
    price: 'от 2 800 ₽',
    difficulty: 'Средний',
    desc: 'Маршрут через Агурское ущелье, водопады и Орлиные скалы. Незабываемые виды на Черноморское побережье.',
    color: 'from-emerald-900/40 to-emerald-800/10',
    accent: '#10b981',
  },
  {
    icon: 'Ship',
    title: 'Морская прогулка',
    duration: '3 часа',
    price: 'от 1 500 ₽',
    difficulty: 'Лёгкий',
    desc: 'Яхт-тур вдоль побережья с купанием в открытом море, дегустацией местных вин и закатом над горизонтом.',
    color: 'from-blue-900/40 to-blue-800/10',
    accent: '#3b82f6',
  },
  {
    icon: 'Camera',
    title: 'Фото-тур по Сочи',
    duration: '5 часов',
    price: 'от 3 200 ₽',
    difficulty: 'Лёгкий',
    desc: 'Авторский маршрут по самым фотогеничным локациям: исторический центр, дендрарий, набережная и горные смотровые.',
    color: 'from-amber-900/40 to-amber-800/10',
    accent: '#f59e0b',
  },
  {
    icon: 'UtensilsCrossed',
    title: 'Гастрономический тур',
    duration: '4 часа',
    price: 'от 4 500 ₽',
    difficulty: 'Лёгкий',
    desc: 'Погружение в кавказскую кухню: рынок колхозный, мастер-класс по хачапури, дегустация сыров и местного вина.',
    color: 'from-red-900/40 to-red-800/10',
    accent: '#ef4444',
  },
  {
    icon: 'Snowflake',
    title: 'Роза Хутор зимой',
    duration: 'Целый день',
    price: 'от 5 500 ₽',
    difficulty: 'Разный',
    desc: 'Трансфер, ски-пасс, инструктор для начинающих. 102 км трасс любой сложности от 1140 до 2320 м над уровнем моря.',
    color: 'from-sky-900/40 to-sky-800/10',
    accent: '#0ea5e9',
  },
  {
    icon: 'Leaf',
    title: 'Эко-тур в субтропики',
    duration: '6 часов',
    price: 'от 2 200 ₽',
    difficulty: 'Лёгкий',
    desc: 'Дендрарий, чайные плантации Мацесты, бамбуковые рощи и чистейшие горные реки в окружении реликтового леса.',
    color: 'from-lime-900/40 to-lime-800/10',
    accent: '#84cc16',
  },
];

function TourCard({ tour, index }: { tour: typeof tours[0]; index: number }) {
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
      className={`card-hover rounded-2xl overflow-hidden border border-white/6 bg-gradient-to-br ${tour.color} transition-all duration-600 cursor-pointer group`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s, box-shadow 0.4s ease`,
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: tour.accent + '22', border: `1px solid ${tour.accent}44` }}
          >
            <Icon name={tour.icon} size={20} style={{ color: tour.accent }} />
          </div>
          <span
            className="font-display text-2xl font-light"
            style={{ color: tour.accent }}
          >
            {tour.price}
          </span>
        </div>

        <h3 className="font-display text-xl text-foreground mb-1">{tour.title}</h3>
        <p className="font-body text-xs mb-4" style={{ color: tour.accent + 'cc' }}>
          {tour.duration} · {tour.difficulty}
        </p>
        <p className="font-body text-foreground/50 text-sm leading-relaxed">{tour.desc}</p>

        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="font-body text-foreground/30 text-xs tracking-wider">Подробнее</span>
          <Icon name="ArrowRight" size={14} className="text-foreground/30 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

export default function ToursSection() {
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
    <section id="tours" className="py-28 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-body text-gold/70 tracking-[0.3em] text-xs uppercase mb-3">Активный отдых</p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-foreground mb-4">
            Экскурсии<br /><span className="text-gold italic">и туры</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((tour, index) => (
            <TourCard key={tour.title} tour={tour} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
