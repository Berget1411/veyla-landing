"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("veyla-cookie-consent");
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("veyla-cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("veyla-cookie-consent", "declined");
    setShowBanner(false);
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className='fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md'
        >
          <Card className='p-4 shadow-lg border bg-white/95 backdrop-blur-sm'>
            <div className='flex items-start gap-3'>
              <Cookie className='h-5 w-5 text-[#0ea47a] mt-0.5 flex-shrink-0' />
              <div className='flex-1'>
                <h3 className='font-semibold text-sm mb-2'>
                  Cookies & Analytics
                </h3>
                <p className='text-xs text-muted-foreground mb-3 leading-relaxed'>
                  Vi använder Plausible Analytics för att förstå hur vår
                  webbplats används. Denna analytics-tjänst är privacy-vänlig
                  och samlar inte in personlig data eller använder cookies för
                  spårning.
                </p>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    onClick={handleAccept}
                    className='bg-[#0ea47a] hover:bg-[#0a7557] text-white text-xs px-3 py-1 h-auto'
                  >
                    Acceptera
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={handleDecline}
                    className='text-xs px-3 py-1 h-auto'
                  >
                    Avböj
                  </Button>
                </div>
              </div>
              <Button
                size='sm'
                variant='ghost'
                onClick={handleClose}
                className='p-1 h-auto w-auto'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
