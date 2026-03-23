import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const CAPSULE_FREE = "https://cdn.poehali.dev/projects/3d7d85d1-5a13-455e-87cf-b418134ec139/bucket/be84e71a-0e56-4ea6-b21a-683eda19001f.jpg";
const CAPSULE_PREMIUM = "https://cdn.poehali.dev/projects/3d7d85d1-5a13-455e-87cf-b418134ec139/bucket/f7c96d80-e7e4-4d39-84d9-946afdaa321e.jpg";
const FACTORY = "https://cdn.poehali.dev/projects/3d7d85d1-5a13-455e-87cf-b418134ec139/files/0417db6d-af87-482f-bde5-d84925bde9ae.jpg";

const SLIDES = [
  { id: 0, label: "Титул" },
  { id: 1, label: "Идея" },
  { id: 2, label: "Капсулы" },
  { id: 3, label: "Аудитория" },
  { id: 4, label: "Финансы" },
  { id: 5, label: "Производство" },
  { id: 6, label: "Риски" },
  { id: 7, label: "Этапы" },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback((idx: number) => {
    if (animating || idx === current) return;
    setDirection(idx > current ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 350);
  }, [animating, current]);

  const next = useCallback(() => goTo(Math.min(current + 1, SLIDES.length - 1)), [current, goTo]);
  const prev = useCallback(() => goTo(Math.max(current - 1, 0)), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slideClass = animating
    ? direction === "next"
      ? "opacity-0 translate-y-4"
      : "opacity-0 -translate-y-4"
    : "opacity-100 translate-y-0";

  return (
    <div className="font-golos bg-[#f9f8f6] text-[#1a1a1a] h-screen overflow-hidden flex flex-col select-none">

      {/* TOP BAR */}
      <header className="flex-shrink-0 flex items-center justify-between px-8 py-4 border-b border-[#e8e4df] bg-[#f9f8f6]/95 backdrop-blur-sm z-10">
        <span className="font-cormorant text-lg font-semibold tracking-widest uppercase">Фагорра</span>
        <div className="hidden md:flex items-center gap-1">
          {SLIDES.map((s) => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs tracking-wide transition-all ${
                current === s.id
                  ? "bg-[#1a1a1a] text-white font-medium"
                  : "text-[#888] hover:text-[#1a1a1a] hover:bg-[#f0ece6]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#888] tabular-nums">{current + 1} / {SLIDES.length}</span>
          <button onClick={prev} disabled={current === 0} className="w-8 h-8 rounded-lg border border-[#e8e4df] flex items-center justify-center text-[#888] hover:text-[#1a1a1a] hover:border-[#1a1a1a] disabled:opacity-30 transition-all">
            <Icon name="ChevronLeft" size={14} />
          </button>
          <button onClick={next} disabled={current === SLIDES.length - 1} className="w-8 h-8 rounded-lg border border-[#e8e4df] flex items-center justify-center text-[#888] hover:text-[#1a1a1a] hover:border-[#1a1a1a] disabled:opacity-30 transition-all">
            <Icon name="ChevronRight" size={14} />
          </button>
        </div>
      </header>

      {/* SLIDE AREA */}
      <main className={`flex-1 overflow-hidden transition-all duration-350 ease-out ${slideClass}`}>

        {/* SLIDE 0 — ТИТУЛ */}
        {current === 0 && (
          <div className="h-full flex items-center px-12 max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-16 items-center w-full">
              <div>
                <p className="text-xs tracking-[0.35em] uppercase text-[#888] mb-8">Студенческий проект · 2026</p>
                <h1 className="font-cormorant text-8xl md:text-[9rem] font-light leading-none mb-8 text-[#1a1a1a]">
                  Фа<br />горра
                </h1>
                <p className="text-xl text-[#555] font-light leading-relaxed mb-10">
                  Капсулы полного погружения<br />с нейроинтерфейсом
                </p>
                <div className="w-16 h-px bg-[#1a1a1a] mb-8" />
                <p className="text-sm text-[#888] leading-relaxed">
                  Ивойлова Любовь, 251 группа<br />
                  Колпашевский социально-промышленный колледж
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img src={CAPSULE_FREE} alt="Капсула Фагорра" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -left-6 bg-white border border-[#e8e4df] rounded-2xl p-5 shadow-lg">
                  <p className="text-xs text-[#888] mb-1">Целевая аудитория</p>
                  <p className="font-cormorant text-3xl font-semibold">7 млрд</p>
                  <p className="text-xs text-[#888]">человек по всему миру</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 1 — ИДЕЯ */}
        {current === 1 && (
          <div className="h-full flex items-center px-12 max-w-7xl mx-auto w-full">
            <div className="w-full">
              <p className="text-xs tracking-[0.35em] uppercase text-[#888] mb-10">01 — Суть проекта</p>
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="border-l-2 border-[#1a1a1a] pl-8">
                  <h2 className="font-cormorant text-5xl font-light mb-6">Проблема</h2>
                  <p className="text-[#555] leading-relaxed text-lg">
                    Людям не хватает ярких впечатлений. Повседневная реальность ограничена — нет способа по-настоящему уйти от неё и пережить нечто совершенно новое.
                  </p>
                </div>
                <div className="border-l-2 border-[#c8b89a] pl-8">
                  <h2 className="font-cormorant text-5xl font-light mb-6">Решение</h2>
                  <p className="text-[#555] leading-relaxed text-lg">
                    Капсула Фагорра передаёт все пять чувств: зрение, звук, прикосновения, запах, вкус — и даже боль. Полное присутствие в цифровом мире.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 bg-white rounded-2xl p-8 border border-[#e8e4df]">
                {[
                  { label: "Инвестиции", value: "75,6 трлн", unit: "рублей" },
                  { label: "Целевая аудитория", value: "7 млрд", unit: "человек 14+" },
                  { label: "Окупаемость", value: "5 лет", unit: "с 2026 года" },
                ].map(({ label, value, unit }) => (
                  <div key={label} className="text-center">
                    <p className="text-xs text-[#888] mb-2 tracking-wide uppercase">{label}</p>
                    <p className="font-cormorant text-5xl font-light">{value}</p>
                    <p className="text-sm text-[#888] mt-1">{unit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2 — КАПСУЛЫ */}
        {current === 2 && (
          <div className="h-full bg-[#1a1a1a] text-white flex items-center px-12">
            <div className="max-w-7xl mx-auto w-full">
              <p className="text-xs tracking-[0.35em] uppercase text-[#555] mb-8">02 — Типы капсул</p>
              <h2 className="font-cormorant text-5xl font-light mb-10 text-white">Два вида капсул</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Free */}
                <div className="bg-[#222] rounded-2xl overflow-hidden border border-[#333] flex">
                  <div className="w-48 flex-shrink-0 overflow-hidden">
                    <img src={CAPSULE_FREE} alt="Свободная" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="font-cormorant text-2xl font-light">Свободная</h3>
                        <span className="text-xs bg-[#333] px-2 py-0.5 rounded-full">Бесплатно</span>
                      </div>
                      <ul className="space-y-2">
                        {["Раздаётся бесплатно", "Передаёт 100% боли", "Приглушённые вкус и запах", "Максимум 300 уровней"].map((f) => (
                          <li key={f} className="flex items-center gap-2 text-[#aaa] text-sm">
                            <Icon name="Check" size={12} className="text-[#666] flex-shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Premium */}
                <div className="bg-[#111] rounded-2xl overflow-hidden border border-[#c8b89a]/40 flex">
                  <div className="w-48 flex-shrink-0 overflow-hidden">
                    <img src={CAPSULE_PREMIUM} alt="Профессиональная" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="font-cormorant text-2xl font-light">Профессиональная</h3>
                        <span className="text-xs bg-[#c8b89a]/20 text-[#c8b89a] px-2 py-0.5 rounded-full border border-[#c8b89a]/30">Премиум</span>
                      </div>
                      <ul className="space-y-2">
                        {["Снижение боли до 70%", "Полные вкус и запах", "Без ограничений по уровням", "72 часа без перерыва", "Разъём для картриджей питания"].map((f) => (
                          <li key={f} className="flex items-center gap-2 text-[#ccc] text-sm">
                            <Icon name="Check" size={12} className="text-[#c8b89a] flex-shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3 — АУДИТОРИЯ */}
        {current === 3 && (
          <div className="h-full flex items-center px-12 max-w-7xl mx-auto w-full">
            <div className="w-full">
              <p className="text-xs tracking-[0.35em] uppercase text-[#888] mb-8">03 — Пользователи</p>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white border border-[#e8e4df] rounded-2xl p-8">
                  <div className="w-10 h-10 bg-[#f0ece6] rounded-full flex items-center justify-center mb-5">
                    <Icon name="Users" size={18} className="text-[#888]" />
                  </div>
                  <p className="font-cormorant text-6xl font-light mb-2">7 млрд</p>
                  <p className="text-[#888] text-sm tracking-wide mb-3">Бесплатная капсула</p>
                  <p className="text-[#555] leading-relaxed text-sm">Формируют глобальное сообщество, создают контент и держат экосистему живой.</p>
                </div>
                <div className="bg-white border border-[#e8e4df] rounded-2xl p-8">
                  <div className="w-10 h-10 bg-[#f5f0e8] rounded-full flex items-center justify-center mb-5">
                    <Icon name="Star" size={18} className="text-[#c8b89a]" />
                  </div>
                  <p className="font-cormorant text-6xl font-light mb-2">1 млрд</p>
                  <p className="text-[#888] text-sm tracking-wide mb-3">Премиальная капсула</p>
                  <p className="text-[#555] leading-relaxed text-sm">Основной источник дохода. Платят за расширенный опыт и полную свободу.</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: "Package", title: "Продажа капсул", desc: "Премиальные модели" },
                  { icon: "RefreshCw", title: "Подписка", desc: "Сменные картриджи питания" },
                  { icon: "ShoppingCart", title: "Комиссия", desc: "Покупки внутри миров" },
                  { icon: "Building2", title: "Контракты", desc: "Государство и компании" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="bg-white border border-[#e8e4df] rounded-xl p-5">
                    <Icon name={icon} size={18} className="text-[#888] mb-3" />
                    <p className="font-medium text-sm mb-1">{title}</p>
                    <p className="text-xs text-[#888]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4 — ФИНАНСЫ */}
        {current === 4 && (
          <div className="h-full bg-[#f2ede6] flex items-center px-12">
            <div className="max-w-7xl mx-auto w-full">
              <p className="text-xs tracking-[0.35em] uppercase text-[#888] mb-8">04 — Финансы</p>
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-cormorant text-3xl font-light mb-2">Первоначальные вложения</h3>
                  <p className="text-[#c8b89a] font-cormorant text-2xl mb-7">75,6 трлн руб.</p>
                  <div className="space-y-4">
                    {[
                      { label: "Строительство заводов", value: "25,2 трлн", pct: 33 },
                      { label: "Оборудование", value: "12,6 трлн", pct: 17 },
                      { label: "Жилая инфраструктура", value: "12,6 трлн", pct: 17 },
                      { label: "Транспорт и логистика", value: "10,1 трлн", pct: 13 },
                      { label: "Энергия, вода, связь", value: "8,4 трлн", pct: 11 },
                      { label: "Офисы и наука", value: "6,7 трлн", pct: 9 },
                    ].map(({ label, value, pct }) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#555]">{label}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                        <div className="h-1.5 bg-[#e8e0d4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#1a1a1a] rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-cormorant text-3xl font-light mb-2">Ежемесячные расходы</h3>
                  <p className="text-[#c8b89a] font-cormorant text-2xl mb-7">3,85 трлн руб.</p>
                  <div className="space-y-4 mb-8">
                    {[
                      { label: "Заработная плата", value: "2,18 трлн", pct: 57 },
                      { label: "Сырьё и материалы", value: "1,05 трлн", pct: 27 },
                      { label: "Транспорт и логистика", value: "0,35 трлн", pct: 9 },
                      { label: "Энергия", value: "0,17 трлн", pct: 4 },
                      { label: "Налоги и прочее", value: "0,10 трлн", pct: 3 },
                    ].map(({ label, value, pct }) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#555]">{label}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                        <div className="h-1.5 bg-[#e8e0d4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#c8b89a] rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-[#e8d9c0]">
                    <p className="text-xs text-[#888] tracking-wide uppercase mb-1">Запас на непредвиденное</p>
                    <p className="font-cormorant text-4xl font-light">20%</p>
                    <p className="text-sm text-[#888] mt-1">от общих вложений</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 5 — ПРОИЗВОДСТВО */}
        {current === 5 && (
          <div className="h-full flex items-center px-12 max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center w-full">
              <div>
                <p className="text-xs tracking-[0.35em] uppercase text-[#888] mb-8">05 — Производство</p>
                <h2 className="font-cormorant text-6xl font-light mb-4">Челябинск<br />200 км²</h2>
                <p className="text-[#555] mb-8 leading-relaxed">Особая производственная зона с полной инфраструктурой для 100 млн сотрудников.</p>
                <div className="space-y-4 mb-8">
                  {[
                    { icon: "Factory", title: "Завод капсул", desc: "7 млрд бесплатных + 50 млн премиальных в год" },
                    { icon: "Droplets", title: "Завод геля", desc: "200 млн литров в год" },
                    { icon: "Battery", title: "Завод картриджей", desc: "5 млрд штук в год" },
                    { icon: "Plane", title: "Инфраструктура", desc: "Аэропорт, ж/д, жильё, научный центр" },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-9 h-9 bg-[#f0ece6] rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={icon} size={14} className="text-[#888]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{title}</p>
                        <p className="text-xs text-[#888]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Сотрудников", value: "100 млн" },
                    { label: "Производство", value: "35 млн" },
                    { label: "Учёные", value: "10 млн" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white border border-[#e8e4df] rounded-xl p-3 text-center">
                      <p className="font-cormorant text-2xl font-light">{value}</p>
                      <p className="text-xs text-[#888] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden">
                  <img src={FACTORY} alt="Завод Фагорра" className="w-full h-48 object-cover" />
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#888]">Продукция завода</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden border border-[#e8e4df] bg-white">
                    <div className="h-36 overflow-hidden">
                      <img src={CAPSULE_FREE} alt="Свободная капсула" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm">Свободная</p>
                      <p className="text-xs text-[#888]">7 млрд шт. / год</p>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-[#e8e4df] bg-white">
                    <div className="h-36 overflow-hidden">
                      <img src={CAPSULE_PREMIUM} alt="Профессиональная капсула" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm">Профессиональная</p>
                      <p className="text-xs text-[#888]">50 млн шт. / год</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 6 — РИСКИ */}
        {current === 6 && (
          <div className="h-full bg-[#1a1a1a] text-white flex items-center px-12">
            <div className="max-w-7xl mx-auto w-full">
              <p className="text-xs tracking-[0.35em] uppercase text-[#555] mb-8">06 — Риски</p>
              <h2 className="font-cormorant text-5xl font-light mb-10">Риски и защита</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { risk: "Технология не готова", solution: "Крупнейший научный центр с 10 млн разработчиков", icon: "Cpu" },
                  { risk: "Сбой в капсуле", solution: "Многократное резервирование + автоматическое пробуждение", icon: "ShieldCheck" },
                  { risk: "Дефицит сырья", solution: "Долгосрочные контракты и собственное производство материалов", icon: "Package2" },
                  { risk: "Мало платных пользователей", solution: "Уникальный контент + ужесточение ограничений в бесплатной версии", icon: "TrendingUp" },
                ].map(({ risk, solution, icon }) => (
                  <div key={risk} className="bg-[#222] border border-[#333] rounded-2xl p-6 flex gap-4">
                    <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={icon} size={16} className="text-[#888]" />
                    </div>
                    <div>
                      <p className="text-red-400/80 text-xs font-medium mb-1 uppercase tracking-wide">Риск</p>
                      <p className="text-white font-medium mb-2">{risk}</p>
                      <p className="text-xs text-[#888] uppercase tracking-wide mb-1">Решение</p>
                      <p className="text-[#aaa] text-sm leading-relaxed">{solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 7 — ЭТАПЫ */}
        {current === 7 && (
          <div className="h-full flex items-center px-12 max-w-7xl mx-auto w-full">
            <div className="w-full">
              <p className="text-xs tracking-[0.35em] uppercase text-[#888] mb-8">07 — Этапы</p>
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <h2 className="font-cormorant text-6xl font-light mb-10">До 2031<br />года</h2>
                  <div className="space-y-6">
                    {[
                      { year: "2026", title: "Запуск производства", desc: "Строительство завода. Раздача бесплатных капсул по всему миру." },
                      { year: "2026–2028", title: "Выход премиальных", desc: "Продажа профессиональной модели. Контракты с государствами." },
                      { year: "2028–2029", title: "Самоокупаемость", desc: "5 млрд пользователей. Проект полностью покрывает расходы." },
                      { year: "2031", title: "Интеграция", desc: "Умные дома, коллективные погружения, мировой стандарт." },
                    ].map(({ year, title, desc }, i) => (
                      <div key={year} className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-xs font-medium flex-shrink-0">{i + 1}</div>
                          {i < 3 && <div className="w-px flex-1 bg-[#e8e4df] mt-2" />}
                        </div>
                        <div className="pb-4">
                          <p className="text-xs text-[#888] mb-0.5">{year}</p>
                          <p className="font-medium mb-1">{title}</p>
                          <p className="text-sm text-[#555]">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#1a1a1a] text-white rounded-3xl p-10 flex flex-col justify-center min-h-[400px]">
                  <p className="text-xs tracking-[0.3em] uppercase text-[#555] mb-6">Главная цель</p>
                  <h2 className="font-cormorant text-4xl font-light leading-tight mb-6">
                    Стать новой средой жизни для миллиардов людей
                  </h2>
                  <div className="w-10 h-px bg-[#444] mb-6" />
                  <p className="text-[#888] leading-relaxed text-sm">
                    Задать мировой стандарт взаимодействия с цифровым миром. Сделать виртуальное — реальным.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* BOTTOM BAR */}
      <footer className="flex-shrink-0 flex items-center justify-between px-8 py-3 border-t border-[#e8e4df] bg-[#f9f8f6]/95">
        <div className="flex gap-1.5">
          {SLIDES.map((s) => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === s.id ? "w-6 bg-[#1a1a1a]" : "w-1.5 bg-[#d0ccc7] hover:bg-[#888]"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-[#bbb]">← → для навигации</p>
      </footer>
    </div>
  );
}
