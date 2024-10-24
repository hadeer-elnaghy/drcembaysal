// It's a good practice to organize imports: first third-party imports, then absolute imports, and last relative imports.
import React from "react"; // React import for JSX
import { Inter } from "next/font/google"; // Inter font from Google fonts
import { getTranslations } from "next-intl/server"; // next-intl for internationalization
import Header from "@/components/header/header";
import { unstable_setRequestLocale } from "next-intl/server";

import "./globals.css"; // Global CSS import comes last among imports
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { LocaleProvider } from "@/contexts/localeProvider";
import Footer from "@/components/footer";
import CtaSection from "@/components/footer/ctaSection";

const inter = Inter({ subsets: ["latin"] });

// TypeScript type definition for props, ensuring best practices in type-checking
type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string; messages: string };
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: "Dr. Cem Dental Clinic - Istanbul, Turkey",
    description:
      "Experience World-Class Dental Care with Dr. Cem Baysal, the Best Dentist in Turkey. Renowned in Istanbul, Dr. Baysal is a Former Professor and an Expert in Oral Diagnosis, Radiology, and Implantology.",
  };
}

// Corrected function component definition with destructured props for clarity and simplicity
const RootLayout: React.FC<LayoutProps> = ({
  children,
  params: { messages },
}) => {
  unstable_setRequestLocale(messages);
  const intlMessages = useMessages();
  return (
    <html lang={messages}>
      <LocaleProvider locale={messages}>
        <NextIntlClientProvider messages={intlMessages} locale={messages}>
          <body className={inter.className}>
            <Toaster richColors position="bottom-left" />
            <Header />
            <div>{children}</div>
            <div className="relative top-4">
              <CtaSection />
              <div className="px-[10vw] bg-secondary-foreground z-[4] ">
                <Footer />
              </div>
            </div>
            {/* <WhatsappButton /> */}
          </body>
        </NextIntlClientProvider>
      </LocaleProvider>
    </html>
  );
};

export default RootLayout;
