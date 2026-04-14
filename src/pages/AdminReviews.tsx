import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS_URL = "https://functions.poehali.dev/5f1866f5-0ccb-431c-a901-e7cf5c0fade4";

interface Review {
  id: number;
  author_name: string;
  author_role: string;
  text: string;
  rating: number;
  media_url: string | null;
  media_type: string | null;
  published: boolean;
  created_at: string;
}

export default function AdminReviews() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = async (t: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${REVIEWS_URL}/admin`, {
        headers: { "X-Admin-Token": t }
      });
      if (res.status === 403) { setError("Неверный токен"); setLoading(false); return; }
      const data = await res.json();
      setReviews(data.reviews || []);
      setToken(t);
    } catch {
      setError("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (review: Review) => {
    await fetch(`${REVIEWS_URL}/admin`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Admin-Token": token },
      body: JSON.stringify({ id: review.id, published: !review.published })
    });
    setReviews(prev => prev.map(r => r.id === review.id ? { ...r, published: !r.published } : r));
  };

  const remove = async (id: number) => {
    if (!confirm("Удалить отзыв?")) return;
    await fetch(`${REVIEWS_URL}/admin`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "X-Admin-Token": token },
      body: JSON.stringify({ id })
    });
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-eco-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-eco-500 rounded-full flex items-center justify-center">
              <Icon name="Leaf" size={18} className="text-white" />
            </div>
            <span className="font-cormorant text-xl text-eco-100">Модерация отзывов</span>
          </div>
          <div className="bg-eco-900/60 border border-eco-800/50 rounded-2xl p-6">
            <label className="block text-eco-500 text-xs mb-2 uppercase tracking-wider">Токен администратора</label>
            <input
              type="password"
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && fetchReviews(tokenInput)}
              placeholder="Введите токен"
              className="w-full bg-eco-800/40 border border-eco-700/50 focus:border-eco-500 rounded-xl px-4 py-3 text-eco-100 placeholder-eco-700 text-sm outline-none transition-colors mb-4"
            />
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <button
              onClick={() => fetchReviews(tokenInput)}
              disabled={loading}
              className="w-full bg-eco-500 hover:bg-eco-400 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-medium transition-all"
            >
              {loading ? "Загружаем..." : "Войти"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pending = reviews.filter(r => !r.published);
  const published = reviews.filter(r => r.published);

  return (
    <div className="min-h-screen bg-eco-950 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-eco-500 rounded-full flex items-center justify-center">
              <Icon name="Leaf" size={14} className="text-white" />
            </div>
            <span className="font-cormorant text-xl text-eco-100">Модерация отзывов</span>
          </div>
          <div className="text-eco-600 text-sm">{reviews.length} всего · {pending.length} ожидают</div>
        </div>

        {pending.length > 0 && (
          <div className="mb-8">
            <div className="text-eco-500 text-xs uppercase tracking-widest mb-4">Ожидают публикации ({pending.length})</div>
            <div className="space-y-4">
              {pending.map(r => <ReviewCard key={r.id} r={r} onToggle={toggle} onRemove={remove} />)}
            </div>
          </div>
        )}

        {published.length > 0 && (
          <div>
            <div className="text-eco-700 text-xs uppercase tracking-widest mb-4">Опубликованы ({published.length})</div>
            <div className="space-y-4">
              {published.map(r => <ReviewCard key={r.id} r={r} onToggle={toggle} onRemove={remove} />)}
            </div>
          </div>
        )}

        {reviews.length === 0 && (
          <div className="text-center py-20 text-eco-700">Отзывов пока нет</div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ r, onToggle, onRemove }: { r: Review; onToggle: (r: Review) => void; onRemove: (id: number) => void }) {
  return (
    <div className={`bg-eco-900/50 border rounded-2xl p-6 transition-all ${r.published ? "border-eco-700/40" : "border-eco-500/40"}`}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-eco-100 font-medium text-sm">{r.author_name}</span>
            {r.author_role && <span className="text-eco-600 text-xs">· {r.author_role}</span>}
            <span className={`text-xs px-2 py-0.5 rounded-full ${r.published ? "bg-eco-800 text-eco-400" : "bg-eco-500/20 text-eco-400"}`}>
              {r.published ? "Опубликован" : "На модерации"}
            </span>
          </div>
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: r.rating }).map((_, i) => <span key={i} className="text-eco-500 text-xs">★</span>)}
          </div>
          <p className="text-eco-300 text-sm leading-relaxed italic">«{r.text}»</p>
          {r.media_url && r.media_type === "image" && (
            <img src={r.media_url} alt="фото" className="mt-3 max-h-32 rounded-lg object-cover" />
          )}
          {r.media_url && r.media_type === "video" && (
            <video src={r.media_url} className="mt-3 max-h-32 rounded-lg" controls />
          )}
          <div className="text-eco-700 text-xs mt-2">{new Date(r.created_at).toLocaleString("ru")}</div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onToggle(r)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              r.published
                ? "bg-eco-800/60 hover:bg-eco-700/60 text-eco-400"
                : "bg-eco-500 hover:bg-eco-400 text-white"
            }`}
          >
            {r.published ? "Скрыть" : "Опубликовать"}
          </button>
          <button
            onClick={() => onRemove(r.id)}
            className="p-2 rounded-xl bg-red-900/30 hover:bg-red-900/60 text-red-500 transition-all"
          >
            <Icon name="Trash2" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
