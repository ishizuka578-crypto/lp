"use client";

import { FormEvent, ChangeEvent, useMemo, useState } from "react";

const challenges = [
  "応募は来るが、初回対応が遅れて取りこぼしている",
  "スカウトを打ちたいが、設計も送信も継続できていない",
  "採用広報や募集文が弱く、候補者に魅力が伝わっていない",
  "採用担当が兼務で、日々の業務に採用が埋もれてしまう",
];

const supportAreas = [
  {
    title: "スカウト運用代行",
    lead: "文面設計から送信、反応率の改善まで実務で支援。",
    body:
      "ターゲット整理、媒体選定、配信計画、文面改善、送信運用、返信初動の整備まで一気通貫で対応します。",
  },
  {
    title: "採用設計の整理",
    lead: "止まっている原因を言語化し、優先順位を整理。",
    body:
      "求人要件、訴求軸、選考フロー、現場との連携状況を確認し、10〜50名規模の企業でも回せる設計に整えます。",
  },
  {
    title: "応募導線と実務代行",
    lead: "候補者体験を改善し、機会損失を減らします。",
    body:
      "募集文、問い合わせ導線、日程調整、エージェント対応、初期連絡など、採用の実務負荷を部分的に引き取れます。",
  },
];

const industries = ["製造業", "IT", "アニメ・声優", "人材", "その他"];

const reasons = [
  {
    title: "小規模企業向けに現実的",
    body:
      "大きな採用チームがなくても回せる運用に寄せて設計します。理想論ではなく、実際に続く方法を優先します。",
  },
  {
    title: "戦略だけで終わらない",
    body:
      "課題整理だけでなく、スカウト送信や初動整備などの実務まで入れるため、改善が止まりにくいのが特徴です。",
  },
  {
    title: "採用現場に近い視点",
    body:
      "営業と採用の両方を経験しており、経営側の優先順位と現場の要望をすり合わせながら進められます。",
  },
];

const processSteps = [
  {
    title: "30分無料相談",
    body:
      "採用状況、募集職種、今どこで止まっているかを確認します。営業ではなく課題整理を優先します。",
  },
  {
    title: "優先課題の明確化",
    body:
      "スカウト、求人、選考フロー、初動対応のどこを先に触るべきかを整理し、支援範囲を決めます。",
  },
  {
    title: "実務支援スタート",
    body:
      "必要に応じて、スカウト運用、応募導線改善、候補者対応の一部代行まで着手します。",
  },
];

const proofPoints = [
  "10〜50名規模の企業を想定した採用支援",
  "月額30万円までを前提に相談しやすい設計",
  "製造業 / IT / アニメ・声優 / 人材の採用課題に対応",
  "初回は無料で課題整理のみでも可能",
];

const faqItems = [
  {
    question: "まだ要件が固まっていなくても相談できますか？",
    answer:
      "できます。職種要件や採用手法が曖昧な段階でも、現状の整理から進めます。まずは何がボトルネックかを明確にします。",
  },
  {
    question: "スカウトだけの依頼も可能ですか？",
    answer:
      "可能です。文面設計、送信運用、反応率改善など、必要な範囲に絞って支援できます。",
  },
  {
    question: "社内に採用担当がいなくても進められますか？",
    answer:
      "進められます。経営者や現場責任者の方と短時間で認識を合わせ、実務の負担が増えすぎない進め方を設計します。",
  },
];

