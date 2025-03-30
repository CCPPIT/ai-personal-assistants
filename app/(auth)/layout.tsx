/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { ReactNode } from "react";
// eslint-disable-next-line prettier/prettier

type Props = {
  children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {children}
    </div>
  );
};

export default layout;
