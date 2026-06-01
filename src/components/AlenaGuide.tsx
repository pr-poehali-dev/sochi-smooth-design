import { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';

const TOUR_STEPS = [
  { section: 'home',    text: 'Привет! Я Алёна, гид по Сочи 🌊 Ты сейчас на главной — полюбуйся слайдером с нашими лучшими видами!', emoji: '👋', label: 'Главная' },
  { section: 'history', text: 'Сочи основан в 1838 году. Знаешь, что Сталин лично выбрал город курортом всей страны? В 30-х здесь строились грандиозные санатории!', emoji: '📜', label: 'История' },
  { section: 'sights',  text: 'Мои любимые места — Агурские водопады и Дендрарий 🌿 Советую приходить утром, пока нет толпы. Вид на горы в тумане — незабываемо!', emoji: '🗺️', label: 'Достопримечательности' },
  { section: 'gallery', text: 'Смотри как красиво! Лучшие фото — на смотровой Орлиные скалы. Там панорама на 40 км побережья открывается!', emoji: '📸', label: 'Галерея' },
  { section: 'tours',   text: 'Выбираешь между морем и горами? Горы утром, море вечером 🏔️ На Розе Хутор в июле +18° — идеально для прогулок!', emoji: '🎒', label: 'Экскурсии' },
  { section: 'hotels',  text: 'По секрету: санатории советской постройки — лучшее соотношение цены и качества. Лечебные ванны, пляж и всё включено!', emoji: '🏨', label: 'Отели' },
  { section: 'weather', text: 'Лучшее время — конец мая или сентябрь ☀️ Народу меньше, цены ниже, море тёплое. И магнолии цветут — это восторг!', emoji: '🌤️', label: 'Погода' },
  { section: 'map',     text: 'Все главные места совсем рядом! До Дендрария пешком 15 минут, до Олимпийского парка — 30 минут на электричке.', emoji: '🗺️', label: 'Карта' },
  { section: 'contacts',text: 'Остались вопросы? Пиши нам! А я буду ждать тебя в Сочи ☀️ Горы, море и чай из местных трав — всё уже ждёт!', emoji: '✉️', label: 'Контакты' },
];

const IDLE_PHRASES = [
  'Привет! Нажми, чтобы узнать секреты Сочи 🌊',
  'Расскажу, где лучшие закаты? 🌅',
  'Знаешь, где снимали «Бриллиантовую руку»? 😄',
  'В Сочи единственная субтропическая чайная плантация России!',
  'Нажми — проведу экскурсию по сайту 🎒',
];

/* ─────────────────────── КРАСИВЫЙ SVG-АВАТАР ─────────────────────── */
function AlenaFace({ mood }: { mood: 'idle' | 'talking' | 'waving' | 'thinking' }) {
  const isTalking  = mood === 'talking';
  const isThinking = mood === 'thinking';
  const isWaving   = mood === 'waving';

  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        {/* Градиенты кожи */}
        <radialGradient id="skinGrad" cx="45%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#fde0c0" />
          <stop offset="100%" stopColor="#f4a96a" />
        </radialGradient>
        <radialGradient id="cheekL" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffaaaa" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffaaaa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cheekR" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffaaaa" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffaaaa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hairGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#6b3a1f" />
          <stop offset="100%" stopColor="#2e1508" />
        </radialGradient>
        <radialGradient id="irisL" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#6b4226" />
          <stop offset="100%" stopColor="#1e0c04" />
        </radialGradient>
        <radialGradient id="irisR" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#6b4226" />
          <stop offset="100%" stopColor="#1e0c04" />
        </radialGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── ВОЛОСЫ СЗАДИ ── */}
      <ellipse cx="50" cy="42" rx="33" ry="36" fill="url(#hairGrad)" />
      {/* Длинные пряди */}
      <path d="M 18 42 Q 10 62 14 82 Q 16 90 20 96" stroke="#3a1a08" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <path d="M 82 42 Q 90 62 86 82 Q 84 90 80 96" stroke="#3a1a08" strokeWidth="9" strokeLinecap="round" fill="none"/>
      {/* Средние пряди */}
      <path d="M 22 50 Q 16 68 18 84"  stroke="#2e1508" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M 78 50 Q 84 68 82 84" stroke="#2e1508" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.6"/>

      {/* ── ШЕЯ ── */}
      <rect x="40" y="72" width="20" height="18" rx="7" fill="url(#skinGrad)" />
      <rect x="42" y="72" width="16" height="6"  rx="3" fill="#e8a060" opacity="0.3" />

      {/* ── ОДЕЖДА ── */}
      <path d="M 22 88 Q 18 100 18 100 L 82 100 Q 82 100 78 88 Q 70 78 50 76 Q 30 78 22 88 Z" fill="#1a3a6a" />
      {/* Блик на ткани */}
      <path d="M 30 84 Q 42 80 50 82 Q 58 80 70 84" stroke="#2d5fa0" strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* V-вырез */}
      <path d="M 38 78 L 50 92 L 62 78" fill="none" stroke="#2d5fa0" strokeWidth="2.5" strokeLinejoin="round" />

      {/* ── ЛИЦО ── */}
      <ellipse cx="50" cy="46" rx="26" ry="28" fill="url(#skinGrad)" />
      {/* Мягкая тень снизу */}
      <ellipse cx="50" cy="70" rx="18" ry="5" fill="#c87840" opacity="0.18" />

      {/* ── РУМЯНЕЦ ── */}
      <ellipse cx="28" cy="54" rx="8" ry="5" fill="url(#cheekL)" />
      <ellipse cx="72" cy="54" rx="8" ry="5" fill="url(#cheekR)" />

      {/* ── БРОВИ (тонкие, изогнутые) ── */}
      <path
        d={isThinking ? 'M 30 34 Q 37 30 42 31' : 'M 30 35 Q 37 31 42 33'}
        stroke="#4a2010"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={isThinking ? 'M 58 31 Q 63 30 70 34' : 'M 58 33 Q 63 31 70 35'}
        stroke="#4a2010"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── ГЛАЗА ── */}
      {/* Верхние веки (форма) */}
      <path d="M 30 44 Q 36 39 42 44" fill="#f9c89e" stroke="#4a2010" strokeWidth="1.2" />
      <path d="M 58 44 Q 64 39 70 44" fill="#f9c89e" stroke="#4a2010" strokeWidth="1.2" />

      {/* Белки */}
      <ellipse cx="36" cy="46" rx="6" ry={isTalking ? 3.5 : 5} fill="white" filter="url(#softGlow)" />
      <ellipse cx="64" cy="46" rx="6" ry={isTalking ? 3.5 : 5} fill="white" filter="url(#softGlow)" />

      {/* Радужка */}
      <ellipse cx="36" cy="46" rx="4.2" ry={isTalking ? 3 : 4.2} fill="url(#irisL)" />
      <ellipse cx="64" cy="46" rx="4.2" ry={isTalking ? 3 : 4.2} fill="url(#irisR)" />

      {/* Зрачок */}
      <ellipse cx="36" cy="46" rx="2.2" ry={isTalking ? 2 : 2.2} fill="#0d0503" />
      <ellipse cx="64" cy="46" rx="2.2" ry={isTalking ? 2 : 2.2} fill="#0d0503" />

      {/* Блик в глазах */}
      <circle cx="37.8" cy="44.2" r="1.4" fill="white" opacity="0.9" />
      <circle cx="65.8" cy="44.2" r="1.4" fill="white" opacity="0.9" />
      <circle cx="35.2" cy="47.5" r="0.7" fill="white" opacity="0.5" />
      <circle cx="63.2" cy="47.5" r="0.7" fill="white" opacity="0.5" />

      {/* Нижние ресницы-тени */}
      <path d="M 30 48 Q 36 51 42 48" stroke="#e8a060" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M 58 48 Q 64 51 70 48" stroke="#e8a060" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* ── НОС ── */}
      <path d="M 48 52 Q 46 57 48 59 Q 52 60 54 57" stroke="#d4895a" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* ── РОТ ── */}
      {isTalking ? (
        <>
          <path d="M 38 64 Q 50 72 62 64" fill="#e8706a" opacity="0.9" />
          <path d="M 38 64 Q 50 72 62 64" stroke="#c05040" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Зубки */}
          <path d="M 42 65 Q 50 68 58 65" fill="white" opacity="0.85" />
          <path d="M 38 64 Q 50 70 62 64" stroke="#c05040" strokeWidth="1" fill="none" opacity="0.5" />
        </>
      ) : isThinking ? (
        <path d="M 40 64 Q 50 67 60 64" stroke="#c97d50" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <>
          <path d="M 38 63 Q 50 72 62 63" stroke="#c97d50" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 38 63 Q 50 70 62 63" fill="#e8908a" opacity="0.25" />
        </>
      )}

      {/* Ямочки */}
      {!isThinking && (
        <>
          <circle cx="30" cy="62" r="1.5" fill="#d4895a" opacity="0.4" />
          <circle cx="70" cy="62" r="1.5" fill="#d4895a" opacity="0.4" />
        </>
      )}

      {/* ── СЕРЬГИ ── */}
      <circle cx="24" cy="52" r="3"   fill="#d4af37" />
      <circle cx="24" cy="58" r="2"   fill="#d4af37" opacity="0.8" />
      <circle cx="24" cy="63" r="1.3" fill="#d4af37" opacity="0.5" />
      <circle cx="76" cy="52" r="3"   fill="#d4af37" />
      <circle cx="76" cy="58" r="2"   fill="#d4af37" opacity="0.8" />
      <circle cx="76" cy="63" r="1.3" fill="#d4af37" opacity="0.5" />

      {/* Блик на серьгах */}
      <circle cx="25.2" cy="51" r="0.8" fill="white" opacity="0.6" />
      <circle cx="77.2" cy="51" r="0.8" fill="white" opacity="0.6" />

      {/* ── ЧЁЛКА ── */}
      <path d="M 17 40 Q 20 18 50 20 Q 80 18 83 40 Q 76 30 50 32 Q 24 30 17 40 Z" fill="url(#hairGrad)" />
      {/* Пряди чёлки */}
      <path d="M 26 22 Q 30 32 28 40" stroke="#2e1508" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M 38 19 Q 40 29 38 38" stroke="#2e1508" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.35" />
      {/* Блик на волосах */}
      <path d="M 34 22 Q 50 19 66 22" stroke="#a06030" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35" />

      {/* ── РУКА (waving) ── */}
      {isWaving && (
        <g style={{ transformOrigin: '72px 80px', animation: 'waveHand 0.45s ease-in-out infinite alternate' }}>
          <path d="M 72 80 Q 84 68 88 56" stroke="url(#skinGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
          <ellipse cx="88" cy="54" rx="7" ry="6" fill="#fde0c0" />
          <path d="M 84 48 Q 83 42 86 41" stroke="#fde0c0" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 88 47 Q 88 41 91 41" stroke="#fde0c0" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 92 50 Q 95 45 96 44" stroke="#fde0c0" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      )}
    </svg>
  );
}

