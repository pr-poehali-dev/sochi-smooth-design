import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const contacts = [
    { icon: 'MapPin', label: 'Адрес', value: 'ул. Навагинская, 16, Сочи, 354000' },
    { icon: 'Phone', label: 'Телефон', value: '+7 (862) 264-00-00' },
    { icon: 'Mail', label: 'Email', value: 'info@sochi-travel.ru' },
    { icon: 'Clock', label: 'Режим работы', value: 'Ежедневно 9:00 — 20:00' },
  ];

  const socials = [
    { icon: 'Send', label: 'Telegram' },
    { icon: 'Instagram', label: 'Instagram', fallback: 'Camera' },
    { icon: 'Youtube', label: 'YouTube' },
  ];

  return (
    <section id="contacts" className="py-28 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-[hsl(220,28%,6%)] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[100px] pointer-events-none -translate-x-1/2" />

      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-body text-gold/70 tracking-[0.3em] text-xs uppercase mb-3">Связаться с нами</p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-foreground mb-4">
            Контакты
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Форма */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h3 className="font-display text-2xl text-foreground mb-6">Напишите нам</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-body text-xs text-foreground/40 tracking-wider uppercase mb-2 block">
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Александр"
                  className="w-full glass rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-gold/40 border border-white/5 transition-colors bg-transparent"
                />
              </div>
              <div>
                <label className="font-body text-xs text-foreground/40 tracking-wider uppercase mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full glass rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-gold/40 border border-white/5 transition-colors bg-transparent"
                />
              </div>
              <div>
                <label className="font-body text-xs text-foreground/40 tracking-wider uppercase mb-2 block">
                  Сообщение
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Хочу узнать подробнее о турах..."
                  className="w-full glass rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-gold/40 border border-white/5 transition-colors bg-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full gradient-gold text-[hsl(220,25%,8%)] font-body font-500 py-4 rounded-xl text-sm tracking-widest uppercase hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
              >
                Отправить сообщение
              </button>
            </form>
          </div>

          {/* Контактная информация */}
          <div
            className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h3 className="font-display text-2xl text-foreground mb-6">Наши координаты</h3>

            <div className="space-y-4 mb-8">
              {contacts.map((c) => (
                <div key={c.label} className="flex items-start gap-4 glass rounded-xl p-4">
                  <div className="w-10 h-10 glass-gold rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={16} className="text-gold" fallback="Info" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-foreground/40 tracking-wider uppercase mb-0.5">{c.label}</div>
                    <div className="font-body text-sm text-foreground">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="font-body text-xs text-foreground/40 tracking-widest uppercase mb-4">Мы в соцсетях</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <button
                    key={s.label}
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:glass-gold transition-all duration-300 group"
                  >
                    <Icon
                      name={s.icon}
                      size={18}
                      className="text-foreground/40 group-hover:text-gold transition-colors"
                      fallback={s.fallback || 'Link'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Мини-карта заглушка */}
            <div className="mt-8 glass rounded-2xl overflow-hidden h-36 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute border border-foreground/20"
                    style={{
                      width: `${60 + i * 20}px`,
                      height: `${60 + i * 20}px`,
                      borderRadius: '50%',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gold animate-pulse-gold" />
                <span className="font-body text-xs text-foreground/40">г. Сочи, Россия</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
