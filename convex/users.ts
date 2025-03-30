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


