/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // 1. التحقق من وجود سر ويب هوك Clerk
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    // 2. التحقق من رؤوس Svix
    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Missing required Svix headers", { status: 400 });
    }

    // 3. معالجة جسم الطلب
    const payload = await request.json();
    const body = JSON.stringify(payload);
    
    try {
      // 4. التحقق من صحة ويب هوك
      const wh = new Webhook(webhookSecret);
      const evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature
      }) as WebhookEvent;

      // 5. معالجة حدث إنشاء المستخدم
      if (evt.type === "user.created") {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;
        
        // 6. استخراج بيانات المستخدم
        const email = email_addresses[0]?.email_address;
        const name = [first_name, last_name].filter(Boolean).join(" ").trim();
        
        if (!email) {
          return new Response("Missing email address", { status: 400 });
        }

        // 7. مزامنة بيانات المستخدم
        await ctx.runMutation(api.users.syncUser, {
          userId: id,
          name,
          email,
          picture: image_url
        });
      }

      return new Response("Webhook processed successfully", { status: 200 });

    } catch (err) {
      console.error("Webhook processing failed:", err);
      return new Response("Error processing webhook", { status: 400 });
    }
  })
});

export default http;