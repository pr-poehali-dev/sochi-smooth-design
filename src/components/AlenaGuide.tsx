import { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';

const TOUR_STEPS = [
  {
    section: 'home',
    text: 'Привет! Я Алёна, твой гид по Сочи 🌊 Добро пожаловать в жемчужину России! Прокрути вниз, и я расскажу тебе всё самое интересное.',
    emoji: '👋',
  },
  {
    section: 'history',
    text: 'Сочи основан в 1838 году как военная крепость. Знаешь, что Сталин лично выбрал этот город курортом всей страны? В 30-х здесь строились грандиозные санатории!',
    emoji: '📜',
  },
  {
    section: 'sights',
    text: 'Мои любимые места — Агурские водопады и Дендрарий 🌿 Советую начать с набережной утром, пока нет толпы. Вид на горы в утреннем тумане — незабываемо!',
    emoji: '🗺️',
  },
  {
    section: 'gallery',
    text: 'Смотри как красиво! Кстати, лучшие фото получаются на смотровой площадке Орлиные скалы — там открывается панорама на 40 км побережья.',
    emoji: '📸',
  },
  {
    section: 'tours',
    text: 'Если выбираешь между морем и горами — выбирай горы с утра, море вечером 🏔️ Температура воздуха на Розе Хутор в июле — комфортные +18°, идеально для прогулок.',
    emoji: '🎒',
  },
  {
    section: 'hotels',
    text: 'По секрету: санатории советской постройки — лучшее соотношение цены и качества. Там и лечебные ванны, и своя пляжная зона, и всё включено!',
    emoji: '🏨',
  },
  {
    section: 'weather',
    text: 'Идеальное время для поездки — конец мая или сентябрь ☀️ Народу меньше, цены ниже, а море уже или ещё тёплое. Плюс магнолии цветут весной — это что-то!',
    emoji: '🌤️',
  },
  {
    section: 'map',
    text: 'Посмотри на карту — все главные места совсем рядом! Из центра до Дендрария пешком 15 минут, а до Олимпийского парка — 30 минут на электричке.',
    emoji: '🗺️',
  },
  {
    section: 'contacts',
    text: 'Остались вопросы? Пиши нам! А я буду ждать тебя в Сочи ☀️ Приезжай — здесь горы, море и самый вкусный чай из местных трав!',
    emoji: '✉️',
  },
];

const IDLE_PHRASES = [
  'Привет! Нажми на меня, чтобы узнать секреты Сочи 🌊',
  'Хочешь, расскажу, где лучшие закаты? 🌅',
  'Знаешь, где снимали фильм «Бриллиантовая рука»? 😄',
  'В Сочи есть единственная в России субтропическая чайная плантация!',
  'Нажми, и я проведу экскурсию по сайту 🎒',
];

function AlenaSvgAvatar({ mood }: { mood: 'idle' | 'talking' | 'waving' | 'thinking' }) {
  const mouthPath = mood === 'talking'
    ? 'M 14 22 Q 20 28 26 22'
    : mood === 'thinking'
    ? 'M 15 22 Q 20 24 25 22'
    : 'M 14 21 Q 20 27 26 21';

  const eyeScale = mood === 'talking' ? '1 0.7' : '1 1';

  return (
    <svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Волосы */}
      <ellipse cx="20" cy="14" rx="13" ry="14" fill="#3d2314" />
      <path d="M 7 14 Q 4 28 7 38 Q 10 44 12 46" stroke="#3d2314" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M 33 14 Q 36 28 33 38 Q 30 44 28 46" stroke="#3d2314" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Чёлка */}
      <path d="M 7 12 Q 10 6 20 7 Q 30 6 33 12" fill="#3d2314" />

      {/* Лицо */}
      <ellipse cx="20" cy="20" rx="11" ry="12" fill="#f9c89e" />

      {/* Румянец */}
      <ellipse cx="11" cy="22" rx="3" ry="2" fill="#ffb4b4" opacity="0.5" />
      <ellipse cx="29" cy="22" rx="3" ry="2" fill="#ffb4b4" opacity="0.5" />

      {/* Глаза */}
      <g transform={`translate(14, 18) scale(${eyeScale})`} style={{ transformOrigin: '6px 2px' }}>
        <ellipse cx="6" cy="2" rx="3" ry="3" fill="#2d1a0e" />
        <ellipse cx="7" cy="1" rx="1" ry="1" fill="white" opacity="0.9" />
      </g>
      <g transform={`translate(22, 18) scale(${eyeScale})`} style={{ transformOrigin: '4px 2px' }}>
        <ellipse cx="4" cy="2" rx="3" ry="3" fill="#2d1a0e" />
        <ellipse cx="5" cy="1" rx="1" ry="1" fill="white" opacity="0.9" />
      </g>

      {/* Брови */}
      <path d="M 12 15 Q 16 13 18 14" stroke="#3d2314" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 22 14 Q 24 13 28 15" stroke="#3d2314" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Нос */}
      <path d="M 19 19 Q 18 22 19 23 Q 21 23 21 22" stroke="#c97d50" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Рот */}
      <path d={mouthPath} stroke="#c97d50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {mood === 'talking' && <path d="M 16 24 Q 20 27 24 24" fill="#ff9999" opacity="0.4" />}

      {/* Серьги */}
      <circle cx="9" cy="22" r="1.5" fill="#d4af37" />
      <circle cx="31" cy="22" r="1.5" fill="#d4af37" />

      {/* Тело / одежда */}
      <path d="M 10 36 Q 8 44 8 48 L 32 48 Q 32 44 30 36 Q 25 32 20 32 Q 15 32 10 36 Z" fill="#1e3a5f" />
      {/* Воротник */}
      <path d="M 15 33 Q 20 37 25 33" fill="#2d5a9e" />

      {/* Рука машет (только в waving) */}
      {mood === 'waving' && (
        <g style={{ transformOrigin: '30px 36px', animation: 'waveHand 0.5s ease-in-out infinite alternate' }}>
          <path d="M 28 34 Q 34 28 36 22" stroke="#f9c89e" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="36" cy="21" r="3" fill="#f9c89e" />
        </g>
      )}
    </svg>
  );
}

