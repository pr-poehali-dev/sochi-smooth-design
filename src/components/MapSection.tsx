import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const BEACH = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/20f5227b-cd58-4a2f-a866-2e7baa54c581.jpg';
const MOUNTAIN = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/9c79469b-1822-42ba-b0b1-3afe4a80d7c1.jpg';
const HERO = 'https://cdn.poehali.dev/projects/3c044a98-f7a2-4520-b721-5b73e46ca845/files/cfd03d64-4763-400a-9aef-f8e44fb6fa40.jpg';

const PLACES = [
  { id: 1, name: 'Набережная', lat: 43.5774, lng: 39.7231, emoji: '🌊', cat: 'Прогулки', desc: 'Главная набережная им. Горького — 1.5 км вдоль моря с пальмами, фонтанами и кафе.', img: BEACH },
  { id: 2, name: 'Дендрарий', lat: 43.5714, lng: 39.7512, emoji: '🌿', cat: 'Природа', desc: '48 га тропического сада в самом центре Сочи. Фуникулёр, каскадные лестницы, более 1800 видов растений.', img: BEACH },
  { id: 3, name: 'Ривьера', lat: 43.5855, lng: 39.7195, emoji: '🎡', cat: 'Развлечения', desc: 'Старейший парк-курорт Сочи (1898). Аттракционы, дельфинарий, цирк и концертный зал прямо на берегу моря.', img: BEACH },
  { id: 4, name: 'Роза Хутор', lat: 43.6781, lng: 40.2962, emoji: '⛷️', cat: 'Горы', desc: 'Олимпийский горнолыжный курорт. 102 км трасс, канатные дороги, alpine-деревня с ресторанами.', img: MOUNTAIN },
  { id: 5, name: 'Красная Поляна', lat: 43.6742, lng: 40.2016, emoji: '🏔️', cat: 'Горы', desc: 'Горный климатический курорт на высоте 550 м. Исторический центр с казачьим наследием и видами на Кавказ.', img: MOUNTAIN },
  { id: 6, name: 'Олимпийский парк', lat: 43.4065, lng: 39.9558, emoji: '🏟️', cat: 'Спорт', desc: 'Наследие ОИ-2014. Стадион Фишт, арена Айсберг, трасса Формулы-1 — всё открыто для посещения.', img: HERO },
  { id: 7, name: 'Агурские водопады', lat: 43.5419, lng: 39.8834, emoji: '💧', cat: 'Природа', desc: 'Трёхступенчатый каскад водопадов в Агурском ущелье. Маршрут 6 км через реликтовый самшитовый лес.', img: MOUNTAIN },
  { id: 8, name: 'Мацеста', lat: 43.5497, lng: 39.8513, emoji: '♨️', cat: 'Здоровье', desc: 'Легендарные сероводородные источники с XIX века. Бальнеологические ванны и лечебные процедуры.', img: HERO },
  { id: 9, name: 'Центральный пляж', lat: 43.5792, lng: 39.7298, emoji: '🏖️', cat: 'Пляжи', desc: 'Главный городской пляж в 5 минутах от центра. Галечное побережье, зонтики, кабинки, кафе.', img: BEACH },
];

const CATS = ['Все', 'Природа', 'Горы', 'Пляжи', 'Спорт', 'Развлечения', 'Здоровье', 'Прогулки'];

