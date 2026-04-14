import Icon from "@/components/ui/icon";
import DirectorForm from "@/components/DirectorForm";

interface FormState {
  name: string;
  phone: string;
  company: string;
  type: string;
  volume: string;
  comment: string;
}

interface ContactSectionProps {
  form: FormState;
  setForm: (form: FormState) => void;
  submitted: boolean;
  sending: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  scrollTo: (id: string) => void;
}

export default function ContactSection({ form, setForm, submitted, sending, handleSubmit, scrollTo }: ContactSectionProps) {
  return (
    <>
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
                  { icon: "Phone", text: "+7 (900) 495-69-46" },
                  { icon: "Mail", text: "operator@биотехнология68.рф" },
                  { icon: "MapPin", text: "Тамбовский район, пос. Комсомолец, промзона" },
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
                    disabled={sending}
                    className="w-full bg-eco-500 hover:bg-eco-400 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-eco-500/25 flex items-center justify-center gap-2"
                  >
                    <Icon name={sending ? "Loader" : "Send"} size={18} className={sending ? "animate-spin" : ""} />
                    {sending ? "Отправляем..." : "Отправить заявку"}
                  </button>

                  <p className="text-eco-700 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <DirectorForm />

      {/* FOOTER */}
      <footer className="border-t border-eco-800/30 py-12 bg-eco-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-eco-600 text-sm">
          <div className="flex items-center gap-2">
            <img src="https://cdn.poehali.dev/projects/e19ceacf-d22c-4345-9a99-b4f42b3d5b86/files/1bc2f2c3-488c-48c6-afe3-50d06db79415.jpg" alt="БТ68" className="w-6 h-6 rounded-full object-cover" />
            <span className="font-cormorant text-eco-400 text-base">БиоТехнология68</span>
          </div>
          <div className="text-center">© 2024 БиоТехнология68. Лицензированная переработка органических отходов.</div>
          <div className="flex gap-6">
            <button onClick={() => scrollTo("services")} className="hover:text-eco-400 transition-colors">Услуги</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-eco-400 transition-colors">Контакты</button>
          </div>
        </div>
      </footer>
    </>
  );
}