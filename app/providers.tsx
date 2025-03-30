/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type { ThemeProviderProps } from "next-themes";
import { ConvexProvider, ConvexReactClient } from "convex/react";


import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ClerkProvider } from "@clerk/nextjs";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


  return (
<ClerkProvider>

<ConvexProvider client={convex}>



    
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
    </ConvexProvider>
    </ClerkProvider>
  );
}
