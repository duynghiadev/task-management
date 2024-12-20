import { ReactNode } from "react";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { LayoutHeader } from "@/components/layout/LayoutHeader";

type Props = {
  children: ReactNode;
};

export const LayoutDefault = ({ children }: Props) => {
  return (
    <>
      <LayoutHeader />
      <LayoutWrapper>{children}</LayoutWrapper>
    </>
  );
};
