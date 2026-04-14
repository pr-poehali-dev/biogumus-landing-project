import Icon from "@/components/ui/icon";

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


export default function ContentSections() {
  return (
    <>
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

    </>
  );
}