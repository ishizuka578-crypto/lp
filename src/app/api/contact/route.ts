import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name;
    const email = body.email;
    const message = body.message;

    await resend.emails.send({
      from: "LP問い合わせ <onboarding@resend.dev>",
      to: "ishizuka.578@gmail.com",
      subject: "LPから問い合わせが届きました",
      html: `
        <h2>問い合わせ内容</h2>
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>メール:</strong> ${email}</p>
        <p><strong>内容:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "送信失敗" }, { status: 500 });
  }
}