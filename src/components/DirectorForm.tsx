import { useState } from "react";
import Icon from "@/components/ui/icon";

const DIRECTOR_URL = "https://functions.poehali.dev/edb4d1f2-cef6-4a48-aaac-53c299509c1e";

export default function DirectorForm() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch(DIRECTOR_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-16 bg-eco-900/20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-eco-900/60 border border-eco-800/50 rounded-3xl p-8 backdrop-blur-sm">
          {sent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-eco-800/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-eco-400" />
              </div>
              <h3 className="font-cormorant text-2xl font-light text-eco-100 mb-2">Письмо отправлено!</h3>
              <p className="text-eco-500 text-sm">Директор ответит вам лично</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-eco-800/60 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={18} className="text-eco-500" />
                </div>
                <div>
                  <h3 className="font-cormorant text-2xl text-eco-100">Написать директору</h3>
                  <p className="text-eco-600 text-xs">Личное обращение — ответим в течение суток</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Ваше имя</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Телефон или Email</label>
                  <input
                    required
                    value={form.contact}
                    onChange={e => setForm({ ...form, contact: e.target.value })}
                    placeholder="+7 (900) 000-00-00"
                    className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Сообщение</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Ваш вопрос или предложение..."
                  className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-eco-500 hover:bg-eco-400 disabled:opacity-60 text-white py-3.5 rounded-xl font-medium text-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Icon name={sending ? "Loader" : "Send"} size={16} className={sending ? "animate-spin" : ""} />
                {sending ? "Отправляем..." : "Отправить письмо"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
