"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("送信に失敗しました");
      }

      setResult("送信しました。ありがとうございます。");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setResult("送信に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white text-black">
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          エンジニア採用を最短化する
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          採用戦略設計からスカウト運用、面接設計まで。
          現場経験者が伴走する採用代行サービス。
        </p>
        <a
          href="#contact"
          className="bg-black text-white px-8 py-4 rounded-lg"
        >
          無料相談はこちら
        </a>
      </section>

      <section className="py-24 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">こんな課題ありませんか？</h2>
        <ul className="space-y-4 text-lg">
          <li>・応募が来ない</li>
          <li>・面接通過率が低い</li>
          <li>・内定承諾率が伸びない</li>
        </ul>
      </section>

      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">私たちが解決します</h2>
        <p className="max-w-3xl mx-auto text-lg">
          KPI設計、媒体運用、スカウト文改善、面接設計まで一気通貫で支援。
          採用を属人化から再現性へ変えます。
        </p>
      </section>

      <section id="contact" className="py-24 px-6 bg-black text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            無料相談フォーム
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="お名前"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-600 bg-black text-white px-4 py-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="メールアドレス"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-600 bg-black text-white px-4 py-3 rounded-lg"
            />

            <textarea
              name="message"
              placeholder="お問い合わせ内容"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full border border-gray-600 bg-black text-white px-4 py-3 rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black px-6 py-4 rounded-lg font-bold"
            >
              {loading ? "送信中..." : "送信する"}
            </button>
          </form>

          {result && (
            <p className="mt-6 text-center text-sm text-gray-300">{result}</p>
          )}
        </div>
      </section>
    </main>
  );
}