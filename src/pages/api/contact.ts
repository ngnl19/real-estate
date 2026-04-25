export const prerender = false;

import { Resend } from "resend";
import { ratelimit } from "../../lib/ratelimit";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({request, clientAddress,}: {request: Request; clientAddress: string; }) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("cf-connecting-ip") ||
      clientAddress ||
      "anonymous";

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Too many requests. Please try again later.",
        }),
        { status: 429 },
      );
    }

    const data = await request.json();

    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "All fields are required.",
        }),
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Real Estate Client Contact <onboarding@resend.dev>",
      to: "kweyzipotato@gmail.com",
      subject: `New message from ${data.name}`,
      replyTo: data.email,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Message:</b></p>
        <p>${data.message}</p>
      `,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully!",
      }),
      { status: 200 },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong. Please try again.",
      }),
      { status: 500 },
    );
  }
}
