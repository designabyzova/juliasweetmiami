import { NextRequest, NextResponse } from "next/server";

const EMAIL_WORKER_URL = "https://email-service.anton-abyzov.workers.dev";

const OWNER_EMAILS = [
  "Uralevaulia@gmail.com",
  "designabyzova@gmail.com",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, html, replyTo, customerEmail, customerSubject, customerHtml } = body;

    // Send to all owners in parallel
    const ownerResults = await Promise.allSettled(
      OWNER_EMAILS.map((to) =>
        fetch(`${EMAIL_WORKER_URL}/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to,
            from: { email: "admin@easychamp.com", name: "Sweet Balance" },
            subject,
            html,
            replyTo: replyTo || OWNER_EMAILS[0],
          }),
        }).then((r) => r.json())
      )
    );

    // Check if at least one owner email was sent successfully
    const anySuccess = ownerResults.some(
      (r) => r.status === "fulfilled" && r.value?.success
    );

    if (!anySuccess) {
      return NextResponse.json(
        { success: false, error: "Failed to send order notification" },
        { status: 502 }
      );
    }

    // DISABLED: Customer confirmation email — admin contacts customer directly by phone/message
    // if (customerEmail && customerHtml) {
    //   fetch(`${EMAIL_WORKER_URL}/send`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       to: customerEmail,
    //       from: { email: "admin@easychamp.com", name: "Sweet Balance" },
    //       subject: customerSubject || "Your order has been received — Sweet Balance",
    //       html: customerHtml,
    //       replyTo: OWNER_EMAILS[0],
    //     }),
    //   }).catch(() => {});
    // }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
