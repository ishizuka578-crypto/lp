export default function Home() {
  return (
    <main className="bg-white text-black">

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          エンジニア採用を最短化する
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          採用戦略設計からスカウト運用、面接設計まで。
          現場経験者が伴走する採用代行サービス。
        </p>
        <button className="bg-black text-white px-8 py-4 rounded-lg">
          無料相談はこちら
        </button>
      </section>

      {/* Problem */}
      <section className="py-24 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">
          こんな課題ありませんか？
        </h2>
        <ul className="space-y-4 text-lg">
          <li>・応募が来ない</li>
          <li>・面接通過率が低い</li>
          <li>・内定承諾率が伸びない</li>
        </ul>
      </section>

      {/* Solution */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">
          私たちが解決します
        </h2>
        <p className="max-w-3xl mx-auto text-lg">
          KPI設計、媒体運用、スカウト文改善、面接設計まで一気通貫で支援。
          採用を「属人化」から「再現性」へ。
        </p>
      </section>

    </main>
  );
}