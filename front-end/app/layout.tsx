import "./globals.css";
import { LayoutDefault } from "@/layouts/Default";

export const metadata = {
  title: "TODO List（React Hook Form）",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutDefault>{children}</LayoutDefault>
      </body>
    </html>
  );
}
