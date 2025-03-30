/* eslint-disable prettier/prettier */

// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";

export type SiteConfig = typeof siteConfig;
// const googleLogin = useGoogleLogin({
//   onSuccess: async (tokenResponse) => {
//     console.log(tokenResponse);
//     const userInfo = await axios.get(
//       'https://www.googleapis.com/oauth2/v3/userinfo',
//       { headers: { Authorization: 'Bearer <tokenResponse.access_token>' } },
//     );

//     console.log(userInfo);
//   },
//   onError: errorResponse => console.log(errorResponse),
// });
export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Login",
      href: "/sign-in",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
    sign_in:"/sign-in",
    // google:googleLogin
  },
};

