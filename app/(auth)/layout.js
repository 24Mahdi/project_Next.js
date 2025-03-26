import React from "react";
import css from "@/styles/authLayout.module.css";
import Image from "next/image";

export const metadata = {
  title: "Authentication",
};

const AuthLayout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.left}>{children}</div>
       
      </div>
    </div>
  );
};

export default AuthLayout;