type FormState = {
  name: string;
  company: string;
  email: string;
  industry: string;
  message: string;
  website: string;
};

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  industry: industries[0],
  message: "",
  website: "",
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [startedAt] = useState(() => Date.now());

  const canSubmit = useMemo(() => {
    return (
      form.name.trim() &&
      form.company.trim() &&
      form.email.trim() &&
      form.message.trim().length >= 20 &&
      !loading
    );
  }, [form, loading]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
          elapsedMs: Date.now() - startedAt,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "送信に失敗しました。");
      }

      setResult({
        type: "success",
        message:
          "送信ありがとうございました。通常1営業日以内を目安に、内容を確認してご連絡します。",
      });
      setForm(initialForm);
    } catch (error) {
      setResult({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "送信に失敗しました。時間をおいて再度お試しください。",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.14),_transparent_32%),radial-gradient(circle_at_85%_20%,_rgba(15,23,42,0.08),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.9))]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-10 lg:pb-24 lg:pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-line)] pb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
                Possidless Recruit Support
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                小規模企業向け 採用代行 / スカウト運用支援
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-[var(--color-brand)] transition hover:bg-[var(--color-brand)] hover:text-white"
            >
              30分無料で相談する
            </a>
          </div>

          <div className="grid gap-12 pt-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-[var(--color-line-strong)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-brand-deep)] shadow-sm">
                製造業 / IT / アニメ・声優 / 人材向け
              </div>
              <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--color-ink-strong)]">
                採用が止まる原因を整理し、
                <br />
                <span className="text-[var(--color-brand)]">
                  手を動かして改善する採用代行
                </span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)] lg:text-xl">
                10〜50名規模の企業向けに、スカウト運用を軸とした採用支援を行います。
                採用設計、応募導線改善、初期対応整理、実務代行まで対応し、
                小規模企業でも無理なく回る採用体制に整えます。
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-ink-strong)] px-7 py-4 text-base font-semibold text-white transition hover:bg-[var(--color-brand-deep)]"
                >
                  無料相談を予約する
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-line-strong)] bg-white px-7 py-4 text-base font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                >
                  支援内容を見る
                </a>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-medium text-[var(--color-muted)]">主な支援</p>
                  <p className="mt-3 text-xl font-semibold text-[var(--color-ink-strong)]">
                    スカウト運用代行
                  </p>
                </div>
                <div className="rounded-3xl border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-medium text-[var(--color-muted)]">想定予算</p>
                  <p className="mt-3 text-xl font-semibold text-[var(--color-ink-strong)]">
                    月額30万円まで
                  </p>
                </div>
                <div className="rounded-3xl border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-medium text-[var(--color-muted)]">初回対応</p>
                  <p className="mt-3 text-xl font-semibold text-[var(--color-ink-strong)]">
                    30分無料相談
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-panel)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-soft)]">
                Fit
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
                こんな企業に向いています
              </h2>
              <div className="mt-6 space-y-3">
                {challenges.map((challenge) => (
                  <div
                    key={challenge}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-200"
                  >
                    {challenge}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-white px-5 py-5 text-sm leading-7 text-[var(--color-muted)]">
                まずは営業ではなく、現状の詰まりを整理するところから始めます。
                必要な支援だけに絞って進められます。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="rounded-[2rem] bg-[var(--color-panel)] p-8 text-white shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-soft)]">
              Message
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight">
              採用支援というより、
              <br />
              採用の実務を一緒に前に進める役割です。
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300">
              小規模企業の採用では、戦略不足よりも、手が足りず運用が止まることが多くあります。
              そのため、設計だけではなく、スカウト送信や初動整備など、成果に近い実務を重視しています。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]"
              >
                <p className="text-base font-medium leading-7 text-[var(--color-ink)]">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="border-y border-[var(--color-line)] bg-[var(--color-surface)]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Services
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-ink-strong)]">
              スカウト特化で始めやすく、
              <br />
              必要に応じて採用全体まで支援
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--color-muted)]">
              最初から広く請けるのではなく、成果に直結しやすいポイントから優先して着手します。
              スカウト運用を中心に、採用設計や応募導線、初動対応まで一貫して見直せます。
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {supportAreas.map((area, index) => (
              <article
                key={area.title}
                className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-semibold text-white">
                  0{index + 1}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-[var(--color-ink-strong)]">
                  {area.title}
                </h3>
                <p className="mt-4 text-base font-medium leading-7 text-[var(--color-brand-deep)]">
                  {area.lead}
                </p>
                <p className="mt-4 leading-8 text-[var(--color-muted)]">{area.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Why Possidless
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-ink-strong)]">
              小規模企業に必要なのは、
              <br />
              見栄えより実行力
            </h2>
            <div className="mt-8 space-y-5">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-canvas)] p-5"
                >
                  <h3 className="text-lg font-semibold text-[var(--color-ink-strong)]">
                    {reason.title}
                  </h3>
                  <p className="mt-3 leading-8 text-[var(--color-muted)]">
                    {reason.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[linear-gradient(180deg,#0f172a,#1e293b)] p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-soft)]">
              Process
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">
              相談から支援開始まで
            </h2>
            <div className="mt-8 space-y-4">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-[var(--color-ink-strong)]">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="mt-4 leading-8 text-slate-300">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
                Scope
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-ink-strong)]">
                対応できる支援範囲
              </h2>
              <div className="mt-8 grid gap-3">
                {[
                  "採用ターゲット整理",
                  "スカウト文面設計",
                  "送信対象の見直し",
                  "送信運用と改善",
                  "求人・募集文の改善",
                  "初回連絡や候補者導線の整理",
                  "面接日程調整などの実務支援",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-4 text-base text-[var(--color-ink)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
                FAQ
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-ink-strong)]">
                よくある相談
              </h2>
              <div className="mt-8 space-y-4">
                {faqItems.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-canvas)] p-5"
                  >
                    <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--color-ink-strong)]">
                      {item.question}
                    </summary>
                    <p className="mt-4 leading-8 text-[var(--color-muted)]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"
      >
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-[2rem] bg-[linear-gradient(180deg,#115e59,#0f172a)] p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-soft)]">
              Contact
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">
              まずは30分、
              <br />
              採用の詰まりを整理します
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-200">
              売り込み前提ではなく、現状の課題整理を優先します。
              「スカウトが弱いのか」「求人訴求が弱いのか」「初動が遅いのか」などを、
              短時間で整理して次の一手を明確にします。
            </p>

            <div className="mt-8 space-y-4">
              {[
                "相談内容が固まっていなくても問題ありません",
                "月額30万円までの範囲を想定して相談できます",
                "製造業 / IT / アニメ・声優 / 人材の採用に対応します",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm leading-7 text-slate-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
                  >
                    お名前
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="山田 太郎"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
                  >
                    会社名
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="株式会社サンプル"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
                  >
                    メールアドレス
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@company.co.jp"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="industry"
                    className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
                  >
                    業種
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className="form-input appearance-none"
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Webサイト</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
                >
                  ご相談内容
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="例: エンジニア採用でスカウト返信率が低く、現場も忙しいため運用が止まっています。まず何から整えるべきか相談したいです。"
                  rows={7}
                  minLength={20}
                  required
                  className="form-input min-h-[180px] resize-y py-4"
                />
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  20文字以上を目安に、現状や困っている点を記載してください。
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--color-canvas)] px-4 py-4 text-sm leading-7 text-[var(--color-muted)]">
                送信後は通常1営業日以内を目安に確認します。急ぎの営業連絡は対象外です。
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-ink-strong)] px-6 py-4 text-base font-semibold text-white transition hover:bg-[var(--color-brand-deep)] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {loading ? "送信中..." : "無料相談を申し込む"}
              </button>
            </form>

            {result ? (
              <div
                className={`mt-5 rounded-2xl px-4 py-4 text-sm leading-7 ${
                  result.type === "success"
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {result.message}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
