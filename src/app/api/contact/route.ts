import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not configured.");
}

const resend = new Resend(resendApiKey);
const notificationTo =
  process.env.CONTACT_NOTIFICATION_TO ?? "ishizuka.578@gmail.com";
const fromAddress =
  process.env.CONTACT_FROM ?? "Possidless LP <onboarding@resend.dev>";
const replyEnabled = process.env.CONTACT_AUTO_REPLY === "true";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  industry?: string;
  message?: string;
  website?: string;
  elapsedMs?: number;
  submittedAt?: string;
};

const sanitize = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .trim();

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (body.website) {
      return Response.json({ success: true });
    }

    if (!body.elapsedMs || body.elapsedMs < 2500) {
      return Response.json(
        { error: "送信が早すぎます。時間をおいて再度お試しください。" },
        { status: 400 }
      );
    }

    const name = sanitize(body.name ?? "");
    const company = sanitize(body.company ?? "");
    const email = sanitize(body.email ?? "");
    const industry = sanitize(body.industry ?? "未選択");
    const message = sanitize(body.message ?? "");
    const submittedAt = sanitize(body.submittedAt ?? new Date().toISOString());

    if (!name || !company || !email || message.length < 20) {
      return Response.json(
        { error: "入力内容を確認してください。" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { error: "メールアドレスの形式を確認してください。" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: fromAddress,
      to: notificationTo,
      replyTo: email,
      subject: `【LP問い合わせ】${company} / ${name}`,
      html: `
        <h2>LPから問い合わせが届きました</h2>
        <p><strong>会社名:</strong> ${company}</p>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>業種:</strong> ${industry}</p>
        <p><strong>送信時刻:</strong> ${submittedAt}</p>
        <hr />
        <p><strong>相談内容:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
      text: [
        "LPから問い合わせが届きました",
        `会社名: ${company}`,
        `お名前: ${name}`,
        `メールアドレス: ${email}`,
        `業種: ${industry}`,
        `送信時刻: ${submittedAt}`,
        "",
        "相談内容:",
        message,
      ].join("\n"),
    });

    if (replyEnabled) {
      await resend.emails.send({
        from: fromAddress,
        to: email,
        subject: "お問い合わせありがとうございます | Possidless",
        html: `
          <p>${name} 様</p>
          <p>お問い合わせありがとうございます。内容を確認のうえ、通常1営業日以内を目安にご連絡します。</p>
          <p>ご送信内容</p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
        text: [
          `${name} 様`,
          "お問い合わせありがとうございます。内容を確認のうえ、通常1営業日以内を目安にご連絡します。",
          "",
          "ご送信内容",
          message,
        ].join("\n"),
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    );
  }
}