const CAT_COLORS: Record<string, string> = {
  Природа: '#10b981',
  Горы: '#818cf8',
  Пляжи: '#38bdf8',
  Спорт: '#f59e0b',
  Развлечения: '#f472b6',
  Здоровье: '#34d399',
  Прогулки: '#60a5fa',
};

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<{ marker: any; place: typeof PLACES[0] }[]>([]);
  const [selected, setSelected] = useState<typeof PLACES[0] | null>(null);
  const [filter, setFilter] = useState('Все');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || leafletRef.current) return;

    import('leaflet').then((L) => {
      if (!mapRef.current || leafletRef.current) return;

      // Фикс иконок leaflet
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center: [43.59, 39.96],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
      });

      leafletRef.current = map;

      // Тёмная тема карты
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19 }
      ).addTo(map);

      L.control.attribution({ prefix: '© CartoDB' }).addTo(map);
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      PLACES.forEach((place) => {
        const color = CAT_COLORS[place.cat] || '#d4af37';
        const icon = L.divIcon({
          className: '',
          html: `
            <div style="
              width:40px; height:40px; border-radius:50%;
              background:${color}22; border:2px solid ${color};
              display:flex; align-items:center; justify-content:center;
              font-size:18px; cursor:pointer;
              box-shadow:0 0 16px ${color}55;
              transition:all 0.3s ease;
            " class="map-marker">
              ${place.emoji}
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        const marker = L.marker([place.lat, place.lng], { icon })
          .addTo(map)
          .on('click', () => {
            setSelected(place);
            map.flyTo([place.lat, place.lng], 13, { duration: 0.8 });
          });

        markersRef.current.push({ marker, place });
      });
    });

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, [visible]);

  // Фильтрация маркеров
  useEffect(() => {
    if (!leafletRef.current) return;
    import('leaflet').then((L) => {
      markersRef.current.forEach(({ marker, place }) => {
        if (filter === 'Все' || place.cat === filter) {
          marker.setOpacity(1);
          marker.getElement()?.style.setProperty('display', 'block');
        } else {
          marker.setOpacity(0.15);
        }
      });
    });
  }, [filter]);

  const flyTo = (place: typeof PLACES[0]) => {
    setSelected(place);
    leafletRef.current?.flyTo([place.lat, place.lng], 13, { duration: 0.8 });
  };

  return (
    <section id="map" className="py-24 relative overflow-hidden">
      <style>{`
        .leaflet-container { background: hsl(220,25%,8%); }
        .leaflet-control-zoom a {
          background: rgba(255,255,255,0.06) !important;
          color: rgba(255,255,255,0.7) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          backdrop-filter: blur(12px);
        }
        .leaflet-control-zoom a:hover { background: rgba(212,175,55,0.15) !important; color: hsl(42,75%,58%) !important; }
        .leaflet-attribution-flag { display:none !important; }
        .leaflet-control-attribution { background: rgba(12,18,28,0.7) !important; color: rgba(255,255,255,0.3) !important; font-size:10px; backdrop-filter:blur(8px); }
        .map-marker:hover { transform: scale(1.2) !important; }
      `}</style>

      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, hsl(195,60%,45%,0.3), transparent)' }}
      />

      <div className="container mx-auto px-6">
        <div
          ref={sectionRef}
          className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-body text-gold/70 tracking-[0.3em] text-xs uppercase mb-3">Навигация</p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-foreground mb-4">
            Карта<br /><span className="text-gold italic">Сочи</span>
          </h2>
          <div className="w-14 h-[2px]" style={{ background: 'linear-gradient(90deg, hsl(42,75%,58%), transparent)' }} />
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="font-body text-xs px-4 py-1.5 rounded-full transition-all duration-300"
              style={{
                background: filter === cat ? (CAT_COLORS[cat] || 'hsl(42,75%,58%)') + '22' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filter === cat ? (CAT_COLORS[cat] || 'hsl(42,75%,58%)') : 'rgba(255,255,255,0.08)'}`,
                color: filter === cat ? (CAT_COLORS[cat] || 'hsl(42,75%,58%)') : 'rgba(255,255,255,0.45)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Карта */}
          <div className="lg:col-span-2 relative">
            <div
              ref={mapRef}
              className="w-full rounded-2xl overflow-hidden"
              style={{ height: '480px', border: '1px solid rgba(255,255,255,0.08)' }}
            />
            {!visible && (
              <div className="absolute inset-0 rounded-2xl flex items-center justify-center glass">
                <span className="font-body text-foreground/40 text-sm">Загрузка карты...</span>
              </div>
            )}
          </div>

          {/* Список мест */}
          <div className="flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: '480px' }}>
            {PLACES.filter(p => filter === 'Все' || p.cat === filter).map((place, i) => (
              <button
                key={place.id}
                onClick={() => flyTo(place)}
                className="text-left rounded-xl p-3 flex items-center gap-3 transition-all duration-300 group"
                style={{
                  background: selected?.id === place.id
                    ? `${CAT_COLORS[place.cat] || 'hsl(42,75%,58%)'}15`
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selected?.id === place.id
                    ? CAT_COLORS[place.cat] + '40' || 'hsl(42,75%,58%,0.3)'
                    : 'rgba(255,255,255,0.06)'}`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(16px)',
                  transition: `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s, background 0.3s, border-color 0.3s`,
                }}
              >
                <span className="text-xl flex-shrink-0">{place.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm text-foreground truncate">{place.name}</div>
                  <div
                    className="font-body text-xs"
                    style={{ color: CAT_COLORS[place.cat] || 'hsl(42,75%,58%)' }}
                  >
                    {place.cat}
                  </div>
                </div>
                <Icon name="ChevronRight" size={14} className="text-foreground/20 group-hover:text-foreground/50 flex-shrink-0 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Карточка выбранного места */}
        {selected && (
          <div
            className="mt-6 rounded-2xl overflow-hidden flex flex-col sm:flex-row gap-0"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${CAT_COLORS[selected.cat] || 'hsl(42,75%,58%)'}30`,
              animation: 'fadeUp 0.4s ease forwards',
            }}
          >
            <div className="relative sm:w-48 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
              <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(12,18,28,0.4))' }} />
            </div>
            <div className="p-5 flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-body text-xs px-2.5 py-0.5 rounded-full mb-2 inline-block"
                    style={{ background: `${CAT_COLORS[selected.cat]}20`, color: CAT_COLORS[selected.cat] }}
                  >
                    {selected.cat}
                  </span>
                  <h3 className="font-display text-xl text-foreground">{selected.emoji} {selected.name}</h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-foreground/30 hover:text-foreground/70 transition-colors flex-shrink-0 ml-4"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              <p className="font-body text-foreground/55 text-sm leading-relaxed">{selected.desc}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}