"use client";
import { useState, useEffect } from "react";
import "../../css/euclid-circular-a-font.css";
import "../../css/style.css";

import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import { CartModalProvider } from "@/app/context/CartSidebarModalContext";
import { PreviewSliderProvider } from "@/app/context/PreviewSliderContext";
import { ModalProvider } from "@/app/context/QuickViewModalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer/index";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <ReduxProvider>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    <Header />
                    {children}

                    <QuickViewModal />
                    <PreviewSliderModal />
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
            </ReduxProvider>
            <ScrollToTop />
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
