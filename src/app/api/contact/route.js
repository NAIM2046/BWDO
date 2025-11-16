import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message , subject , region } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail", // OR use: host, port, secure
      auth: {
        user: process.env.EMAIL_USER,    // your email
        pass: process.env.EMAIL_PASS,    // app password
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,       // your email
      subject: `New Contact Message from ${name}`,
      text: message,
      html: `
        <h2>New Contact Message</h2>
         <p><strong>Region:</strong> ${region}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <p><strong>subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.log("Email Error:", err);
    return Response.json({ error: "Email not sent" }, { status: 500 });
  }
}
