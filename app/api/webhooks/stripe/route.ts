import Stripe from "stripe";
import prisma from "@/app/libs/prismadb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const buf = await request.arrayBuffer();
  const rawBody = Buffer.from(buf);

  const signature = request.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    try {
      if (
        !metadata ||
        !metadata.listingId ||
        !metadata.startDate ||
        !metadata.endDate ||
        !metadata.userId
      ) {
        throw new Error("Missing metadata in webhook session");
      }

      await prisma.reservation.create({
        data: {
          listingId: metadata.listingId,
          startDate: new Date(metadata.startDate),
          endDate: new Date(metadata.endDate),
          totalPrice: session.amount_total ? session.amount_total / 100 : 0,
          userId: metadata.userId,
        },
      });
    } catch (error) {
      console.error("Failed to create reservation:", error);
      return new Response("Failed to create reservation", { status: 500 });
    }
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
