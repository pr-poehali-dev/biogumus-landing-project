import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/e19ceacf-d22c-4345-9a99-b4f42b3d5b86/files/eb1fc45b-dbaa-4708-9caf-dd20abc5cf8b.jpg";
const PROCESS_IMG = "https://cdn.poehali.dev/projects/e19ceacf-d22c-4345-9a99-b4f42b3d5b86/files/9c276052-4ee6-4f3c-b06c-26f6e0cdbb8f.jpg";

const services = [
  {
    icon: "Leaf",
    title: "Пищевые отходы",
    desc: "Вывоз и биокомпостирование органических отходов с предприятий общепита, производств и торговли",
    tag: "Регулярно"
  },
  {
    icon: "TreePine",
    title: "Опилки и стружка",
    desc: "Переработка древесных отходов в биотопливо, мульчу и органические удобрения",
    tag: "По объёму"
  },
  {
    icon: "Recycle",
    title: "Смешанная органика",
    desc: "Комплексный вывоз смешанных органических отходов с сортировкой и переработкой на нашем заводе",
    tag: "Под ключ"
  },
  {
    icon: "BarChart3",
    title: "Экоотчётность",
    desc: "Предоставляем документы для экологической отчётности: акты, сертификаты утилизации, паспорта отходов",
    tag: "Документы"
  }
];

const steps = [
  { num: "01", title: "Оставьте заявку", desc: "Заполните форму или позвоните. Опишите тип и объём отходов." },
  { num: "02", title: "Выезд специалиста", desc: "В течение 24 часов приедем, оценим объём и согласуем условия." },
  { num: "03", title: "Заключаем договор", desc: "Фиксируем периодичность, стоимость и все требования." },
  { num: "04", title: "Вывоз и переработка", desc: "Регулярно забираем отходы. Перерабатываем на собственном предприятии." },
];

const advantages = [
  { icon: "Shield", title: "Лицензия Росприроднадзора", desc: "Полный пакет разрешительной документации для работы с органическими отходами I–IV класса опасности" },
  { icon: "Clock", title: "Вывоз от 24 часов", desc: "Оперативный выезд в Тамбове и области. Экстренный вывоз в день обращения" },
  { icon: "FileText", title: "Все документы", desc: "Акты, накладные, паспорта отходов, сертификаты утилизации для вашей отчётности" },
  { icon: "Truck", title: "Собственный автопарк", desc: "15 специализированных автомобилей с рефрижераторами и герметичными контейнерами" },
  { icon: "Factory", title: "Своё производство", desc: "Собственный завод по переработке: 100% отходов идёт в дело, ничего на полигон" },
  { icon: "Handshake", title: "Долгосрочные контракты", desc: "Скидки до 25% при заключении договора на год. Индивидуальные условия для крупных клиентов" },
];

const portfolio = [
  { name: "Сеть ресторанов «Берёзка»", volume: "2.4 т/мес", type: "Пищевые отходы", since: "2021" },
  { name: "Мебельная фабрика «Дубрава»", volume: "8 м³/мес", type: "Опилки, стружка", since: "2020" },
  { name: "Гипермаркет «ЭкоМаркет»", volume: "5 т/мес", type: "Смешанная органика", since: "2022" },
  { name: "Хлебозавод №3", volume: "3.5 т/мес", type: "Пищевые отходы", since: "2019" },
  { name: "Деревообрабатывающий завод", volume: "20 м³/мес", type: "Опилки, кора", since: "2020" },
  { name: "Сеть кафе «Зелёный дворик»", volume: "1.2 т/мес", type: "Пищевые отходы", since: "2023" },
];

