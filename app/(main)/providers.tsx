/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
"use client";

// eslint-disable-next-line import/order
import React, { useEffect } from 'react';
import { Navbar } from './_components/navbar';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  // معالجة تسجيل الدخول
  useEffect(() => {
    const handleAuth = async () => {
      if (isSignedIn && user?.id) {
        try {
          const convexUser = await convex.query(api.users.getUser, { userId: user.id });
          
          if (convexUser) {
            router.replace('/ai-assistant');
          } else {
            // إذا لم يكن المستخدم موجوداً في convex، ننشئ حساباً جديداً
            await convex.mutation(api.users.syncUser, {
              userId: user.id,
              email: user.primaryEmailAddress?.emailAddress || '',
              name: user.fullName || '',
              picture: user.imageUrl || ''
            });
            router.replace('/ai-assistant'); // صفحة الإعداد الأولي
          }
        } catch (error) {
          console.error('Authentication error:', error);
        }
      }
    };
   

    handleAuth();
    
  }, [isSignedIn, user, router, convex]);
//   useEffect(()=>{
//     const handleSignOut = async () => {
//       try {
//         await signOut();
//         router.push('/'); // العودة للصفحة الرئيسية بعد الخروج
//       } catch (error) {
//         console.error('Sign out error:', error);
//       }
//     };
//     handleSignOut()

//   },[signOut,router])

//  // معالجة تسجيل الخروج


  return (
    <div className='relative flex flex-col h-screen'>
      <Navbar />
      {children}
    </div>
  );
};

export default Providers;