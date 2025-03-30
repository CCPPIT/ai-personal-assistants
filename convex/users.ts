/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Mutation لتزامن بيانات المستخدم مع قاعدة البيانات
 * - إذا كان المستخدم غير موجود، يتم إنشاء سجل جديد له
 * - إذا كان موجوداً، لا يتم تنفيذ أي عمل
 */
export const syncUser = mutation({
  // تعريف وسائط الـ mutation مع التحقق من النوع
  args: {
    userId: v.string(),       // معرّف المستخدم الفريد
    name: v.string(),         // اسم المستخدم
    email: v.string(),        // البريد الإلكتروني
    picture: v.string(),      // صورة المستخدم (URL)
  },

  // معالج الـ mutation
  handler: async (ctx, args) => {
    // البحث عن المستخدم الحالي في قاعدة البيانات
    const existingUser = await ctx.db
      .query("users")                     // استعلام عن جدول "users"
      .filter((q) => q.eq(q.field("userId"), args.userId))  // فلترة حسب userId
      .first();                           // جلب أول نتيجة فقط

    // إذا لم يكن المستخدم موجوداً
    if (!existingUser) {
      // إنشاء مستخدم جديد في قاعدة البيانات
      await ctx.db.insert("users", {
        userId: args.userId,  // معرّف المستخدم
        name: args.name,      // الاسم
        email: args.email,    // البريد الإلكتروني
        picture: args.picture,// صورة المستخدم
        credits: 5000         // رصيد افتراضي للمستخدم (5000 وحدة)
      });
    }

    // ملاحظة: لا يتم إرجاع أي قيمة (void mutation)
    // يمكنك إضافة return null; هنا إذا أردت توضيح ذلك
  }
});
export const getUser=query({
  args:{
    userId:v.string(),
  },
  handler:async(ctx,args)=>{
    if(!args.userId) return null;
    const user=await ctx.db.query("users")
    .withIndex("by_userId")
    .filter((q)=>q.eq(q.field("userId"),args.userId))
    .first();
    if(!user) return null;
    return user
  }
})

/* eslint-disable prettier/prettier */


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
      console.error("Failed to insert assistants:", error);
      throw new Error("Failed to insert assistants");
    }
  }
});



export const getUserById = query({
  args: { userId: v.string() }, // Takes userId as input
  handler: async (ctx, args) => {
    // Use the index to efficiently find the user
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique(); // Ensures only one result (since userId should be unique)

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
});