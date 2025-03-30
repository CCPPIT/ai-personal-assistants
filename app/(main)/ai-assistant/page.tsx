"use client";
import React, { useState } from "react";
import { button as buttonStyles } from "@heroui/theme";
import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import { Link } from "@heroui/link";

import { title, subtitle } from "../_components/primitives";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import AiAssistantsList from "@/constants/AiAssistantsList";
import { Checkbox } from "@/components/ui/checkbox";
import { BlurFade } from "@/components/ui/blur-fade";
import { RainbowButton } from "@/components/magicui/rainbow-button";

export type ASSISTANT = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

// eslint-disable-next-line @next/next/no-async-client-component
const AIAssistant = () => {
  // 1. تعريف حالة (state) لتخزين المساعدين المحددين
  // - `selectedAssistants`: المصفوفة الحالية للمساعدين المختارين
  // - `setSelectedAssistants`: الدالة لتحديث هذه المصفوفة
  // - `useState<ASSISTANT[]>([])`: تهيئة الحالة بمصفوفة فارغة من نوع ASSISTANT

  const [selectedAssistants, setSelectedAssistants] = useState<ASSISTANT[]>([]);
  // const insertAssistant=useMutation(api.users.insertSelectedUserAiAssistants);
  // bun install --ignore-scripts

  // const user=useQuery(api.users.getUserById,{userId:userId})
  // const onClickContinue =  async() => {
  //   try {
  //     // 1. التحقق من وجود مستخدم محدد
  //     if (!user) {
  //       throw new Error("لم يتم تحديد مستخدم");
  //     }

  //     // 2. التحقق من وجود مساعدين محددين
  //     if (!selectedAssistants || selectedAssistants.length === 0) {
  //       throw new Error("لم يتم اختيار أي مساعدين");
  //     }

  //     // 3. إعداد البيانات للإرسال
  //     const records = selectedAssistants.map(assistant => ({
  //       id: assistant.id, // تأكد أن ID هو string
  //       name: assistant.name,
  //       title: assistant.title,
  //       instruction: assistant.instruction,
  //       userInstruction: assistant.userInstruction,
  //       sampleQuestions: assistant.sampleQuestions
  //     }));

  //     // 4. استدعاء الدالة مع معالجة الأخطاء
  //     const result = await insertAssistant({
  //       records,
  //       userId: user?._id // تأكد أن userId محدد ومتاح
  //     });

  //     // 5. معالجة النتيجة
  //     if (result) {
  //       console.log("تم إدراج المساعدين بنجاح", result);
  //       // إعادة توجيه أو تحديث الواجهة

  //     }

  //   } catch (error) {
  //     console.error("فشل في إدراج المساعدين:", error);
  //     // عرض رسالة خطأ للمستخدم

  //   }
  // };

  // 2. دالة لإدارة اختيار/إلغاء اختيار المساعد
  // - تأخذ كمعامل `assistant` من نوع ASSISTANT (المساعد المراد تعديل حالته)
  const onSelectAssistant = (assistant: ASSISTANT) => {
    // 3. التحقق مما إذا كان المساعد محدداً بالفعل
    // - `some()` تتحقق إذا كان هناك أي عنصر في المصفوفة يحقق الشرط
    // - هنا نتحقق إذا كان هناك مساعد بنفس المعرف (id)
    const isSelected = selectedAssistants.some(
      (item) => item.id === assistant.id,
    );

    // 4. إذا كان المساعد محدداً بالفعل (isSelected = true)
    if (isSelected) {
      // 5. إزالته من المصفوفة باستخدام filter
      // - ننشئ مصفوفة جديدة تحتوي على كل المساعدين ما عدا المساعد الحالي
      setSelectedAssistants(
        selectedAssistants.filter((item) => item.id !== assistant.id),
      );
    }
    // 6. إذا لم يكن المساعد محدداً (isSelected = false)
    else {
      // 7. إضافته إلى المصفوفة باستخدام spread operator
      // - ننشئ مصفوفة جديدة تحتوي على كل المساعدين السابقين + المساعد الجديد
      setSelectedAssistants([...selectedAssistants, assistant]);
    }
  };

  const isSelectedAssistant = (assistant: ASSISTANT) => {
    /**
     * @method some - تبحث في المصفوفة عن عنصر واحد على الأقل يحقق الشرط
     * @param {ASSISTANT} item - كل عنصر في المصفوفة
     * @returns {boolean} - true إذا وجد مساعد بنفس المعرف
     */
    return selectedAssistants.some((item) => item.id === assistant.id);
  };

  return (
    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
      <section className="flex flex-col items-center justify-center gap-4 pt-10 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <BlurFade delay={0.25 * 1}>
            <span className={title()}>Welcome To&nbsp;</span>
            <span className={title({ color: "violet" })}>
              The World of &nbsp;
            </span>
          </BlurFade>
          <br />
          <BlurFade delay={0.25 * 2}>
            <span className={title({ color: "violet" })}>AI Assistants</span>
          </BlurFade>
          <BlurFade delay={0.25 * 3}>
            <div className={subtitle({ class: "mt-4" })}>
              Choose your AI Companion to Simplify Your Task.
            </div>
          </BlurFade>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-10">
        <div className="flex gap-3">
          <RainbowButton
            disabled={selectedAssistants.length === 0}
            onClick={() => {}}
          >
            Continue
          </RainbowButton>

          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {AiAssistantsList.map((assistant, index) => (
            <BlurFade key={assistant.image} inView delay={0.25 + index * 0.05}>
              <Card
                key={assistant.id}
                isFooterBlurred
                className="transition-all ease-in-out hover:border hover:scale-105 cursor-pointer relative"
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <Checkbox
                    checked={isSelectedAssistant(assistant)}
                    className="absolute m-2"
                    onCheckedChange={() => onSelectAssistant(assistant)}
                  />
                </CardHeader>

                <Image
                  removeWrapper
                  alt={assistant.title}
                  className="z-0 w-full h-[300px] object-cover"
                  height={300}
                  src={assistant.image}
                  width={300}
                />

                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    <Image
                      alt="Breathing app icon"
                      className="rounded-full w-10 h-11 bg-black"
                      src="https://heroui.com/images/breathing-app-icon.jpeg"
                    />
                    <div className="flex flex-col">
                      <p className="text-tiny text-white/60">
                        {assistant.name}
                      </p>
                      <p className="text-tiny text-white/60">
                        {assistant.title}&#39;
                      </p>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={
                      isSelectedAssistant(assistant) ? "solid" : "bordered"
                    }
                    onPress={() => onSelectAssistant(assistant)}
                  >
                    {isSelectedAssistant(assistant) ? "Selected" : "Select"}
                  </Button>
                </CardFooter>
              </Card>
            </BlurFade>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AIAssistant;
