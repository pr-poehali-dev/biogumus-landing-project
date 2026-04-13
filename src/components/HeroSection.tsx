import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/e19ceacf-d22c-4345-9a99-b4f42b3d5b86/files/eb1fc45b-dbaa-4708-9caf-dd20abc5cf8b.jpg";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
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
            <button onClick={() => scrollTo("services")} className="border border-eco-700 hover:border-eco-500 text-eco-300 hover:text-eco-100 px-8 py-3.5 rounded-full font-medium text-base transition-all">
              Наши услуги
            </button>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-4 opacity-0 animate-fade-up" style={{animationDelay:'0.6s'}}>
          {[
            { num: "500+", label: "клиентов по области" },
            { num: "5000 т", label: "переработано в год" },
            { num: "100%", label: "легально и официально" },
            { num: "24ч", label: "срок первого выезда" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-eco-900/60 border border-eco-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="font-cormorant text-3xl font-light text-eco-400 mb-1">{num}</div>
              <div className="text-eco-500 text-xs leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-eco-700 animate-bounce">
        <Icon name="ChevronDown" size={24} />
      </div>
    </section>
  );
}
