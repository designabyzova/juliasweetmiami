import { NextRequest, NextResponse } from "next/server";

const EMAIL_WORKER_URL = "https://email-service.anton-abyzov.workers.dev";

const OWNER_EMAILS = [
  "Uralevaulia@gmail.com",
  "designabyzova@gmail.com",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subscriberEmail, locale, welcomeHtml } = body;

    if (!subscriberEmail) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const notifyHtml = `<p>New email subscriber: <strong>${subscriberEmail}</strong></p><p>Language: ${locale || "en"}</p>`;

    // Notify all owners in parallel
    const ownerResults = await Promise.allSettled(
      OWNER_EMAILS.map((to) =>
        fetch(`${EMAIL_WORKER_URL}/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to,
            from: { email: "admin@easychamp.com", name: "Sweet Balance" },
            subject: `New subscriber: ${subscriberEmail}`,
            html: notifyHtml,
            replyTo: OWNER_EMAILS[0],
          }),
        }).then((r) => r.json())
      )
    );

    const anySuccess = ownerResults.some(
      (r) => r.status === "fulfilled" && r.value?.success
    );

    if (!anySuccess) {
      return NextResponse.json(
        { success: false, error: "Failed to process subscription" },
        { status: 502 }
      );
    }

    // DISABLED: Welcome email to subscriber — newsletter feature temporarily disabled
    // if (welcomeHtml) {
    //   fetch(`${EMAIL_WORKER_URL}/send`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       to: subscriberEmail,
    //       from: { email: "admin@easychamp.com", name: "Sweet Balance" },
    //       subject: locale === "ru"
    //         ? "Добро пожаловать в Sweet Balance! 🎂"
    //         : "Welcome to Sweet Balance! 🎂",
    //       html: welcomeHtml,
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
