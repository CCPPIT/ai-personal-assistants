"use client";
import { SignIn } from "@clerk/nextjs";
import { Link } from "@heroui/link";
import React from "react";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
type Props = {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SignInPage = (props: Props) => {
  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     console.log(tokenResponse);
  //     localStorage.setItem("user_token", tokenResponse.access_token);
  //     const userInfo = await axios.get(
  //       "https://www.googleapis.com/oauth2/v3/userinfo",
  //       { headers: { Authorization: `Bearer${tokenResponse.access_token}` } },
  //     );

  //     console.log(userInfo);
  //   },
  //   onError: (errorResponse) => console.log(errorResponse),
  // });

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Sign In To &nbsp;</span>
        <span className={title({ color: "violet" })}>
          AI Personal Assitant & Agent&nbsp;
        </span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          //   href={''}
        >
          <Button onClick={() => <SignIn />}>Sign in With Gmail</Button>
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
};

export default SignIn;
