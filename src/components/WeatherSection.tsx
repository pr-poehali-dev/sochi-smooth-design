import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

interface HourlyData {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
}

const weatherDescriptions: Record<number, { label: string; icon: string }> = {
  0: { label: 'Ясно', icon: 'Sun' },
  1: { label: 'Преим. ясно', icon: 'Sun' },
  2: { label: 'Переменная облачность', icon: 'CloudSun' },
  3: { label: 'Пасмурно', icon: 'Cloud' },
  45: { label: 'Туман', icon: 'CloudFog' },
  48: { label: 'Изморозь', icon: 'CloudFog' },
  51: { label: 'Лёгкая морось', icon: 'CloudDrizzle' },
  61: { label: 'Небольшой дождь', icon: 'CloudRain' },
  63: { label: 'Дождь', icon: 'CloudRain' },
  65: { label: 'Сильный дождь', icon: 'CloudRain' },
  71: { label: 'Снег', icon: 'Snowflake' },
  80: { label: 'Ливень', icon: 'CloudRain' },
  95: { label: 'Гроза', icon: 'Zap' },
};

const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
const avgTemps = [8, 9, 11, 15, 19, 23, 26, 27, 22, 17, 13, 9];

function TempChart() {
  const max = Math.max(...avgTemps);
  return (
    <div className="mt-6">
      <p className="font-body text-foreground/40 text-xs tracking-widest uppercase mb-4">Средняя температура по месяцам</p>
      <div className="flex items-end gap-1.5 h-20">
        {avgTemps.map((t, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="font-body text-[9px] text-foreground/40">{t}°</span>
            <div
              className="w-full rounded-t-sm transition-all duration-1000"
              style={{
                height: `${(t / max) * 56}px`,
                background: t > 20
                  ? 'linear-gradient(to top, hsl(42,75%,45%), hsl(42,75%,65%))'
                  : t > 15
                  ? 'linear-gradient(to top, hsl(195,55%,35%), hsl(195,55%,55%))'
                  : 'linear-gradient(to top, hsl(220,30%,30%), hsl(220,30%,45%))',
              }}
            />
            <span className="font-body text-[9px] text-foreground/30">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WeatherSection() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourly, setHourly] = useState<HourlyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=43.5855&longitude=39.7231&current_weather=true&hourly=temperature_2m,precipitation_probability&timezone=Europe%2FMoscow&forecast_days=1'
        );
        const data = await res.json();
        setWeather(data.current_weather);
        setHourly(data.hourly);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const getDesc = (code: number) =>
    weatherDescriptions[code] || { label: 'Переменная', icon: 'Cloud' };

  const now = new Date();
  const currentHour = now.getHours();

  const nextHours = hourly
    ? hourly.time
        .map((t, i) => ({ time: t, temp: hourly.temperature_2m[i], rain: hourly.precipitation_probability[i] }))
        .filter((h) => {
          const hHour = new Date(h.time).getHours();
          return hHour > currentHour;
        })
        .slice(0, 5)
    : [];

  return (
    <section id="weather" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-sea/5 blur-[80px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="mb-14">
          <p className="font-body text-gold/70 tracking-[0.3em] text-xs uppercase mb-3">Климат</p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-foreground mb-4">
            Погода<br /><span className="text-gold italic">в Сочи</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Текущая погода */}
          <div className="glass-gold rounded-3xl p-8">
            {loading && (
              <div className="flex items-center gap-3 text-foreground/40">
                <div className="w-8 h-8 border border-gold/30 border-t-gold rounded-full animate-spin" />
                <span className="font-body text-sm">Загружаю погоду...</span>
              </div>
            )}

            {error && (
              <div className="text-foreground/40 font-body text-sm">
                Не удалось загрузить данные о погоде
              </div>
            )}

            {weather && !loading && (
              <>
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-end gap-3 mb-2">
                      <span className="font-display text-7xl font-light text-foreground">
                        {Math.round(weather.temperature)}°
                      </span>
                      <span className="font-body text-foreground/40 mb-3 text-lg">C</span>
                    </div>
                    <p className="font-body text-gold text-base">{getDesc(weather.weathercode).label}</p>
                    <p className="font-body text-foreground/40 text-sm mt-1">
                      Сочи, сейчас · {now.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center">
                    <Icon name={getDesc(weather.weathercode).icon} size={36} className="text-gold" fallback="Cloud" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { icon: 'Wind', label: 'Ветер', value: `${Math.round(weather.windspeed)} км/ч` },
                    { icon: 'Droplets', label: 'Море', value: '+22°' },
                    { icon: 'Eye', label: 'Видимость', value: 'Хорошая' },
                  ].map(item => (
                    <div key={item.label} className="glass rounded-xl p-3 text-center">
                      <Icon name={item.icon} size={16} className="text-sea mx-auto mb-1" fallback="Info" />
                      <div className="font-body text-xs text-foreground/40 mb-0.5">{item.label}</div>
                      <div className="font-body text-sm text-foreground">{item.value}</div>
                    </div>
                  ))}
                </div>

                {nextHours.length > 0 && (
                  <div>
                    <p className="font-body text-foreground/30 text-xs tracking-widest uppercase mb-3">Ближайшие часы</p>
                    <div className="flex gap-2">
                      {nextHours.map((h) => (
                        <div key={h.time} className="flex-1 glass rounded-xl p-2.5 text-center">
                          <div className="font-body text-xs text-foreground/40 mb-1">
                            {new Date(h.time).getHours()}:00
                          </div>
                          <div className="font-body text-sm text-foreground">{Math.round(h.temp)}°</div>
                          {h.rain > 0 && (
                            <div className="font-body text-[9px] text-sea mt-0.5">{h.rain}%</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Температурный график + советы */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <TempChart />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🌊', title: 'Купальный сезон', text: 'Май — октябрь, вода +22…+28°' },
                { icon: '⛷️', title: 'Горнолыжный', text: 'Декабрь — апрель на Розе Хутор' },
                { icon: '🌸', title: 'Субтропики', text: 'Цветение магнолий в марте' },
                { icon: '☀️', title: 'Лучший сезон', text: 'Июнь — сентябрь: тепло и солнечно' },
              ].map(item => (
                <div key={item.title} className="glass rounded-2xl p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-display text-sm text-foreground mb-1">{item.title}</div>
                  <div className="font-body text-xs text-foreground/40 leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