/* ─── Убираем эмодзи из текста для TTS ─── */
function stripEmoji(text: string) {
  return text.replace(/[\u{1F000}-\u{1FFFF}]/gu, '').replace(/[\u2600-\u27FF]/g, '').replace(/\s+/g, ' ').trim();
}

/* ─── Подбираем женский голос ─── */
function pickFemaleVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const ruFemale = voices.find(v => v.lang.startsWith('ru') && /female|женский|Anna|Milena|Irina|Katya|Oksana/i.test(v.name));
  if (ruFemale) return ruFemale;
  const ruAny = voices.find(v => v.lang.startsWith('ru'));
  if (ruAny) return ruAny;
  return voices.find(v => /female|Samantha|Karen|Victoria|Moira|Tessa|Fiona/i.test(v.name)) ?? voices[0] ?? null;
}

/* ─────────────────────── ОСНОВНОЙ КОМПОНЕНТ ─────────────────────── */
export default function AlenaGuide() {
  const [open, setOpen]               = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [mood, setMood]               = useState<'idle' | 'talking' | 'waving' | 'thinking'>('idle');
  const [displayed, setDisplayed]     = useState('');
  const [isTyping, setIsTyping]       = useState(false);
  const [idleText, setIdleText]       = useState(IDLE_PHRASES[0]);
  const [showBubble, setShowBubble]   = useState(false);
  const [bobY, setBobY]               = useState(0);
  const [tourMode, setTourMode]       = useState(false);
  const [msgKey, setMsgKey]           = useState(0);
  const [compact, setCompact]         = useState(false);
  // Голос
  const [voiceOn, setVoiceOn]         = useState(true);
  const [speaking, setSpeaking]       = useState(false);

  const typingRef    = useRef<ReturnType<typeof setTimeout>>();
  const bobRef       = useRef<number>();
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>();

  /* покачивание */
  useEffect(() => {
    let t = 0;
    const animate = () => { t += 0.025; setBobY(Math.sin(t) * 5); bobRef.current = requestAnimationFrame(animate); };
    bobRef.current = requestAnimationFrame(animate);
    return () => { if (bobRef.current) cancelAnimationFrame(bobRef.current); };
  }, []);

  /* идл-пузырь */
  useEffect(() => {
    if (open) return;
    const show = () => {
      setIdleText(IDLE_PHRASES[Math.floor(Math.random() * IDLE_PHRASES.length)]);
      setShowBubble(true); setMood('waving');
      idleTimerRef.current = setTimeout(() => { setShowBubble(false); setMood('idle'); }, 4000);
    };
    const iv = setInterval(show, 9000);
    const t  = setTimeout(show, 2500);
    return () => { clearInterval(iv); clearTimeout(t); if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [open]);

  /* ── Синтез речи ── */
  const speak = useCallback((text: string) => {
    if (!voiceOn || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const clean = stripEmoji(text);
    if (!clean) return;
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang  = 'ru-RU';
    utter.rate  = 1.08;   // чуть быстрее — живее
    utter.pitch = 1.35;   // высокий тон — аниме-стиль
    utter.volume = 0.92;
    // Голос подбираем после загрузки списка
    const setVoice = () => {
      const v = pickFemaleVoice();
      if (v) utter.voice = v;
    };
    if (window.speechSynthesis.getVoices().length) setVoice();
    else window.speechSynthesis.addEventListener('voiceschanged', setVoice, { once: true });

    utter.onstart = () => setSpeaking(true);
    utter.onend   = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, [voiceOn]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const typeText = useCallback((text: string) => {
    clearTimeout(typingRef.current);
    setIsTyping(true); setDisplayed(''); setMsgKey(k => k + 1); setMood('talking');
    speak(text);
    let i = 0;
    const tick = () => {
      if (i <= text.length) { setDisplayed(text.slice(0, i)); i++; typingRef.current = setTimeout(tick, 20); }
      else { setIsTyping(false); setMood('idle'); }
    };
    tick();
  }, [speak]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const startTour = () => {
    setTourMode(true); setCurrentStep(0); setCompact(false);
    setTimeout(() => { typeText(TOUR_STEPS[0].text); scrollToSection(TOUR_STEPS[0].section); }, 200);
  };

  const nextStep = () => {
    if (isTyping) {
      clearTimeout(typingRef.current);
      setDisplayed(TOUR_STEPS[currentStep].text);
      setIsTyping(false); setMood('idle');
      stopSpeaking();
      return;
    }
    if (currentStep < TOUR_STEPS.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next); setMood('thinking');
      setTimeout(() => { typeText(TOUR_STEPS[next].text); scrollToSection(TOUR_STEPS[next].section); }, 300);
    } else {
      typeText('Экскурсия завершена! Надеюсь, я была полезна 😊 Сочи ждёт тебя!');
      setTimeout(() => setTourMode(false), 3500);
    }
  };

  const openChat = () => {
    setShowBubble(false); setOpen(true); setCompact(false); setMood('waving');
    setTimeout(() => typeText('Привет! Я Алёна, гид по Сочи ✨ Хочешь, проведу тебя по всему сайту? Нажми «Начать экскурсию»!'), 350);
  };

  const handleClose = () => {
    setOpen(false); setTourMode(false); setDisplayed('');
    clearTimeout(typingRef.current); setIsTyping(false); setMood('idle'); setCompact(false);
    stopSpeaking();
  };

  /* Переключаем голос: если выключаем — сразу останавливаем */
  const toggleVoice = () => {
    setVoiceOn(v => {
      if (v) stopSpeaking();
      return !v;
    });
  };

  const step = TOUR_STEPS[currentStep];

  return (
    <>
      <style>{`
        @keyframes waveHand  { from { transform:rotate(-15deg); } to { transform:rotate(25deg); } }
        @keyframes alenaIn   { 0%{opacity:0;transform:scale(.8) translateY(12px)} 70%{transform:scale(1.03) translateY(-2px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes bubbleIn  { 0%{opacity:0;transform:scale(.85) translateX(10px)} 70%{transform:scale(1.02) translateX(-1px)} 100%{opacity:1;transform:scale(1) translateX(0)} }
        @keyframes msgIn     { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes secIn     { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.6);opacity:0} }
        @keyframes blink     { 0%,90%,100%{opacity:1} 95%{opacity:0} }
        @keyframes soundBar  { from{transform:scaleY(.3)} to{transform:scaleY(1)} }
        .a-panel  { animation: alenaIn  .4s cubic-bezier(.34,1.56,.64,1) forwards; }
        .a-bubble { animation: bubbleIn .35s cubic-bezier(.34,1.56,.64,1) forwards; }
        .a-msg    { animation: msgIn    .3s ease forwards; }
        .a-sec    { animation: secIn    .3s ease forwards; }
        .a-ring   { animation: pulseRing 1.5s ease-out infinite; }
        .a-blink  { animation: blink 3.5s ease-in-out infinite; }
      `}</style>

      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-3">

        {/* ══════════ ПАНЕЛЬ ДИАЛОГА ══════════ */}
        {open && (
          <div
            className="a-panel flex flex-col rounded-3xl overflow-hidden"
            style={{
              width: compact ? '280px' : '300px',
              /* Ключевое: при компактном режиме — только шапка + 1 строка */
              maxHeight: compact ? '72px' : '400px',
              transition: 'max-height .4s cubic-bezier(.4,0,.2,1), width .3s ease',
              background: 'linear-gradient(160deg, rgba(14,20,36,0.93) 0%, rgba(10,16,28,0.97) 100%)',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: compact
                ? '0 4px 24px rgba(0,0,0,0.4)'
                : '0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.07)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* ── Шапка (всегда видна) ── */}
            <div
              className="flex items-center gap-3 px-3 py-2.5 flex-shrink-0 cursor-pointer select-none"
              style={{ borderBottom: compact ? 'none' : '1px solid rgba(255,255,255,0.05)', background: 'rgba(212,175,55,0.06)' }}
              onClick={() => setCompact(c => !c)}
              title={compact ? 'Развернуть' : 'Свернуть'}
            >
              {/* Мини-аватар в шапке */}
              <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden"
                style={{ border: '1.5px solid rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.06)' }}>
                <AlenaFace mood={mood} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm text-foreground leading-tight">Алёна</div>
                <div className="font-body text-xs flex items-center gap-1.5" style={{ color: 'hsl(42,75%,58%)' }}>
                  {speaking && voiceOn ? (
                    <span className="flex items-end gap-[2px] h-3">
                      {[0.5, 1, 0.7, 1.2, 0.6].map((h, i) => (
                        <span key={i} className="w-[2px] rounded-full inline-block"
                          style={{
                            height: `${h * 9}px`,
                            background: 'hsl(42,75%,58%)',
                            animation: 'soundBar .55s ease-in-out infinite alternate',
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  )}
                  {speaking && voiceOn ? 'говорит...' : isTyping ? 'рассказывает...' : tourMode ? `${step.emoji} ${step.label}` : 'гид по Сочи'}
                </div>
              </div>
              {tourMode && !compact && (
                <span className="font-body text-[11px] text-foreground/35 flex-shrink-0">
                  {currentStep + 1}/{TOUR_STEPS.length}
                </span>
              )}
              {/* Кнопки управления */}
              <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                {/* Кнопка голоса */}
                <button
                  onClick={toggleVoice}
                  className="w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    background: voiceOn ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${voiceOn ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  }}
                  title={voiceOn ? 'Выключить голос' : 'Включить голос'}
                >
                  <Icon
                    name={voiceOn ? (speaking ? 'Volume2' : 'Volume1') : 'VolumeX'}
                    size={11}
                    style={{ color: voiceOn ? 'hsl(42,75%,58%)' : 'rgba(255,255,255,0.3)' }}
                  />
                </button>
                {/* Свернуть */}
                <div className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-foreground/30">
                  <Icon name={compact ? 'ChevronUp' : 'ChevronDown'} size={11} />
                </div>
                {/* Закрыть */}
                <button
                  onClick={handleClose}
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-foreground/30 hover:text-foreground/70"
                >
                  <Icon name="X" size={11} />
                </button>
              </div>
            </div>

            {/* ── Тело (скрывается при компактном режиме) ── */}
            {!compact && (
              <>
                <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2 flex flex-col gap-3" style={{ overflowY: 'auto' }}>

                  {/* Секция-метка */}
                  {tourMode && (
                    <div key={`sec-${currentStep}`} className="a-sec flex items-center gap-2">
                      <span className="text-sm">{step.emoji}</span>
                      <span className="font-body text-[11px] tracking-widest uppercase" style={{ color: 'hsl(42,75%,58%)' }}>
                        {step.label}
                      </span>
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,rgba(212,175,55,.3),transparent)' }} />
                    </div>
                  )}

                  {/* Сообщение */}
                  <div
                    key={msgKey}
                    className="a-msg rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.09), rgba(212,175,55,0.04))',
                      border: '1px solid rgba(212,175,55,0.13)',
                    }}
                  >
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,245,220,.88)' }}>
                      {displayed || <span style={{ opacity: .35 }}>...</span>}
                      {isTyping && (
                        <span
                          className="inline-block w-[2px] h-[13px] ml-0.5 rounded-sm"
                          style={{ background: 'hsl(42,75%,58%)', verticalAlign: 'middle', animation: 'pulse .7s ease-in-out infinite' }}
                        />
                      )}
                    </p>
                  </div>

                  {/* Прогресс */}
                  {tourMode && (
                    <div className="flex gap-1.5 justify-center py-1">
                      {TOUR_STEPS.map((_, i) => (
                        <div key={i} className="rounded-full transition-all duration-300"
                          style={{
                            width: i === currentStep ? '20px' : '6px',
                            height: '6px',
                            background: i < currentStep ? 'rgba(212,175,55,.4)' : i === currentStep ? 'hsl(42,75%,58%)' : 'rgba(255,255,255,.1)',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Кнопки */}
                <div className="px-3 pb-3 pt-1 flex flex-col gap-1.5 flex-shrink-0">
                  {!tourMode ? (
                    <button onClick={startTour}
                      className="w-full py-2.5 rounded-2xl font-body text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                      style={{ background: 'linear-gradient(135deg,hsl(42,75%,58%),hsl(35,80%,45%))', color: 'hsl(220,25%,8%)', boxShadow: '0 4px 18px rgba(212,175,55,.28)' }}
                    >
                      🎒 Начать экскурсию
                    </button>
                  ) : (
                    <>
                      <button onClick={nextStep}
                        className="w-full py-2.5 rounded-2xl font-body text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                        style={{ background: 'linear-gradient(135deg,hsl(42,75%,58%),hsl(35,80%,45%))', color: 'hsl(220,25%,8%)', boxShadow: '0 4px 18px rgba(212,175,55,.25)' }}
                      >
                        {isTyping ? '⏩ Пропустить' : currentStep < TOUR_STEPS.length - 1 ? `→ ${TOUR_STEPS[currentStep + 1].label}` : '✓ Завершить'}
                      </button>
                      {!isTyping && (
                        <button
                          onClick={() => { setTourMode(false); typeText('Хорошо! Если захочешь продолжить — нажми «Начать экскурсию» снова 😊'); }}
                          className="w-full py-1.5 rounded-xl font-body text-xs text-foreground/30 hover:text-foreground/55 transition-colors"
                        >
                          Остановить
                        </button>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ══════════ ИДЛ-ПУЗЫРЬ ══════════ */}
        {showBubble && !open && (
          <div className="a-bubble relative rounded-2xl px-4 py-2.5 max-w-[210px]"
            style={{ background: 'rgba(14,20,36,0.95)', border: '1px solid rgba(212,175,55,.22)', boxShadow: '0 8px 28px rgba(0,0,0,.4)', backdropFilter: 'blur(12px)' }}
          >
            <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(255,245,220,.82)' }}>{idleText}</p>
            <div className="absolute -bottom-2 left-5 w-3 h-3 rotate-45"
              style={{ background: 'rgba(14,20,36,.95)', borderRight: '1px solid rgba(212,175,55,.22)', borderBottom: '1px solid rgba(212,175,55,.22)' }}
            />
          </div>
        )}

        {/* ══════════ КНОПКА-АВАТАР ══════════ */}
        <button
          onClick={open ? handleClose : openChat}
          className="relative focus:outline-none group"
          style={{
            width: '80px',
            height: '80px',
            transform: `translateY(${bobY}px)`,
            filter: 'drop-shadow(0 10px 28px rgba(212,175,55,.35))',
            transition: 'filter .3s ease',
          }}
          title="Алёна — гид по Сочи"
        >
          {/* Пульсирующее кольцо */}
          {!open && <div className="a-ring absolute inset-0 rounded-full" style={{ border: '2px solid rgba(212,175,55,.4)' }} />}

          {/* Фон кнопки */}
          <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, hsl(220,28%,15%), hsl(215,30%,20%))',
              border: '2.5px solid rgba(212,175,55,.55)',
              boxShadow: '0 0 20px rgba(212,175,55,.18), inset 0 1px 0 rgba(255,255,255,.05)',
            }}
          />

          {/* Большой аватар */}
          <div className="absolute" style={{ inset: '3px' }}>
            <AlenaFace mood={open ? 'idle' : mood} />
          </div>

          {/* Онлайн */}
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: 'hsl(220,28%,14%)', border: '1.5px solid rgba(255,255,255,.07)' }}
          >
            <div className="w-3 h-3 rounded-full bg-emerald-400" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          </div>
        </button>
      </div>
    </>
  );
}