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
          採用業務も、Web制作も。<br />
          分けずに相談できる実務支援パートナー。
        </h1>
        <p className="text-xl mb-8 max-w-3xl leading-relaxed">
          製造業向けエンジニア採用の現場経験をもとに、採用業務の支援から
          Web制作の相談まで、状況を整理しながら実務目線で伴走します。
        </p>
        <a
          href="#contact"
          className="bg-black text-white px-8 py-4 rounded-lg"
        >
          まずは相談する
        </a>
      </section>

      <section className="py-24 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">こんな課題はありませんか？</h2>
        <ul className="space-y-4 text-lg max-w-3xl mx-auto">
          <li>・採用業務に手が回らず、対応が後手になっている</li>
          <li>・スカウト、応募対応、面接調整などを一部でも任せたい</li>
          <li>・Webサイトを見直したいが、社内に担当者がいない</li>
          <li>・相談先が分かれていて、やり取りや進行が煩雑になっている</li>
        </ul>
      </section>

      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">できること</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          新卒採用を中心に、製造業向けエンジニア職（IT／機械／電気系）の採用実務に
          幅広く携わってきました。採用企画、スカウト運用、エージェント対応、
          応募者対応、面接設定、面接対応など、採用業務全般の支援が可能です。
          あわせて、Webサイトのデザイン・制作についてもご相談いただけます。
          採用とWebを切り分けず、必要な支援を整理しながら進めます。
        </p>
      </section>

      <section id="contact" className="py-24 px-6 bg-black text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">
            ご相談フォーム
          </h2>
          <p className="text-center text-gray-300 mb-8 leading-relaxed">
            採用業務の一部代行、Web制作のご相談、現状整理からでも対応可能です。
          </p>

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
              placeholder="ご相談内容（採用代行、Web制作、現状整理など）"
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
