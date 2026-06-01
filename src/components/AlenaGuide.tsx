import { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';

const TOUR_STEPS = [
  {
    section: 'home',
    text: 'Привет! Я Алёна, твой гид по Сочи 🌊 Добро пожаловать в жемчужину России! Сейчас ты на главной — здесь ты видишь самые красивые виды города.',
    emoji: '👋',
    label: 'Главная',
  },
  {
    section: 'history',
    text: 'Сочи основан в 1838 году как военная крепость. Знаешь, что Сталин лично выбрал этот город курортом всей страны? В 30-х здесь строились грандиозные санатории!',
    emoji: '📜',
    label: 'История',
  },
  {
    section: 'sights',
    text: 'Мои любимые места — Агурские водопады и Дендрарий 🌿 Советую начать с набережной утром, пока нет толпы. Вид на горы в утреннем тумане — незабываемо!',
    emoji: '🗺️',
    label: 'Достопримечательности',
  },
  {
    section: 'gallery',
    text: 'Смотри какая красота! Кстати, лучшие фото получаются на смотровой площадке Орлиные скалы — там открывается панорама на 40 км побережья.',
    emoji: '📸',
    label: 'Галерея',
  },
  {
    section: 'tours',
    text: 'Если выбираешь между морем и горами — выбирай горы с утра, море вечером 🏔️ Температура на Розе Хутор в июле — комфортные +18°, идеально для прогулок!',
    emoji: '🎒',
    label: 'Экскурсии',
  },
  {
    section: 'hotels',
    text: 'По секрету: санатории советской постройки — лучшее соотношение цены и качества. Там и лечебные ванны, и своя пляжная зона, и всё включено!',
    emoji: '🏨',
    label: 'Отели',
  },
  {
    section: 'weather',
    text: 'Идеальное время для поездки — конец мая или сентябрь ☀️ Народу меньше, цены ниже, а море тёплое. Плюс магнолии цветут весной — это просто восторг!',
    emoji: '🌤️',
    label: 'Погода',
  },
  {
    section: 'map',
    text: 'Посмотри на карту — все главные места совсем рядом! Из центра до Дендрария пешком 15 минут, а до Олимпийского парка — 30 минут на электричке.',
    emoji: '🗺️',
    label: 'Карта',
  },
  {
    section: 'contacts',
    text: 'Остались вопросы? Пиши нам! А я буду ждать тебя в Сочи ☀️ Приезжай — горы, море и самый вкусный чай из местных трав уже ждут тебя!',
    emoji: '✉️',
    label: 'Контакты',
  },
];

const IDLE_PHRASES = [
  'Привет! Нажми на меня, чтобы узнать секреты Сочи 🌊',
  'Хочешь, расскажу, где лучшие закаты? 🌅',
  'Знаешь, где снимали фильм «Бриллиантовая рука»? 😄',
  'В Сочи есть единственная субтропическая чайная плантация России!',
  'Нажми, и я проведу экскурсию по сайту 🎒',
];

function AlenaSvgAvatar({ mood }: { mood: 'idle' | 'talking' | 'waving' | 'thinking' }) {
  // Рот
  const mouthD = mood === 'talking'
    ? 'M 16 27 Q 20 32 24 27'
    : mood === 'thinking'
    ? 'M 17 27 Q 20 29 23 27'
    : 'M 16 26 Q 20 31 24 26';

  return (
    <svg viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* === ВОЛОСЫ ЗАДНИЕ === */}
      <ellipse cx="28" cy="22" rx="18" ry="20" fill="#4a2810" />
      {/* Пряди по бокам */}
      <path d="M 10 22 Q 6 38 9 52 Q 11 60 14 66" stroke="#4a2810" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M 46 22 Q 50 38 47 52 Q 45 60 42 66" stroke="#4a2810" strokeWidth="6" strokeLinecap="round" fill="none"/>

      {/* === ШЕЯ === */}
      <rect x="22" y="42" width="12" height="10" rx="4" fill="#f5b882" />

      {/* === ОДЕЖДА === */}
      <path d="M 12 52 Q 10 62 10 72 L 46 72 Q 46 62 44 52 Q 38 46 28 46 Q 18 46 12 52 Z" fill="#1e3a5f" />
      {/* Воротник V */}
      <path d="M 20 48 L 28 58 L 36 48" fill="none" stroke="#2d5a9e" strokeWidth="2" strokeLinejoin="round" />
      {/* Узор рубашки */}
      <path d="M 16 56 Q 22 54 28 56 Q 34 58 40 56" stroke="#2d5a9e" strokeWidth="1" fill="none" opacity="0.5" />

      {/* === ЛИЦО === */}
      <ellipse cx="28" cy="26" rx="15" ry="16" fill="#f9c89e" />

      {/* Тень под подбородком */}
      <ellipse cx="28" cy="40" rx="10" ry="3" fill="#e8a870" opacity="0.3" />

      {/* Румянец */}
      <ellipse cx="15" cy="30" rx="4" ry="2.5" fill="#ffb4b4" opacity="0.45" />
      <ellipse cx="41" cy="30" rx="4" ry="2.5" fill="#ffb4b4" opacity="0.45" />

      {/* === БРОВИ === */}
      <path
        d="M 17 19 Q 21 17 24 18"
        stroke="#3d2010"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        style={{ transform: mood === 'thinking' ? 'translateY(-1px)' : 'none' }}
      />
      <path
        d="M 32 18 Q 35 17 39 19"
        stroke="#3d2010"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        style={{ transform: mood === 'thinking' ? 'translateY(-1px)' : 'none' }}
      />

      {/* === ГЛАЗА === */}
      {/* Левый */}
      <ellipse cx="21" cy="25" rx="4" ry={mood === 'talking' ? 2.5 : 4} fill="#fff" />
      <ellipse cx="21" cy="25" rx="2.8" ry={mood === 'talking' ? 2 : 2.8} fill="#3d1a08" />
      <circle cx="22.2" cy="23.8" r="1" fill="white" opacity="0.85" />
      {/* Правый */}
      <ellipse cx="35" cy="25" rx="4" ry={mood === 'talking' ? 2.5 : 4} fill="#fff" />
      <ellipse cx="35" cy="25" rx="2.8" ry={mood === 'talking' ? 2 : 2.8} fill="#3d1a08" />
      <circle cx="36.2" cy="23.8" r="1" fill="white" opacity="0.85" />

      {/* === НОС === */}
      <path d="M 27 28 Q 26 31 27 32 Q 29 33 30 31" stroke="#d4895a" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* === РОТ === */}
      <path d={mouthD} stroke="#c97d50" strokeWidth="2" fill="none" strokeLinecap="round" />
      {mood === 'talking' && (
        <path d="M 18 28.5 Q 20 32 24 28" fill="#ff9999" opacity="0.35" />
      )}
      {/* Улыбка-ямочки */}
      {mood !== 'thinking' && (
        <>
          <circle cx="15.5" cy="32" r="1" fill="#e8a070" opacity="0.5" />
          <circle cx="40.5" cy="32" r="1" fill="#e8a070" opacity="0.5" />
        </>
      )}

      {/* === СЕРЬГИ === */}
      <circle cx="13.5" cy="30" r="2" fill="#d4af37" />
      <circle cx="42.5" cy="30" r="2" fill="#d4af37" />
      <circle cx="13.5" cy="34" r="1.2" fill="#d4af37" opacity="0.7" />
      <circle cx="42.5" cy="34" r="1.2" fill="#d4af37" opacity="0.7" />

      {/* === ЧЁЛКА === */}
      <path d="M 10 20 Q 13 10 28 11 Q 43 10 46 20 Q 42 16 28 17 Q 14 16 10 20 Z" fill="#4a2810" />
      {/* Пряди чёлки */}
      <path d="M 15 12 Q 18 18 16 22" stroke="#3d2010" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M 22 10 Q 22 16 20 20" stroke="#3d2010" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />

      {/* === РУКА (только waving) === */}
      {mood === 'waving' && (
        <g style={{ transformOrigin: '40px 50px', animation: 'waveHand 0.45s ease-in-out infinite alternate' }}>
          <path d="M 40 50 Q 48 42 50 34" stroke="#f9c89e" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Кисть */}
          <ellipse cx="50" cy="33" rx="4" ry="3.5" fill="#f9c89e" />
          {/* Пальчики */}
          <path d="M 48 30 Q 47 26 49 25" stroke="#f9c89e" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 51 29 Q 51 25 53 25" stroke="#f9c89e" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 53 31 Q 55 28 55 27" stroke="#f9c89e" strokeWidth="2" strokeLinecap="round" fill="none" />
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
  // Для анимации "прилетает" текст
  const [msgKey, setMsgKey] = useState(0);
  const typingRef = useRef<ReturnType<typeof setTimeout>>();
  const bobRef = useRef<number>();
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Плавное покачивание
  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.025;
      setBobY(Math.sin(t) * 6);
      bobRef.current = requestAnimationFrame(animate);
    };
    bobRef.current = requestAnimationFrame(animate);
    return () => { if (bobRef.current) cancelAnimationFrame(bobRef.current); };
  }, []);

  // Идл-фраза каждые 9 секунд
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
      }, 4200);
    };
    const interval = setInterval(show, 9000);
    const t = setTimeout(show, 2500);
    return () => {
      clearInterval(interval);
      clearTimeout(t);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [open]);

  const typeText = useCallback((text: string) => {
    clearTimeout(typingRef.current);
    setIsTyping(true);
    setDisplayed('');
    setMsgKey(k => k + 1);
    setMood('talking');
    let i = 0;
    const speed = 22;
    const tick = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        typingRef.current = setTimeout(tick, speed);
      } else {
        setIsTyping(false);
        setMood('idle');
      }
    };
    tick();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startTour = () => {
    setTourMode(true);
    setCurrentStep(0);
    setTimeout(() => {
      typeText(TOUR_STEPS[0].text);
      scrollToSection(TOUR_STEPS[0].section);
    }, 200);
  };

  const nextStep = () => {
    if (isTyping) {
      // Скипаем печатание
      clearTimeout(typingRef.current);
      setDisplayed(TOUR_STEPS[currentStep].text);
      setIsTyping(false);
      setMood('idle');
      return;
    }
    if (currentStep < TOUR_STEPS.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setMood('thinking');
      setTimeout(() => {
        typeText(TOUR_STEPS[next].text);
        scrollToSection(TOUR_STEPS[next].section);
      }, 350);
    } else {
      typeText('Экскурсия завершена! Надеюсь, я была полезна 😊 Сочи ждёт тебя!');
      setTimeout(() => setTourMode(false), 3500);
    }
  };

  const openChat = () => {
    setShowBubble(false);
    setOpen(true);
    setMood('waving');
    setTimeout(() => typeText('Привет! Я Алёна, гид по Сочи ✨ Хочешь, проведу тебя по всему сайту? Нажми «Начать экскурсию»!'), 400);
  };

  const handleClose = () => {
    setOpen(false);
    setTourMode(false);
    setDisplayed('');
    clearTimeout(typingRef.current);
    setIsTyping(false);
    setMood('idle');
  };

  const step = TOUR_STEPS[currentStep];

  return (
    <>
      <style>{`
        @keyframes waveHand {
          from { transform: rotate(-15deg); }
          to   { transform: rotate(25deg); }
        }
        @keyframes alenaPopIn {
          0%   { opacity:0; transform: scale(0.75) translateY(16px); }
          70%  { opacity:1; transform: scale(1.04) translateY(-3px); }
          100% { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes alenaBubble {
          0%   { opacity:0; transform: scale(0.8) translateX(12px); }
          70%  { opacity:1; transform: scale(1.03) translateX(-2px); }
          100% { opacity:1; transform: scale(1) translateX(0); }
        }
        @keyframes alenaMsg {
          0%   { opacity:0; transform: translateY(10px); }
          100% { opacity:1; transform: translateY(0); }
        }
        @keyframes alenaSection {
          0%   { opacity:0; transform: translateX(-8px); }
          100% { opacity:1; transform: translateX(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity:0.6; }
          100% { transform: scale(1.5); opacity:0; }
        }
        .alena-panel   { animation: alenaPopIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .alena-bubble  { animation: alenaBubble 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .alena-msg     { animation: alenaMsg 0.35s ease forwards; }
        .alena-section { animation: alenaSection 0.3s ease forwards; }
        .alena-ring    { animation: pulse-ring 1.4s ease-out infinite; }
      `}</style>

      {/* Всё в нижнем ЛЕВОМ углу */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-3">

        {/* ── Панель диалога ── */}
        {open && (
          <div
            className="alena-panel flex flex-col rounded-3xl overflow-hidden"
            style={{
              width: '310px',
              maxHeight: '460px',
              background: 'linear-gradient(160deg, rgba(24,32,48,0.97), rgba(18,24,36,0.99))',
              border: '1px solid rgba(212,175,55,0.22)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Шапка */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(212,175,55,0.06)' }}
            >
              <div className="w-9 h-9 flex-shrink-0">
                <AlenaSvgAvatar mood={mood} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm text-foreground leading-tight">Алёна</div>
                <div className="font-body text-xs flex items-center gap-1.5" style={{ color: 'hsl(42,75%,58%)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  {isTyping ? 'печатает...' : 'гид по Сочи'}
                </div>
              </div>
              {tourMode && (
                <span className="font-body text-xs text-foreground/35 flex-shrink-0">
                  {currentStep + 1}&thinsp;/&thinsp;{TOUR_STEPS.length}
                </span>
              )}
              <button onClick={handleClose}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/8 transition-colors text-foreground/30 hover:text-foreground/70"
              >
                <Icon name="X" size={13} />
              </button>
            </div>

            {/* Тело */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

              {/* Метка секции */}
              {tourMode && (
                <div key={`sec-${currentStep}`} className="alena-section flex items-center gap-2">
                  <span className="text-base">{step.emoji}</span>
                  <span className="font-body text-xs tracking-widest uppercase"
                    style={{ color: 'hsl(42,75%,58%)' }}
                  >
                    {step.label}
                  </span>
                  <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.3), transparent)' }} />
                </div>
              )}

              {/* Сообщение */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 flex-shrink-0 mt-0.5 rounded-full overflow-hidden"
                  style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}
                >
                  <AlenaSvgAvatar mood={mood} />
                </div>
                <div
                  key={msgKey}
                  className="alena-msg flex-1 rounded-2xl rounded-tl-sm px-4 py-3"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))',
                    border: '1px solid rgba(212,175,55,0.13)',
                  }}
                >
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,245,220,0.88)' }}>
                    {displayed || <span className="opacity-40">...</span>}
                    {isTyping && (
                      <span
                        className="inline-block w-[2px] h-[14px] ml-0.5 rounded-sm"
                        style={{
                          background: 'hsl(42,75%,58%)',
                          verticalAlign: 'middle',
                          animation: 'pulse 0.7s ease-in-out infinite',
                        }}
                      />
                    )}
                  </p>
                  {isTyping && (
                    <p className="font-body text-[10px] text-foreground/25 mt-1.5">нажми «Далее» чтобы пропустить</p>
                  )}
                </div>
              </div>

              {/* Прогресс-точки тура */}
              {tourMode && (
                <div className="flex gap-1.5 justify-center pt-1">
                  {TOUR_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full transition-all duration-400"
                      style={{
                        width: i === currentStep ? '22px' : '6px',
                        height: '6px',
                        background: i < currentStep
                          ? 'rgba(212,175,55,0.4)'
                          : i === currentStep
                          ? 'hsl(42,75%,58%)'
                          : 'rgba(255,255,255,0.12)',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Кнопки */}
            <div className="px-4 py-3 flex flex-col gap-2 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              {!tourMode ? (
                <button
                  onClick={startTour}
                  className="w-full py-3 rounded-2xl font-body text-sm tracking-wide font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, hsl(42,75%,58%), hsl(35,80%,45%))',
                    color: 'hsl(220,25%,8%)',
                    boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
                  }}
                >
                  🎒 Начать экскурсию
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="w-full py-3 rounded-2xl font-body text-sm tracking-wide font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, hsl(42,75%,58%), hsl(35,80%,45%))',
                    color: 'hsl(220,25%,8%)',
                    boxShadow: '0 4px 20px rgba(212,175,55,0.25)',
                  }}
                >
                  {isTyping
                    ? '⏩ Пропустить'
                    : currentStep < TOUR_STEPS.length - 1
                    ? `→ Далее: ${TOUR_STEPS[currentStep + 1].label}`
                    : '✓ Завершить'}
                </button>
              )}
              {tourMode && !isTyping && (
                <button
                  onClick={() => {
                    setTourMode(false);
                    typeText('Хорошо, остановимся! Если захочешь продолжить — нажми «Начать экскурсию» снова 😊');
                  }}
                  className="w-full py-1.5 rounded-xl font-body text-xs text-foreground/35 hover:text-foreground/60 transition-colors"
                >
                  Остановить экскурсию
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Идл-пузырь ── */}
        {showBubble && !open && (
          <div
            className="alena-bubble relative rounded-2xl px-4 py-3 max-w-[220px]"
            style={{
              background: 'rgba(20,28,44,0.96)',
              border: '1px solid rgba(212,175,55,0.22)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(255,245,220,0.8)' }}>{idleText}</p>
            {/* Хвостик вниз-влево */}
            <div
              className="absolute -bottom-2 left-6 w-3 h-3 rotate-45"
              style={{
                background: 'rgba(20,28,44,0.96)',
                borderRight: '1px solid rgba(212,175,55,0.22)',
                borderBottom: '1px solid rgba(212,175,55,0.22)',
              }}
            />
          </div>
        )}

        {/* ── Кнопка-аватар ── */}
        <button
          onClick={open ? handleClose : openChat}
          className="relative focus:outline-none group"
          style={{
            width: '80px',
            height: '80px',
            transform: `translateY(${bobY}px)`,
            filter: 'drop-shadow(0 10px 28px rgba(212,175,55,0.35))',
            transition: 'filter 0.3s ease',
          }}
          title="Алёна — гид по Сочи"
        >
          {/* Пульсирующее кольцо */}
          {!open && (
            <div
              className="alena-ring absolute inset-0 rounded-full"
              style={{ border: '2px solid rgba(212,175,55,0.4)' }}
            />
          )}

          {/* Фон */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, hsl(220,28%,14%), hsl(215,30%,20%))',
              border: '2px solid rgba(212,175,55,0.5)',
              boxShadow: '0 0 24px rgba(212,175,55,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          />

          {/* SVG аватар — чуть больше внутри */}
          <div className="absolute" style={{ inset: '4px' }}>
            <AlenaSvgAvatar mood={open ? 'idle' : mood} />
          </div>

          {/* Онлайн-индикатор */}
          <div
            className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center"
            style={{
              background: 'hsl(220,28%,14%)',
              border: '1.5px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="w-3 h-3 rounded-full bg-emerald-400"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            />
          </div>
        </button>
      </div>
    </>
  );
}
