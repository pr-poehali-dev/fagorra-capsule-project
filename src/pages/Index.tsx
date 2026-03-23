import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CAPSULE_FREE = "https://cdn.poehali.dev/projects/3d7d85d1-5a13-455e-87cf-b418134ec139/files/8626268f-4a29-4a9b-ad68-3ee7b2309b29.jpg";
const CAPSULE_PREMIUM = "https://cdn.poehali.dev/projects/3d7d85d1-5a13-455e-87cf-b418134ec139/files/2ca5363b-a82f-4a97-b10f-ec04bd55bbd8.jpg";
const FACTORY = "https://cdn.poehali.dev/projects/3d7d85d1-5a13-455e-87cf-b418134ec139/files/0417db6d-af87-482f-bde5-d84925bde9ae.jpg";

const sections = [
  { id: "hero", label: "Проект" },
  { id: "problem", label: "Идея" },
  { id: "capsules", label: "Капсулы" },
  { id: "audience", label: "Аудитория" },
  { id: "finance", label: "Финансы" },
  { id: "production", label: "Производство" },
  { id: "risks", label: "Риски" },
  { id: "roadmap", label: "Этапы" },
];

function useScrollSpy() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const handler = () => {
      const offsets = sections.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const active = useScrollSpy();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-golos bg-[#f9f8f6] text-[#1a1a1a] min-h-screen">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f9f8f6]/90 backdrop-blur-sm border-b border-[#e8e4df]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-cormorant text-xl font-semibold tracking-widest uppercase text-[#1a1a1a]">
            Фагорра
          </span>
          <div className="hidden md:flex items-center gap-6">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-sm tracking-wide transition-colors ${
                  active === id ? "text-[#1a1a1a] font-medium" : "text-[#888] hover:text-[#1a1a1a]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden text-[#1a1a1a]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#f9f8f6] border-t border-[#e8e4df] px-6 py-4 flex flex-col gap-4">
            {sections.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-sm tracking-wide text-[#555] hover:text-[#1a1a1a]">
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-6 animate-fade-in">Студенческий проект · 2026</p>
            <h1 className="font-cormorant text-6xl md:text-8xl font-light leading-none mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Фа<br />горра
            </h1>
            <p className="text-lg text-[#555] font-light leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Капсулы полного погружения<br />с нейроинтерфейсом
            </p>
            <div className="w-12 h-px bg-[#1a1a1a] mb-6 animate-slide-in" style={{ animationDelay: "0.3s" }} />
            <p className="text-sm text-[#888] animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Ивойлова Любовь, 251 группа<br />
              Колпашевский социально-промышленный колледж
            </p>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img src={CAPSULE_FREE} alt="Капсула Фагорра" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border border-[#e8e4df] rounded-xl p-4 shadow-sm">
              <p className="text-xs text-[#888] mb-1">Целевая аудитория</p>
              <p className="font-cormorant text-2xl font-semibold">7 млрд</p>
              <p className="text-xs text-[#888]">человек по всему миру</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <button onClick={() => scrollTo("problem")} className="flex flex-col items-center gap-2 text-[#888] hover:text-[#1a1a1a] transition-colors">
            <span className="text-xs tracking-widest uppercase">Далее</span>
            <Icon name="ChevronDown" size={16} />
          </button>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-32 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-12">01 — Суть проекта</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-16">
          <AnimatedSection>
            <div className="border-l-2 border-[#1a1a1a] pl-8">
              <h2 className="font-cormorant text-4xl font-light mb-6">Проблема</h2>
              <p className="text-[#555] leading-relaxed text-lg">
                Людям не хватает ярких впечатлений. Повседневная реальность ограничена — нет способа по-настоящему уйти от неё и пережить нечто совершенно новое.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="border-l-2 border-[#c8b89a] pl-8">
              <h2 className="font-cormorant text-4xl font-light mb-6">Решение</h2>
              <p className="text-[#555] leading-relaxed text-lg">
                Капсула Фагорра передаёт все пять чувств: зрение, звук, прикосновения, запах, вкус — и даже боль. Полное присутствие в цифровом мире.
              </p>
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection className="mt-20">
          <div className="grid grid-cols-3 gap-8 bg-white rounded-2xl p-10 border border-[#e8e4df]">
            {[
              { label: "Инвестиции", value: "75,6 трлн", unit: "рублей" },
              { label: "Целевая аудитория", value: "7 млрд", unit: "человек 14+" },
              { label: "Окупаемость", value: "5 лет", unit: "с 2026 года" },
            ].map(({ label, value, unit }) => (
              <div key={label} className="text-center">
                <p className="text-xs text-[#888] mb-2 tracking-wide uppercase">{label}</p>
                <p className="font-cormorant text-4xl font-light">{value}</p>
                <p className="text-sm text-[#888] mt-1">{unit}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CAPSULES */}
      <section id="capsules" className="py-32 bg-[#1a1a1a] text-white px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-12">02 — Типы капсул</p>
          </AnimatedSection>
          <AnimatedSection>
            <h2 className="font-cormorant text-5xl font-light mb-16">Два вида капсул</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free */}
            <AnimatedSection>
              <div className="bg-[#222] rounded-2xl overflow-hidden border border-[#333]">
                <div className="aspect-video overflow-hidden">
                  <img src={CAPSULE_FREE} alt="Свободная капсула" className="w-full h-full object-cover opacity-90" />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-cormorant text-3xl font-light">Свободная</h3>
                    <span className="text-xs bg-[#333] px-3 py-1 rounded-full tracking-wide">Бесплатно</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Раздаётся бесплатно",
                      "Передаёт 100% боли",
                      "Приглушённые вкус и запах",
                      "Максимум 300 уровней",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[#aaa] text-sm">
                        <Icon name="Check" size={14} className="mt-0.5 text-[#888] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Premium */}
            <AnimatedSection>
              <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#c8b89a]/40">
                <div className="aspect-video overflow-hidden">
                  <img src={CAPSULE_PREMIUM} alt="Профессиональная капсула" className="w-full h-full object-cover opacity-90" />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-cormorant text-3xl font-light">Профессиональная</h3>
                    <span className="text-xs bg-[#c8b89a]/20 text-[#c8b89a] px-3 py-1 rounded-full tracking-wide border border-[#c8b89a]/30">Премиум</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Продаётся",
                      "Снижение боли до 70%",
                      "Полные вкус и запах",
                      "Без ограничений по уровням",
                      "72 часа без перерыва",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[#ccc] text-sm">
                        <Icon name="Check" size={14} className="mt-0.5 text-[#c8b89a] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section id="audience" className="py-32 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-12">03 — Пользователи</p>
        </AnimatedSection>
        <AnimatedSection>
          <h2 className="font-cormorant text-5xl font-light mb-16">Кто пользуется</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatedSection>
            <div className="bg-white border border-[#e8e4df] rounded-2xl p-8">
              <div className="w-10 h-10 bg-[#f0ece6] rounded-full flex items-center justify-center mb-6">
                <Icon name="Users" size={18} className="text-[#888]" />
              </div>
              <p className="font-cormorant text-5xl font-light mb-2">7 млрд</p>
              <p className="text-[#888] text-sm tracking-wide mb-4">Пользователи бесплатной капсулы</p>
              <p className="text-[#555] leading-relaxed">Формируют глобальное сообщество, создают контент и держат экосистему живой.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white border border-[#e8e4df] rounded-2xl p-8">
              <div className="w-10 h-10 bg-[#f5f0e8] rounded-full flex items-center justify-center mb-6">
                <Icon name="Star" size={18} className="text-[#c8b89a]" />
              </div>
              <p className="font-cormorant text-5xl font-light mb-2">1 млрд</p>
              <p className="text-[#888] text-sm tracking-wide mb-4">Пользователи премиальной капсулы</p>
              <p className="text-[#555] leading-relaxed">Основной источник дохода. Платят за расширенный опыт и полную свободу.</p>
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <h3 className="font-cormorant text-3xl font-light mb-8">Источники дохода</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "Package", title: "Продажа капсул", desc: "Премиальные модели" },
              { icon: "RefreshCw", title: "Подписка", desc: "Сменные картриджи питания" },
              { icon: "ShoppingCart", title: "Комиссия", desc: "Внутренние покупки в мирах" },
              { icon: "Building2", title: "Контракты", desc: "Государство и компании" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white border border-[#e8e4df] rounded-xl p-5">
                <Icon name={icon} size={18} className="text-[#888] mb-3" />
                <p className="font-medium text-sm mb-1">{title}</p>
                <p className="text-xs text-[#888]">{desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* FINANCE */}
      <section id="finance" className="py-32 bg-[#f2ede6] px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-12">04 — Финансы</p>
          </AnimatedSection>
          <AnimatedSection>
            <h2 className="font-cormorant text-5xl font-light mb-16">Инвестиции и расходы</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection>
              <h3 className="font-cormorant text-2xl font-light mb-8">Первоначальные вложения<br /><span className="text-[#c8b89a]">75,6 трлн руб.</span></h3>
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
                      <span className="font-medium text-[#1a1a1a]">{value}</span>
                    </div>
                    <div className="h-1.5 bg-[#e8e0d4] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1a1a1a] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <h3 className="font-cormorant text-2xl font-light mb-8">Ежемесячные расходы<br /><span className="text-[#c8b89a]">3,85 трлн руб.</span></h3>
              <div className="space-y-4">
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
                      <span className="font-medium text-[#1a1a1a]">{value}</span>
                    </div>
                    <div className="h-1.5 bg-[#e8e0d4] rounded-full overflow-hidden">
                      <div className="h-full bg-[#c8b89a] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 bg-white rounded-xl p-6 border border-[#e8d9c0]">
                <p className="text-xs text-[#888] tracking-wide uppercase mb-2">Запас на непредвиденное</p>
                <p className="font-cormorant text-3xl font-light">20%</p>
                <p className="text-sm text-[#888] mt-1">от общих вложений</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PRODUCTION */}
      <section id="production" className="py-32 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-12">05 — Производство</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <h2 className="font-cormorant text-5xl font-light mb-8">Челябинск<br />200 км²</h2>
            <p className="text-[#555] mb-10 leading-relaxed">Особая производственная зона с полной инфраструктурой для 100 млн сотрудников по всему миру.</p>
            <div className="space-y-6">
              {[
                { icon: "Factory", title: "Завод капсул", desc: "7 млрд бесплатных + 50 млн премиальных в год" },
                { icon: "Droplets", title: "Завод геля", desc: "200 млн литров в год" },
                { icon: "Battery", title: "Завод картриджей", desc: "5 млрд штук в год" },
                { icon: "Plane", title: "Инфраструктура", desc: "Аэропорт, ж/д, жильё, научный центр" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#f0ece6] rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={icon} size={16} className="text-[#888]" />
                  </div>
                  <div>
                    <p className="font-medium mb-0.5">{title}</p>
                    <p className="text-sm text-[#888]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden aspect-square">
              <img src={FACTORY} alt="Завод Фагорра" className="w-full h-full object-cover" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: "Сотрудников", value: "100 млн" },
                { label: "Производство", value: "35 млн" },
                { label: "Учёные", value: "10 млн" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white border border-[#e8e4df] rounded-xl p-4 text-center">
                  <p className="font-cormorant text-2xl font-light">{value}</p>
                  <p className="text-xs text-[#888] mt-1">{label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* RISKS */}
      <section id="risks" className="py-32 bg-[#1a1a1a] text-white px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-12">06 — Риски</p>
          </AnimatedSection>
          <AnimatedSection>
            <h2 className="font-cormorant text-5xl font-light mb-16">Риски и защита</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                risk: "Технология не готова",
                solution: "Крупнейший научный центр с 10 млн разработчиков",
                icon: "Cpu",
              },
              {
                risk: "Сбой в капсуле",
                solution: "Многократное резервирование + автоматическое пробуждение",
                icon: "ShieldCheck",
              },
              {
                risk: "Дефицит сырья",
                solution: "Долгосрочные контракты и собственное производство материалов",
                icon: "Package2",
              },
              {
                risk: "Мало платных пользователей",
                solution: "Уникальный контент + ужесточение ограничений в бесплатной версии",
                icon: "TrendingUp",
              },
            ].map(({ risk, solution, icon }) => (
              <AnimatedSection key={risk}>
                <div className="bg-[#222] border border-[#333] rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={icon} size={16} className="text-[#888]" />
                    </div>
                    <div>
                      <p className="text-[#f00]/80 text-sm font-medium mb-1">Риск</p>
                      <p className="text-white">{risk}</p>
                    </div>
                  </div>
                  <div className="border-t border-[#333] pt-4">
                    <p className="text-[#c8b89a] text-sm font-medium mb-1">Решение</p>
                    <p className="text-[#aaa] text-sm leading-relaxed">{solution}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="py-32 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-12">07 — Этапы</p>
        </AnimatedSection>
        <AnimatedSection>
          <h2 className="font-cormorant text-5xl font-light mb-16">До 2031 года</h2>
        </AnimatedSection>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[#e8e4df] hidden md:block" />
          <div className="space-y-12">
            {[
              {
                year: "2026",
                title: "Запуск производства",
                desc: "Начало строительства завода. Раздача бесплатных капсул по всему миру. Формирование сообщества.",
              },
              {
                year: "2026–2028",
                title: "Выход премиальных капсул",
                desc: "Запуск продаж профессиональной модели. Первые подписчики. Контракты с государствами.",
              },
              {
                year: "2028–2029",
                title: "Самоокупаемость",
                desc: "5 млрд активных пользователей. Проект полностью покрывает свои расходы.",
              },
              {
                year: "2031",
                title: "Интеграция и расширение",
                desc: "Подключение умных домов. Коллективные погружения. Фагорра становится стандартом взаимодействия с цифровым миром.",
              },
            ].map(({ year, title, desc }, i) => (
              <AnimatedSection key={year}>
                <div className="md:flex items-start gap-12">
                  <div className="relative flex-shrink-0 flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-xs font-medium z-10">
                      {i + 1}
                    </div>
                    <span className="font-cormorant text-2xl font-light text-[#888] md:w-32">{year}</span>
                  </div>
                  <div className="md:border-l border-[#e8e4df] md:pl-12">
                    <h3 className="font-cormorant text-2xl font-light mb-2">{title}</h3>
                    <p className="text-[#555] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection className="mt-24">
          <div className="bg-[#1a1a1a] text-white rounded-2xl p-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-6">Главная цель</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light leading-tight mb-6">
              Стать новой средой жизни<br />для миллиардов людей
            </h2>
            <p className="text-[#888] max-w-lg mx-auto leading-relaxed">
              Задать мировой стандарт взаимодействия с цифровым миром. Сделать виртуальное — реальным.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e8e4df] py-8 px-6 text-center">
        <p className="font-cormorant text-xl tracking-widest uppercase text-[#888]">Фагорра</p>
        <p className="text-xs text-[#bbb] mt-2">Ивойлова Любовь · 251 группа · КСПК · 2026</p>
      </footer>
    </div>
  );
}