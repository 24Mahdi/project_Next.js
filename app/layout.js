import { ClerkProvider } from "@clerk/nextjs";
import { Cairo } from "next/font/google"; // تحميل خط "Cairo"
import StyledComponentsRegistry from "@/lib/AntRegistry";
import "./globals.css";
import "@/styles/typography.css";
import QueryProvider from "@/lib/QueryProvider";

const cairo = Cairo({
  subsets: ["arabic"], 
  weight: ["400", "500", "600"], 
});

export const metadata = {
  title: "مشروع next js",
  description: "nextjs",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        signIn: {
          variables: { colorPrimary: "#48A6A7" },
        },
        signUp: {
          variables: { colorPrimary: "#48A6A7" },
        },
      }}
    >
      <html lang="ar">
        <body className={cairo.className}>
          <QueryProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
