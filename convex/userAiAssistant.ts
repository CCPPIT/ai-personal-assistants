/* eslint-disable prettier/prettier */
import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const insertSelectedUserAiAssistants = mutation({
  args: {
    userId: v.id("users"),  // ID المستخدم المرتبط بالمساعدات
    records: v.array(v.object({  // مصفوفة من كائنات المساعدات
      id: v.number(),        // تم تغيير نوع المعرف من number إلى string
      name: v.string(),      // اسم المساعد
      title: v.string(),     // عنوان المساعد
      instruction: v.string(), // التعليمات الأساسية
      userInstruction: v.string(), // التعليمات المخصصة
      sampleQuestions: v.array(v.string()) // الأسئلة النموذجية
    }))
  },
  handler: async (ctx, args) => {
    // التحقق من عدم وجود تكرار في IDs
    const existingIds = await Promise.all(
      args.records.map(record => 
        ctx.db.query("userAiAssistants")
          .filter(q => q.eq(q.field("id"), record.id))
          .first()
      )
    );

    if (existingIds.some(assistant => assistant !== null)) {
      throw new Error("One or more assistant IDs already exist");
    }

    // التحقق من وجود المستخدم
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error("User not found");
    }

    // إدراج جميع المساعدات مع معالجة الأخطاء
    try {
      const insertedRecords = await Promise.all(
        args.records.map(async (record) => {
          return await ctx.db.insert("userAiAssistants", {
            ...record,
            userId: args.userId
          });
        })
      );

      return insertedRecords;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to insert assistants:", error);
      throw new Error("Failed to insert assistants");
    }
  }
});