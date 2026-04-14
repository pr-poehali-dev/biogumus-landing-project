import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS_URL = "https://functions.poehali.dev/5f1866f5-0ccb-431c-a901-e7cf5c0fade4";

const STATIC_REVIEWS = [
  {
    id: 0, author_name: "Андрей Климов", author_role: "Директор ресторана «Берёзка»",
    text: "Работаем уже 3 года. Чётко по расписанию, водители вежливые, документы всегда в порядке. Никаких проблем с проверками.",
    rating: 5, media_url: null, media_type: null
  },
  {
    id: 1, author_name: "Ольга Мещерякова", author_role: "Завхоз мебельной фабрики",
    text: "Опилки вывозят оперативно — производство не стоит. Цена честная, договор прозрачный. Очень довольны сотрудничеством.",
    rating: 5, media_url: null, media_type: null
  },
  {
    id: 2, author_name: "Иван Терентьев", author_role: "Эколог гипермаркета",
    text: "Нам нужна была компания с полным пакетом документов. БиоТехнология68 предоставили всё что нужно — паспорта, акты, сертификаты.",
    rating: 5, media_url: null, media_type: null
  }
];

interface Review {
  id: number;
  author_name: string;
  author_role: string;
  text: string;
  rating: number;
  media_url: string | null;
  media_type: string | null;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(STATIC_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author_name: "", author_role: "", text: "", rating: 5 });
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(REVIEWS_URL)
      .then(r => r.json())
      .then(data => {
        if (data.reviews && data.reviews.length > 0) setReviews(data.reviews);
      })
      .catch(() => {});
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    const url = URL.createObjectURL(file);
    setMediaPreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      let media_b64 = null;
      let media_type = null;
      if (mediaFile) {
        const buf = await mediaFile.arrayBuffer();
        media_b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
        media_type = mediaFile.type;
      }
      await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, media_b64, media_type }),
      });
      setSent(true);
      setForm({ author_name: "", author_role: "", text: "", rating: 5 });
      setMediaFile(null);
      setMediaPreview(null);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-eco-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <div className="text-eco-500 text-sm tracking-widest uppercase mb-3">Отзывы</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-eco-100">Что говорят клиенты</h2>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setSent(false); }}
            className="flex items-center gap-2 bg-eco-800/60 hover:bg-eco-700/60 border border-eco-700/50 hover:border-eco-500/50 text-eco-300 hover:text-eco-100 px-5 py-2.5 rounded-full text-sm transition-all"
          >
            <Icon name="PenLine" size={15} />
            Оставить отзыв
          </button>
        </div>

        {showForm && (
          <div className="mb-12 bg-eco-900/60 border border-eco-800/50 rounded-3xl p-8 backdrop-blur-sm">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-eco-800/60 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-eco-400" />
                </div>
                <h3 className="font-cormorant text-2xl font-light text-eco-100 mb-2">Спасибо за отзыв!</h3>
                <p className="text-eco-500 text-sm">Отзыв появится после проверки</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-cormorant text-2xl text-eco-100 mb-2">Ваш отзыв</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Ваше имя *</label>
                    <input
                      required
                      value={form.author_name}
                      onChange={e => setForm({ ...form, author_name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Должность / Компания</label>
                    <input
                      value={form.author_role}
                      onChange={e => setForm({ ...form, author_role: e.target.value })}
                      placeholder="Директор ООО «Ромашка»"
                      className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Оценка</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(n => (
                      <button
                        key={n} type="button"
                        onClick={() => setForm({ ...form, rating: n })}
                        className={`text-2xl transition-all ${n <= form.rating ? "text-eco-400" : "text-eco-800 hover:text-eco-600"}`}
                      >★</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Текст отзыва *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.text}
                    onChange={e => setForm({ ...form, text: e.target.value })}
                    placeholder="Расскажите о вашем опыте работы с нами..."
                    className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Фото или видео (необязательно)</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-eco-700/50 hover:border-eco-500/50 rounded-xl p-6 text-center cursor-pointer transition-colors"
                  >
                    {mediaPreview ? (
                      mediaFile?.type.startsWith("video") ? (
                        <video src={mediaPreview} className="max-h-40 mx-auto rounded-lg" controls />
                      ) : (
                        <img src={mediaPreview} className="max-h-40 mx-auto rounded-lg object-cover" alt="preview" />
                      )
                    ) : (
                      <div className="text-eco-600 text-sm">
                        <Icon name="Upload" size={24} className="mx-auto mb-2 text-eco-700" />
                        Нажмите чтобы выбрать фото или видео
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFile} />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="bg-eco-500 hover:bg-eco-400 disabled:opacity-60 text-white px-8 py-3 rounded-xl font-medium text-sm transition-all hover:scale-[1.02] flex items-center gap-2"
                >
                  <Icon name={sending ? "Loader" : "Send"} size={16} className={sending ? "animate-spin" : ""} />
                  {sending ? "Отправляем..." : "Отправить отзыв"}
                </button>
              </form>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="bg-eco-900/50 border border-eco-800/40 rounded-2xl p-7">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} className="text-eco-500 text-sm">★</span>
                ))}
              </div>
              {r.media_url && r.media_type === "image" && (
                <img src={r.media_url} alt="фото" className="w-full rounded-xl mb-4 object-cover max-h-48" />
              )}
              {r.media_url && r.media_type === "video" && (
                <video src={r.media_url} className="w-full rounded-xl mb-4 max-h-48" controls />
              )}
              <p className="text-eco-300 text-sm leading-relaxed mb-6 italic">«{r.text}»</p>
              <div className="flex items-center gap-3 pt-5 border-t border-eco-800/40">
                <div className="w-9 h-9 bg-eco-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-eco-400 text-sm font-cormorant">{r.author_name[0]}</span>
                </div>
                <div>
                  <div className="text-eco-200 text-sm font-medium">{r.author_name}</div>
                  {r.author_role && <div className="text-eco-600 text-xs">{r.author_role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
