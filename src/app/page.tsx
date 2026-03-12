"use client";

import Image from "next/image";
import { useState } from "react";

const painPoints = [
  "採用業務に手が回らず、対応が後手になっている",
  "スカウト、応募対応、面接調整などを一部でも任せたい",
  "Webサイトを見直したいが、社内に担当者がいない",
  "相談先が分かれていて、やり取りや進行が煩雑になっている",
];

const services = [
  {
    title: "採用実務支援",
    body:
      "採用企画、スカウト運用、エージェント対応、応募者対応、面接設定、面接対応など、採用実務全般を支援します。",
  },
  {
    title: "Web制作相談",
    body:
      "サイトの見直しやデザイン改善など、Webまわりの課題整理を行い、必要に応じて制作パートナーと連携して進めます。",
  },
  {
    title: "窓口の一本化",
    body:
      "採用とWebを分けずに相談できるため、意図の共有や進行管理の負荷を減らしやすくなります。",
  },
];

const flow = [
  "現状整理",
  "課題の優先順位付け",
  "支援範囲の設定",
  "実務開始",
];

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

      setResult("送信ありがとうございました。内容を確認のうえ、ご連絡いたします。");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setResult(
        "送信に失敗しました。お手数ですが、時間をおいて再度お試しください。"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f5f7fb] text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.18),_transparent_30%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 lg:px-10">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
              採用支援 × Web制作相談
            </div>

            <h1 className="max-w-5xl text-[clamp(1.8rem,3vw,3rem)] font-bold leading-[1.08] tracking-tight text-slate-950">
              採用業務も、Web制作も。
              <br />
              <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
                実務支援パートナー
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-[clamp(1rem,1.7vw,1.2rem)] leading-8 text-slate-600">
              製造業向けエンジニア採用の現場経験をもとに、採用業務の支援から
              Webまわりの相談まで、状況を整理しながら実務目線で伴走します。
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5"
              >
                まずは相談する
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
              >
                できることを見る
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/90 px-6 py-5 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-slate-500">支援領域</p>
                <p className="mt-3 text-[clamp(1rem,1.05vw,1.15rem)] font-semibold leading-[1.35] text-slate-900">
                  採用実務 / Web相談
                </p>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/90 px-6 py-5 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-slate-500">強み</p>
                <p className="mt-3 text-[clamp(1rem,1.05vw,1.15rem)] font-semibold leading-[1.35] text-slate-900">
                  採用と営業の現場理解
                </p>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/90 px-6 py-5 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-slate-500">相談開始</p>
                <p className="mt-3 text-[clamp(1rem,1.05vw,1.15rem)] font-semibold leading-[1.35] text-slate-900">
                  現状整理から対応
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              Issue
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              こんな課題はありませんか？
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {painPoints.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-base leading-7 text-slate-200 backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-20"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            Service
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">できること</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            新卒採用を中心に、製造業向けエンジニア職【IT・機械・電気系】の採用実務に幅広く携わってきました。
            採用企画、スカウト運用、エージェント対応、応募者対応、面接設定、面接対応など、採用業務全般の支援が可能です。
            Web制作については、課題整理や要件整理の段階からご相談いただけます。
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-sky-500/20">
                0{index + 1}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-slate-950">
                {service.title}
              </h3>
              <p className="mt-4 leading-8 text-slate-600">{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
              Value
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              採用とWebを、
              <br className="hidden md:block" />
              別々にしない支援
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              採用業務とWebまわりの相談を切り分けず、必要な論点を整理しながら進めます。
              Web制作自体は実績のあるパートナーと連携し、私は窓口として課題整理・要件整理・進行面を含めてご支援します。
            </p>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-sky-500 to-indigo-700 p-8 text-white shadow-xl shadow-indigo-900/10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100">
              Flow
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              ご相談から実務開始まで
            </h2>
            <div className="mt-8 grid gap-4">
              {flow.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                    {index + 1}
                  </div>
                  <p className="text-base font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-20">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            Profile
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">自己紹介</h2>

          <div className="mt-10 rounded-[2rem] bg-slate-50 p-6 ring-1 ring-slate-200 md:p-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="mx-auto w-full max-w-[600px] shrink-0 md:mx-0">
                <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-sm">
                  <Image
                    src="/hero-main.png"
                    alt="石塚亘"
                    width={1624}
                    height={1536}
                    className="h-[300px] w-full rounded-[1.25rem] object-cover object-center"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
                  Recruit / Web Support
                </p>

                <h3 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
                  石塚 亘
                </h3>

                <p className="mt-3 text-sm font-medium text-slate-500 md:text-base">
                  採用支援 / Web制作相談窓口
                </p>

                <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
                  <p>
                    接客・販売、法人営業を経て、現在はエンジニア採用に携わっています。
                    新卒・中途の両方で、母集団形成から面接、内定、入社まで一気通貫で経験してきました。
                  </p>

                  <p>
                    機械・電気・ITなど、幅広い領域のエンジニア採用に関わってきたことが強みです。
                    営業と採用の両方を経験しているため、現場要件と事業側の意図を整理しながら支援できます。
                  </p>

                  <p>
                    Webまわりについては、実績のあるパートナーと連携しながら対応しています。
                    私は窓口として、課題整理・要件整理・進行面を含めてご支援します。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
              Links
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              詳しい経歴やプロフィールは、各サービスでもご確認いただけます。
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="https://youtrust.jp/users/f1436a3aee8c24ddd8cd66efa3720e71"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              >
                YOUTRUST
              </a>

              <a
                href="https://www.wantedly.com/id/wataru_ishiduka_a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              >
                Wantedly
              </a>

              <a
                href="https://www.linkedin.com/in/%E4%BA%98-%E7%9F%B3%E5%A1%9A-8b2094259/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-900/10">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.22),_transparent_35%)] px-8 py-10 lg:px-10 lg:py-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                ご相談フォーム
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                採用業務の一部代行、Webまわりのご相談、現状整理からでも対応可能です。
                要件が固まっていない段階でも問題ありません。
              </p>

              <div className="mt-10 space-y-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  相談例：採用業務の一部外注、スカウト運用見直し、サイト改善の進め方整理
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  Web制作はパートナーと連携して対応します。窓口は一本化したまま進められます。
                </div>
              </div>
            </div>

            <div className="bg-white px-8 py-10 text-slate-900 lg:px-10 lg:py-12">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    お名前
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="山田 太郎"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@company.co.jp"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    ご相談内容
                  </label>
                  <textarea
                    name="message"
                    placeholder="採用代行、Webまわりの相談、現状整理などをご記入ください。"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "送信中..." : "送信する"}
                </button>
              </form>

              {result && (
                <p className="mt-5 text-center text-sm text-slate-600">{result}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}