const reviews = [
  {
    name: "Андрей Климов",
    role: "Директор ресторана «Берёзка»",
    text: "Работаем уже 3 года. Чётко по расписанию, водители вежливые, документы всегда в порядке. Никаких проблем с проверками.",
    rating: 5
  },
  {
    name: "Ольга Мещерякова",
    role: "Завхоз мебельной фабрики",
    text: "Опилки вывозят оперативно — производство не стоит. Цена честная, договор прозрачный. Очень довольны сотрудничеством.",
    rating: 5
  },
  {
    name: "Иван Терентьев",
    role: "Эколог гипермаркета",
    text: "Нам нужна была компания с полным пакетом документов. ЭкоЦикл предоставили всё что нужно — паспорта, акты, сертификаты.",
    rating: 5
  }
];

export default function Index() {
  const [form, setForm] = useState({ name: "", phone: "", company: "", type: "food", volume: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-golos bg-eco-950 text-eco-100 min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-eco-950/90 backdrop-blur-md border-b border-eco-800/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-eco-500 rounded-full flex items-center justify-center">
              <Icon name="Leaf" size={16} className="text-white" />
            </div>
            <span className="font-cormorant text-xl font-semibold text-eco-100 tracking-wide">ЭкоЦикл</span>
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm text-eco-300">
            {[["services","Услуги"],["process","Процесс"],["advantages","Преимущества"],["portfolio","Клиенты"],["reviews","Отзывы"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-eco-400 transition-colors">{label}</button>
            ))}
          </div>

          <button onClick={() => scrollTo("contact")} className="hidden md:block bg-eco-500 hover:bg-eco-400 text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105">
            Оставить заявку
          </button>

          <button className="md:hidden text-eco-300" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-eco-900 border-t border-eco-800/30 px-6 py-4 flex flex-col gap-4 text-sm text-eco-300">
            {[["services","Услуги"],["process","Процесс"],["advantages","Преимущества"],["portfolio","Клиенты"],["reviews","Отзывы"],["contact","Оставить заявку"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left hover:text-eco-400 transition-colors">{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Природа" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-eco-950/60 via-eco-950/40 to-eco-950" />
        </div>

        <div className="absolute top-24 right-10 text-eco-700/30 animate-leaf-sway text-9xl select-none pointer-events-none">🌿</div>
        <div className="absolute bottom-32 left-8 text-eco-700/20 text-7xl select-none pointer-events-none">🍃</div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-eco-800/40 border border-eco-700/50 rounded-full px-4 py-1.5 text-eco-400 text-sm mb-8 opacity-0 animate-fade-up">
              <div className="w-2 h-2 bg-eco-400 rounded-full animate-pulse" />
              Лицензированный переработчик
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-[1.1] mb-6 opacity-0 animate-fade-up" style={{animationDelay:'0.15s'}}>
              Превращаем<br />
              <em className="text-eco-400 not-italic">отходы</em> в<br />
              <span className="text-eco-300">ресурсы</span>
            </h1>
            <p className="text-eco-300 text-lg leading-relaxed mb-10 max-w-md opacity-0 animate-fade-up" style={{animationDelay:'0.3s'}}>
              Профессиональный вывоз и переработка пищевых отходов и опилок. Для ресторанов, предприятий и торговли.
            </p>
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{animationDelay:'0.45s'}}>
              <button onClick={() => scrollTo("contact")} className="bg-eco-500 hover:bg-eco-400 text-white px-8 py-3.5 rounded-full font-medium text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-eco-500/30">
                Оставить заявку
              </button>
              <button onClick={() => scrollTo("services")} className="border border-eco-600 hover:border-eco-400 text-eco-300 hover:text-eco-100 px-8 py-3.5 rounded-full font-medium text-base transition-all">
                Узнать об услугах
              </button>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-2 gap-4 opacity-0 animate-fade-up" style={{animationDelay:'0.5s'}}>
            {[
              { val: "500+", label: "клиентов" },
              { val: "5000 т", label: "переработано в год" },
              { val: "24ч", label: "выезд специалиста" },
              { val: "100%", label: "экологично" },
            ].map(({ val, label }) => (
              <div key={label} className="bg-eco-900/60 border border-eco-800/50 rounded-2xl p-6 backdrop-blur-sm">
                <div className="font-cormorant text-4xl font-semibold text-eco-400 mb-1">{val}</div>
                <div className="text-eco-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-eco-600 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Листайте</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-eco-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-eco-500 text-sm tracking-widest uppercase mb-3">Что мы делаем</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-eco-100">Наши услуги</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="group bg-eco-900/50 border border-eco-800/50 rounded-2xl p-6 hover:border-eco-600/50 hover:bg-eco-900 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-eco-800 group-hover:bg-eco-700 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <Icon name={s.icon} size={22} className="text-eco-400" />
                </div>
                <span className="inline-block bg-eco-800/60 text-eco-500 text-xs px-3 py-1 rounded-full mb-3">{s.tag}</span>
                <h3 className="font-cormorant text-xl font-medium text-eco-100 mb-3">{s.title}</h3>
                <p className="text-eco-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-eco-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-eco-500 text-sm tracking-widest uppercase mb-3">Как это работает</div>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-eco-100 mb-12">Наш процесс</h2>
              <div className="space-y-8">
                {steps.map((step) => (
                  <div key={step.num} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 border border-eco-700 group-hover:border-eco-500 group-hover:bg-eco-800 rounded-full flex items-center justify-center transition-all">
                      <span className="font-cormorant text-eco-500 group-hover:text-eco-400 font-medium text-sm transition-colors">{step.num}</span>
                    </div>
                    <div className="pt-2">
                      <h3 className="font-medium text-eco-100 mb-1.5">{step.title}</h3>
                      <p className="text-eco-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-eco-500/10 rounded-3xl blur-2xl" />
              <img src={PROCESS_IMG} alt="Переработка" className="relative rounded-2xl w-full object-cover aspect-square shadow-2xl shadow-eco-900" />
              <div className="absolute bottom-6 left-6 right-6 bg-eco-950/80 backdrop-blur-sm border border-eco-800/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-eco-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Recycle" size={18} className="text-eco-400" />
                  </div>
                  <div>
                    <div className="text-eco-100 text-sm font-medium">100% переработка</div>
                    <div className="text-eco-500 text-xs">Ничего не попадает на полигон</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 bg-eco-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-eco-500 text-sm tracking-widest uppercase mb-3">Почему мы</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-eco-100">Наши преимущества</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="group flex gap-5 bg-eco-900/30 border border-eco-800/40 hover:border-eco-700/60 rounded-2xl p-6 transition-all hover:bg-eco-900/50">
                <div className="flex-shrink-0 w-11 h-11 bg-eco-800/60 group-hover:bg-eco-700/60 rounded-xl flex items-center justify-center transition-colors">
                  <Icon name={a.icon} size={20} className="text-eco-400" />
                </div>
                <div>
                  <h3 className="font-medium text-eco-100 mb-2 text-sm">{a.title}</h3>
                  <p className="text-eco-500 text-xs leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-eco-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-eco-500 text-sm tracking-widest uppercase mb-3">Кейсы</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-eco-100">Наши клиенты</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.map((p) => (
              <div key={p.name} className="group bg-eco-900/50 border border-eco-800/40 hover:border-eco-600/50 rounded-2xl p-6 transition-all hover:bg-eco-900">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-eco-800/60 rounded-xl flex items-center justify-center">
                    <Icon name="Building2" size={18} className="text-eco-500" />
                  </div>
                  <span className="text-eco-700 text-xs">с {p.since} г.</span>
                </div>
                <h3 className="font-medium text-eco-100 mb-2 text-sm leading-snug">{p.name}</h3>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-eco-800/40">
                  <span className="text-eco-500 text-xs bg-eco-800/40 px-2.5 py-1 rounded-full">{p.type}</span>
                  <span className="text-eco-400 text-xs font-medium">{p.volume}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-eco-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-eco-500 text-sm tracking-widest uppercase mb-3">Отзывы</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-eco-100">Что говорят клиенты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-eco-900/50 border border-eco-800/40 rounded-2xl p-7">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} className="text-eco-500 text-sm">★</span>
                  ))}
                </div>
                <p className="text-eco-300 text-sm leading-relaxed mb-6 italic">«{r.text}»</p>
                <div className="flex items-center gap-3 pt-5 border-t border-eco-800/40">
                  <div className="w-9 h-9 bg-eco-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-eco-400 text-sm font-cormorant">{r.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-eco-200 text-sm font-medium">{r.name}</div>
                    <div className="text-eco-600 text-xs">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-gradient-to-b from-eco-900/20 to-eco-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-eco-500 text-sm tracking-widest uppercase mb-3">Связаться с нами</div>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-eco-100 mb-6">
                Оставьте заявку<br />на вывоз отходов
              </h2>
              <p className="text-eco-400 leading-relaxed mb-10">
                Заполните форму — перезвоним в течение 30 минут в рабочее время. Приедем, оценим и составим индивидуальное предложение.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Phone", text: "+7 (4752) 123-45-67" },
                  { icon: "Mail", text: "info@ecocycle.ru" },
                  { icon: "MapPin", text: "Тамбов и Тамбовская область" },
                  { icon: "Clock", text: "Пн–Пт 8:00–20:00, Сб 9:00–17:00" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-4 text-eco-300">
                    <div className="w-10 h-10 bg-eco-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={icon} size={18} className="text-eco-500" />
                    </div>
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-eco-900/60 border border-eco-800/50 rounded-3xl p-8 backdrop-blur-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-eco-800/60 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCircle" size={40} className="text-eco-400" />
                  </div>
                  <h3 className="font-cormorant text-3xl font-light text-eco-100 mb-3">Заявка отправлена!</h3>
                  <p className="text-eco-400 text-sm">Перезвоним в течение 30 минут в рабочее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-cormorant text-2xl text-eco-100 mb-6">Форма заявки</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Ваше имя</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Телефон</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Компания</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      placeholder="Название организации"
                      className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Тип отходов</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: "food", label: "🥗 Пищевые" },
                        { val: "sawdust", label: "🪵 Опилки" },
                        { val: "mixed", label: "♻️ Смешанные" },
                      ].map(({ val, label }) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setForm({ ...form, type: val })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${
                            form.type === val
                              ? "bg-eco-600 border-eco-500 text-white"
                              : "bg-eco-800/30 border-eco-700/40 text-eco-400 hover:border-eco-600/50"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Примерный объём</label>
                    <input
                      type="text"
                      value={form.volume}
                      onChange={e => setForm({ ...form, volume: e.target.value })}
                      placeholder="напр. 500 кг/мес или 2 м³/нед"
                      className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Комментарий</label>
                    <textarea
                      rows={3}
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                      placeholder="Дополнительные пожелания или вопросы..."
                      className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-eco-500 hover:bg-eco-400 text-white py-4 rounded-xl font-medium text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-eco-500/25 flex items-center justify-center gap-2"
                  >
                    <Icon name="Send" size={18} />
                    Отправить заявку
                  </button>

                  <p className="text-eco-700 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-eco-800/30 py-12 bg-eco-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-eco-600 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-eco-800 rounded-full flex items-center justify-center">
              <Icon name="Leaf" size={12} className="text-eco-500" />
            </div>
            <span className="font-cormorant text-eco-400 text-base">ЭкоЦикл</span>
          </div>
          <div className="text-center">© 2024 ЭкоЦикл. Лицензированная переработка органических отходов.</div>
          <div className="flex gap-6">
            <button onClick={() => scrollTo("services")} className="hover:text-eco-400 transition-colors">Услуги</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-eco-400 transition-colors">Контакты</button>
          </div>
        </div>
      </footer>
    </div>
  );
}