export default function AlenaGuide() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [mood, setMood] = useState<'idle' | 'talking' | 'waving' | 'thinking'>('idle');
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [idleText, setIdleText] = useState(IDLE_PHRASES[0]);
  const [showBubble, setShowBubble] = useState(false);
  const [bobY, setBobY] = useState(0);
  const [tourMode, setTourMode] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout>>();
  const bobRef = useRef<number>();
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Плавное покачивание
  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.03;
      setBobY(Math.sin(t) * 5);
      bobRef.current = requestAnimationFrame(animate);
    };
    bobRef.current = requestAnimationFrame(animate);
    return () => { if (bobRef.current) cancelAnimationFrame(bobRef.current); };
  }, []);

  // Идл-фраза каждые 8 секунд
  useEffect(() => {
    if (open) return;
    const show = () => {
      const idx = Math.floor(Math.random() * IDLE_PHRASES.length);
      setIdleText(IDLE_PHRASES[idx]);
      setShowBubble(true);
      setMood('waving');
      idleTimerRef.current = setTimeout(() => {
        setShowBubble(false);
        setMood('idle');
      }, 4000);
    };
    const interval = setInterval(show, 9000);
    setTimeout(show, 2000);
    return () => { clearInterval(interval); if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [open]);

  const typeText = useCallback((text: string, cb?: () => void) => {
    setIsTyping(true);
    setDisplayed('');
    setMood('talking');
    let i = 0;
    const speed = 28;
    const tick = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        typingRef.current = setTimeout(tick, speed);
      } else {
        setIsTyping(false);
        setMood('idle');
        cb?.();
      }
    };
    tick();
  }, []);

  const startTour = () => {
    setTourMode(true);
    setCurrentStep(0);
    typeText(TOUR_STEPS[0].text);
    const el = document.getElementById(TOUR_STEPS[0].section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setMood('thinking');
      setTimeout(() => {
        typeText(TOUR_STEPS[next].text);
        const el = document.getElementById(TOUR_STEPS[next].section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 400);
    } else {
      typeText('Экскурсия завершена! Надеюсь, я была полезна 😊 Сочи ждёт тебя!');
      setTimeout(() => setTourMode(false), 3000);
    }
  };

  const skipTyping = () => {
    if (isTyping) {
      clearTimeout(typingRef.current);
      setDisplayed(tourMode ? TOUR_STEPS[currentStep].text : displayed);
      setIsTyping(false);
      setMood('idle');
    }
  };

  const openChat = () => {
    setShowBubble(false);
    setOpen(true);
    setMood('waving');
    setTimeout(() => typeText('Привет! Я Алёна, гид по Сочи ✨ Хочешь, проведу тебя по сайту? Нажми «Начать экскурсию»!'), 300);
  };

  const handleClose = () => {
    setOpen(false);
    setTourMode(false);
    setDisplayed('');
    clearTimeout(typingRef.current);
    setMood('idle');
  };

  return (
    <>
      <style>{`
        @keyframes waveHand {
          from { transform: rotate(-10deg); }
          to { transform: rotate(20deg); }
        }
        @keyframes popIn {
          from { opacity:0; transform: scale(0.7) translateY(10px); }
          to { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes bubblePop {
          from { opacity:0; transform: scale(0.8) translateX(10px); }
          to { opacity:1; transform: scale(1) translateX(0); }
        }
        .alena-panel { animation: popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .alena-bubble { animation: bubblePop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      <div
        className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3"
        style={{ pointerEvents: 'all' }}
      >
        {/* Диалоговая панель */}
        {open && (
          <div
            className="alena-panel glass-gold rounded-2xl overflow-hidden flex flex-col"
            style={{
              width: '320px',
              maxHeight: '420px',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)',
            }}
          >
            {/* Шапка */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: 'rgba(212,175,55,0.08)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-8 h-8 flex-shrink-0">
                <AlenaSvgAvatar mood={mood} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm text-foreground">Алёна</div>
                <div className="font-body text-xs" style={{ color: 'hsl(42,75%,58%)' }}>
                  {isTyping ? 'печатает...' : 'гид по Сочи'}
                </div>
              </div>
              {tourMode && (
                <span className="font-body text-xs text-foreground/40">
                  {currentStep + 1} / {TOUR_STEPS.length}
                </span>
              )}
              <button onClick={handleClose} className="text-foreground/30 hover:text-foreground/70 transition-colors">
                <Icon name="X" size={14} />
              </button>
            </div>

            {/* Контент */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {/* Сообщение Алёны */}
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 flex-shrink-0 mt-0.5">
                  <AlenaSvgAvatar mood={mood} />
                </div>
                <div
                  className="flex-1 rounded-2xl rounded-tl-sm p-3 cursor-pointer"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.15)' }}
                  onClick={isTyping ? skipTyping : undefined}
                >
                  <p className="font-body text-sm text-foreground/85 leading-relaxed">
                    {displayed || '...'}
                    {isTyping && <span className="inline-block w-1.5 h-4 bg-gold ml-0.5 animate-pulse" style={{ verticalAlign: 'middle' }} />}
                  </p>
                  {isTyping && (
                    <p className="font-body text-xs text-foreground/30 mt-1">Нажми, чтобы пропустить</p>
                  )}
                </div>
              </div>

              {/* Прогресс тура */}
              {tourMode && !isTyping && (
                <div className="flex gap-1 justify-center mt-1">
                  {TOUR_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === currentStep ? '20px' : '6px',
                        height: '6px',
                        background: i <= currentStep ? 'hsl(42,75%,58%)' : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Кнопки */}
            <div
              className="px-4 py-3 flex flex-col gap-2 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {!tourMode ? (
                <button
                  onClick={startTour}
                  className="w-full py-2.5 rounded-xl font-body text-sm tracking-wide transition-all duration-300 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, hsl(42,75%,58%), hsl(35,80%,45%))',
                    color: 'hsl(220,25%,8%)',
                    fontWeight: 600,
                  }}
                >
                  🎒 Начать экскурсию
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={isTyping}
                  className="w-full py-2.5 rounded-xl font-body text-sm tracking-wide transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, hsl(42,75%,58%), hsl(35,80%,45%))',
                    color: 'hsl(220,25%,8%)',
                    fontWeight: 600,
                  }}
                >
                  {currentStep < TOUR_STEPS.length - 1 ? '→ Далее' : '✓ Завершить'}
                </button>
              )}
              {tourMode && (
                <button
                  onClick={() => { setTourMode(false); typeText('Хорошо, остановимся здесь! Если захочешь продолжить — просто нажми «Начать экскурсию» снова 😊'); }}
                  className="w-full py-2 rounded-xl font-body text-xs text-foreground/40 hover:text-foreground/70 transition-colors"
                >
                  Остановить экскурсию
                </button>
              )}
            </div>
          </div>
        )}

        {/* Идл-пузырь */}
        {showBubble && !open && (
          <div
            className="alena-bubble glass rounded-2xl px-4 py-3 max-w-[240px]"
            style={{
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <p className="font-body text-xs text-foreground/80 leading-relaxed">{idleText}</p>
            <div
              className="absolute -bottom-2 right-[60px] w-3 h-3 rotate-45"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', borderTopColor: 'transparent', borderLeftColor: 'transparent' }}
            />
          </div>
        )}

        {/* Аватар Алёны */}
        <button
          onClick={open ? handleClose : openChat}
          className="relative flex-shrink-0 transition-all duration-300 hover:scale-110 focus:outline-none"
          style={{
            width: '72px',
            height: '72px',
            transform: `translateY(${bobY}px) ${open ? 'scale(0.95)' : 'scale(1)'}`,
            filter: 'drop-shadow(0 8px 24px rgba(212,175,55,0.3))',
          }}
          title="Алёна — гид по Сочи"
        >
          {/* Круглый фон */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(220,28%,14%), hsl(215,30%,18%))',
              border: '2px solid rgba(212,175,55,0.4)',
              boxShadow: '0 0 20px rgba(212,175,55,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          />
          {/* SVG аватар */}
          <div className="absolute inset-2">
            <AlenaSvgAvatar mood={open ? 'idle' : mood} />
          </div>
          {/* Индикатор онлайн */}
          <div
            className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: 'hsl(220,28%,14%)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </button>
      </div>
    </>
  );
}
