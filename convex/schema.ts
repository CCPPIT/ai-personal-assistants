/* eslint-disable prettier/prettier */
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // جدول المستخدمين
  users: defineTable({
    userId: v.string(),        // معرف فريد للمستخدم
    name: v.string(),          // اسم المستخدم
    email: v.string(),         // البريد الإلكتروني (يُفضل إضافة تحقق من الصيغة)
    picture: v.string(),       // رابط صورة المستخدم
    credits: v.number(),       // رصيد الاعتمادات (يُفضل تحديد قيمة افتراضية)
    orderId: v.optional(v.string()) // معرف الطلب (اختياري)
  })
  .index("by_userId", ["userId"]) ,// فهرس للبحث بواسطة userId

  // جدول مساعدات الذكاء الاصطناعي
  userAiAssistants: defineTable({
    id: v.number(),             // تغيير من number إلى string ليكون متوافقاً مع نظام Convex
    name: v.string(),          
    title: v.string(),         
    instruction: v.string(),   
    userInstruction: v.string(),
    sampleQuestions: v.array(v.string()),
    userId: v.id("users")
  })

  
});