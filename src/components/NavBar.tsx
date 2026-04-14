import Icon from "@/components/ui/icon";

interface NavBarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function NavBar({ menuOpen, setMenuOpen, scrollTo }: NavBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-eco-950/90 backdrop-blur-md border-b border-eco-800/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-eco-500 rounded-full flex items-center justify-center">
            <Icon name="Leaf" size={16} className="text-white" />
          </div>
          <span className="font-cormorant text-xl font-semibold text-eco-100 tracking-wide">БиоТехнология68</span>
        </button>

        <div className="hidden md:flex items-center gap-8 text-sm text-eco-300">
          {[["services","Услуги"],["process","Процесс"],["advantages","Преимущества"],["portfolio","Клиенты"],["reviews","Отзывы"],["contact","Контакты"]].map(([id, label]) => (
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
  );
}