"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { HeroBackground } from "@/components/ui/hero-background";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
  ArrowRight,
  Mail,
  Linkedin,
  Shield,
  FileText,
  Menu,
  X,
  MessageSquare,
  ClipboardCheck,
  Send,
  Check,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import scrollToSection from "@/lib/scrollToSection";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { StructuredData } from "@/components/seo/StructuredData";
import { useAnalytics } from "@/lib/analytics";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { usePerformance } from "@/hooks/usePerformance";
import { CookieBanner } from "@/components/ui/cookie-banner";

// People data for animated tooltip - matches testimonials
const people = [
  {
    id: 1,
    name: "Maria",
    designation: "Göteborg",
    image: "https://i.pravatar.cc/150?u=maria",
    initials: "MA",
  },
  {
    id: 2,
    name: "Anders",
    designation: "Stockholm",
    image: "https://i.pravatar.cc/150?u=anders",
    initials: "AN",
  },
  {
    id: 3,
    name: "Birgitta",
    designation: "Malmö",
    image: "https://i.pravatar.cc/150?u=birgitta",
    initials: "BI",
  },
  {
    id: 4,
    name: "Erik",
    designation: "Uppsala",
    image: "https://i.pravatar.cc/150?u=erik",
    initials: "ER",
  },
  {
    id: 5,
    name: "Sofia",
    designation: "Linköping",
    image: "https://i.pravatar.cc/150?u=sofia",
    initials: "SO",
  },
];

// SignedUp Component
function SignedUp({ count }: { count: number }) {
  const t = useTranslations("home");

  return (
    <div className='flex flex-col sm:flex-row items-center gap-4 sm:justify-between w-full mt-6 px-1'>
      <div className='flex items-center justify-center'>
        <AnimatedTooltip items={people} />
      </div>
      <div className='flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap'>
        <span className='relative flex h-2 w-2'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--accent-veyla))] opacity-75'></span>
          <span className='relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--accent-veyla))]'></span>
        </span>
        {t("hero.signedUpText", { count })}
      </div>
    </div>
  );
}

// Navbar Component
function Navbar() {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const t = useTranslations("home");
  const { trackNavigation, trackPrimaryCTA } = useAnalytics();

  const NAVBAR_TABS = [
    {
      label: t("navigation.howItWorks"),
      href: "how-it-works",
    },
    {
      label: t("navigation.pricing"),
      href: "pricing",
    },
    {
      label: t("navigation.about"),
      href: "reviews",
    },
    {
      label: t("navigation.blog"),
      href: "blog",
    },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (previous) {
      if (latest > previous && latest > 150) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
  });

  const handleClick = (href: string) => {
    trackNavigation(href, "click");
    scrollToSection(href);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={show ? "visible" : "hidden"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className='main-width flex h-16 items-center'>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='flex items-center gap-2'
        >
          <Link href='/' className='flex items-center gap-2'>
            <div className='w-9 h-9 p-1 rounded-lg border border-border veyla-gradient'>
              <div className='w-full h-full bg-white rounded-md flex items-center justify-center'>
                <span className='text-[#0ea47a] font-bold text-lg'>V</span>
              </div>
            </div>
            <span className='font-semibold text-lg'>{t("title")}</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex md:flex-1 md:justify-center'>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex space-x-8'
          >
            {NAVBAR_TABS.map((tab) => (
              <motion.button
                key={tab.href}
                onClick={() => {
                  trackNavigation(tab.href, "click");
                  scrollToSection(tab.href);
                }}
                whileHover={{ scale: 1.05 }}
                className='text-sm font-medium transition-colors hover:text-primary'
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Right side buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='flex items-center space-x-4'
        >
          <LocaleSwitcher />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setMenuOpen(!menuOpen)}
            className='inline-flex items-center justify-center md:hidden'
            aria-label={
              menuOpen ? t("navigation.closeMenu") : t("navigation.openMenu")
            }
          >
            {menuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className='border-b md:hidden'
          >
            <div className='space-y-1 px-4 pb-3 pt-2'>
              {NAVBAR_TABS.map((tab) => (
                <motion.button
                  key={tab.href}
                  onClick={() => handleClick(tab.href)}
                  whileHover={{ scale: 1.05 }}
                  className='block w-full px-3 py-2 text-base font-medium text-left hover:text-primary'
                >
                  {tab.label}
                </motion.button>
              ))}
              <div className='px-3 py-2'>
                <Link href='/start'>
                  <Button
                    variant='default'
                    className='w-full bg-[#0ea47a] hover:bg-[#0a7557]'
                    onClick={() => trackPrimaryCTA("mobile_nav")}
                  >
                    {t("hero.ctaPrimary")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Hero Component
function Hero() {
  const t = useTranslations("home");
  const { trackPrimaryCTA } = useAnalytics();

  return (
    <main className='min-h-[100svh] flex flex-col relative'>
      <HeroBackground />

      <div className='container mx-auto px-4 py-12 md:py-18 flex flex-col gap-12 md:gap-16 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center relative space-y-8'
        >
          <div className='flex justify-center'>
            <Badge
              variant='outline'
              className='rounded-full px-4 py-1 bg-background/50 backdrop-blur-sm border shadow-sm'
            >
              <span className='relative flex h-2 w-2 mr-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--accent-veyla))] opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--accent-veyla))]'></span>
              </span>
              {t("hero.priceNote")}
            </Badge>
          </div>

          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight tracking-tight'>
              {t("hero.headline")}
            </h1>
          </div>

          <p className='text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            {t("hero.description")}
          </p>

          <div className='max-w-md mx-auto w-full pt-4 flex flex-col gap-4'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href='/start'>
                <Button
                  size='lg'
                  className='w-full bg-[#0ea47a] hover:bg-[#0a7557] text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'
                  onClick={() => trackPrimaryCTA("hero")}
                >
                  {t("hero.ctaPrimary")}
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
            </motion.div>
            <SignedUp count={247} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='rounded-xl overflow-hidden border bg-card shadow-xl max-w-3xl mx-auto w-full'
        >
          <div className='w-full aspect-video bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center'>
            <div className='text-center space-y-4'>
              <div className='w-24 h-24 mx-auto veyla-gradient rounded-2xl flex items-center justify-center'>
                <FileText className='h-12 w-12 text-white' />
              </div>
              <div>
                <h3 className='text-2xl font-bold text-gray-800'>
                  {t("hero.videoTitle")}
                </h3>
                <p className='text-gray-600'>{t("hero.videoSubtitle")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

// How It Works Component
function HowItWorks() {
  const t = useTranslations("home");

  const howItWorksSteps = [
    {
      icon: MessageSquare,
      number: "1",
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
    },
    {
      icon: ClipboardCheck,
      number: "2",
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
    },
    {
      icon: Send,
      number: "3",
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
    },
  ];

  return (
    <section className='py-24 relative' id='how-it-works'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center space-y-4 mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
            {t("howItWorks.title").split(" ")[0]}{" "}
            <span className='relative inline-block'>
              {t("howItWorks.title").split(" ").slice(1).join(" ")}
              <motion.span
                className='absolute bottom-0 -inset-x-2 bg-[hsl(var(--accent-green))] h-4 -z-10 rounded-sm origin-left'
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              />
            </span>
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='relative group'
            >
              <div className='absolute -inset-4 rounded-xl bg-[hsl(var(--accent-veyla))] opacity-0 group-hover:opacity-10 transition-opacity' />
              <div className='relative space-y-4 p-4'>
                <div className='w-12 h-12 rounded-full bg-[hsl(var(--accent-veyla))] bg-opacity-20 flex items-center justify-center'>
                  <step.icon className='w-6 h-6 text-[#0ea47a]' />
                </div>
                <div className='space-y-2'>
                  <h3 className='text-xl font-semibold'>{step.title}</h3>
                  <p className='text-muted-foreground leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Component
function Pricing() {
  const t = useTranslations("home");
  const [showDetails, setShowDetails] = useState(false);
  const { trackSecondaryCTA, trackPricingToggle } = useAnalytics();

  return (
    <section className='py-24 relative' id='pricing'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center space-y-4 mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
            {t("pricing.title").split(" ")[0]}{" "}
            <span className='relative inline-block'>
              {t("pricing.title").split(" ").slice(1).join(" ")}
              <motion.span
                className='absolute bottom-0 -inset-x-2 bg-[hsl(var(--accent-pink))] h-4 -z-10 rounded-sm origin-left'
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              />
            </span>
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            {t("pricing.description")}
          </p>
        </motion.div>

        <div className='max-w-2xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='relative'
          >
            <Card className='relative h-full border-[hsl(var(--accent-veyla))] shadow-lg'>
              <div className='absolute -top-3 left-0 right-0 flex justify-center'>
                <span className='bg-[hsl(var(--accent-veyla))] text-white text-sm font-medium px-4 py-1 rounded-full'>
                  {t("pricing.recommended")}
                </span>
              </div>
              <CardHeader className='text-center pt-8'>
                <CardTitle className='text-2xl'>
                  {t("pricing.productName")}
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='text-center space-y-1'>
                  <div className='text-4xl font-bold text-[#0ea47a]'>
                    {t("pricing.price")}
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {t("pricing.subtitle")}
                  </div>
                </div>
                <ul className='space-y-3'>
                  {Array.from({ length: 4 }, (_, i) => (
                    <li key={i} className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-[hsl(var(--accent-veyla))] shrink-0' />
                      <span className='text-sm text-left'>
                        {t(`pricing.includes.${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className='text-xs text-center text-muted-foreground pt-4'>
                  {t("pricing.guarantee")}
                </div>
              </CardContent>
              <CardFooter className='flex-col space-y-4'>
                <Button
                  variant='outline'
                  className='w-full border-[#0ea47a] text-[#0ea47a] hover:bg-[#0ea47a] hover:text-white'
                  onClick={() => {
                    const newState = !showDetails;
                    setShowDetails(newState);
                    trackPricingToggle(newState ? "show" : "hide");
                    trackSecondaryCTA("pricing_details", "pricing_card");
                  }}
                >
                  {showDetails ? "Dölj detaljer" : t("pricing.ctaSecondary")}
                </Button>

                {/* Expandable details section */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className='w-full p-6 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-lg border border-emerald-100'
                    >
                      <h4 className='font-bold text-base mb-4 text-gray-900'>
                        Komplett paket - Allt som ingår för 1999 kr:
                      </h4>

                      {/* AI & Juridisk expertis */}
                      <div className='mb-6'>
                        <h5 className='font-semibold text-sm mb-3 text-[#0ea47a] flex items-center gap-2'>
                          <MessageSquare className='h-4 w-4' />
                          AI-Juridisk Expertis
                        </h5>
                        <ul className='space-y-2 text-sm text-gray-700'>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              Personlig AI-jurist som analyserar just ditt
                              ärende
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              Skräddarsydda rekommendationer baserat på ditt
                              dödsbo
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              Experthjälp med komplicerade tillgångar
                              (fastigheter, aktier, utländska tillgångar)
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Dokumenthantering */}
                      <div className='mb-6'>
                        <h5 className='font-semibold text-sm mb-3 text-[#0ea47a] flex items-center gap-2'>
                          <FileText className='h-4 w-4' />
                          Dokumenthantering & Inlämning
                        </h5>
                        <ul className='space-y-2 text-sm text-gray-700'>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              Automatisk ifyllning av alla nödvändiga dokument
                              (K4, K5, K6)
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              Digital signering med BankID för alla arvingar
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              Direktinlämning till Skatteverket - inga
                              postningar
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              Uppföljning av ärendestatus hos myndigheter
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Support & Säkerhet */}
                      <div className='mb-6'>
                        <h5 className='font-semibold text-sm mb-3 text-[#0ea47a] flex items-center gap-2'>
                          <Shield className='h-4 w-4' />
                          Support & Säkerhet
                        </h5>
                        <ul className='space-y-2 text-sm text-gray-700'>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              Obegränsad support via e-post under hela processen
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              End-to-end kryptering av all känslig data
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              Svenska servrar och GDPR-kompatibel datahantering
                            </span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <Check className='h-4 w-4 text-[#0ea47a] mt-0.5 shrink-0' />
                            <span>
                              Tillgång för hela familjen - inga extra avgifter
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Värdeproposition */}
                      <div className='bg-white p-4 rounded-lg border border-emerald-200'>
                        <div className='flex items-center gap-2 mb-2'>
                          <div className='w-2 h-2 bg-[#0ea47a] rounded-full'></div>
                          <span className='font-semibold text-sm text-gray-900'>
                            Jämfört med traditionell juridisk hjälp:
                          </span>
                        </div>
                        <ul className='text-xs text-gray-600 space-y-1'>
                          <li>• Traditionell advokat: 15 000 - 30 000 kr</li>
                          <li>• Veyla: 1 999 kr (90% billigare)</li>
                          <li>• Tid: Veckor istället för månader</li>
                          <li>• Transparent fast pris - inga dolda avgifter</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Reviews Component
function Reviews() {
  const t = useTranslations("home");
  const reviews = t.raw("reviews.testimonials") as Array<{
    name: string;
    location: string;
    review: string;
    initials: string;
  }>;

  return (
    <section className='py-24 relative' id='reviews'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center space-y-4 mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
            {t("reviews.title")}
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            {t("reviews.subtitle")}
          </p>
        </motion.div>

        {/* First row - 3 testimonials */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8'>
          {reviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group'
            >
              <Card className='h-full relative backdrop-blur-sm overflow-hidden hover:shadow-lg transition-shadow duration-300'>
                <CardContent className='pt-6 h-full flex flex-col'>
                  <div className='space-y-4 flex flex-col h-full'>
                    <p className='text-muted-foreground italic flex-grow leading-relaxed'>
                      &quot;{review.review}&quot;
                    </p>
                    <div className='flex items-center gap-4 mt-auto pt-4'>
                      <Avatar className='ring-2 ring-[hsl(var(--accent-veyla))] ring-offset-2 ring-offset-background'>
                        <AvatarFallback className='bg-[hsl(var(--accent-veyla))] text-white'>
                          {review.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className='text-left'>
                        <div className='font-semibold'>{review.name}</div>
                        <div className='text-sm text-muted-foreground'>
                          {review.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Second row - 3 more testimonials */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {reviews.slice(3, 6).map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
              className='group'
            >
              <Card className='h-full relative backdrop-blur-sm overflow-hidden hover:shadow-lg transition-shadow duration-300'>
                <CardContent className='pt-6 h-full flex flex-col'>
                  <div className='space-y-4 flex flex-col h-full'>
                    <p className='text-muted-foreground italic flex-grow leading-relaxed'>
                      &quot;{review.review}&quot;
                    </p>
                    <div className='flex items-center gap-4 mt-auto pt-4'>
                      <Avatar className='ring-2 ring-[hsl(var(--accent-veyla))] ring-offset-2 ring-offset-background'>
                        <AvatarFallback className='bg-[hsl(var(--accent-veyla))] text-white'>
                          {review.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className='text-left'>
                        <div className='font-semibold'>{review.name}</div>
                        <div className='text-sm text-muted-foreground'>
                          {review.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='text-center mt-16'
        >
          <div className='flex flex-col sm:flex-row items-center justify-center gap-8 max-w-3xl mx-auto'>
            <div className='flex items-center gap-2'>
              <div className='flex -space-x-2'>
                {people.map((person) => (
                  <Avatar key={person.id} className='ring-2 ring-white w-8 h-8'>
                    <AvatarFallback className='bg-[hsl(var(--accent-veyla))] text-white text-xs'>
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className='text-sm text-muted-foreground ml-2'>
                +240 nöjda familjer
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className='w-4 h-4 text-yellow-400 fill-current'>
                    ⭐
                  </div>
                ))}
              </div>
              <span className='text-sm text-muted-foreground'>
                4.9/5 genomsnittligt betyg
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Start Now Component
function StartNow() {
  const t = useTranslations("home");
  const { trackPrimaryCTA } = useAnalytics();

  return (
    <section className='py-24 relative' id='start-now'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center space-y-4 mb-12'
        >
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
            {t("startNow.title")}
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            {t("startNow.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='max-w-md mx-auto w-full'
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href='/start'>
              <Button
                size='lg'
                className='w-full bg-[#0ea47a] hover:bg-[#0a7557] text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'
                onClick={() => trackPrimaryCTA("start_now")}
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  const t = useTranslations("home");

  return (
    <footer className='bg-gray-900 text-white py-16 px-4'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid md:grid-cols-4 gap-8 mb-12'>
          {/* Contact */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>
              {t("footer.contact.title")}
            </h3>
            <div className='space-y-3'>
              <a
                href={`mailto:${t("footer.contact.email")}`}
                className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
              >
                <Mail className='h-4 w-4' />
                <span>{t("footer.contact.email")}</span>
              </a>
              <a
                href='#'
                className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'
              >
                <Linkedin className='h-4 w-4' />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>
              {t("footer.support.title")}
            </h3>
            <p className='text-gray-300'>{t("footer.support.kth")}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>
              {t("footer.links.title")}
            </h3>
            <div className='space-y-2'>
              <a
                href='#'
                className='block text-gray-300 hover:text-white transition-colors'
              >
                {t("footer.links.privacy")}
              </a>
              <a
                href='#'
                className='block text-gray-300 hover:text-white transition-colors'
              >
                {t("footer.links.terms")}
              </a>
              <a
                href='#'
                className='block text-gray-300 hover:text-white transition-colors'
              >
                {t("footer.links.cookies")}
              </a>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>
              {t("footer.security.title")}
            </h3>
            <div className='space-y-2'>
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className='flex items-start space-x-2'>
                  <Shield className='h-4 w-4 text-[#0ea47a] mt-0.5 flex-shrink-0' />
                  <span className='text-sm text-gray-300'>
                    {t(`footer.security.points.${i}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <div className='flex items-center space-x-2 mb-4 md:mb-0'>
            <div className='h-6 w-6 rounded veyla-gradient'></div>
            <span className='text-xl font-bold'>Veyla</span>
          </div>
          <p className='text-gray-400 text-sm'>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

// Supported By Component
function SupportedBy() {
  const t = useTranslations("home");

  return (
    <section className='py-24 relative bg-gray-50' id='supported-by'>
      <div className='container mx-auto px-4 flex flex-col items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-muted-foreground'>
            {t("supportedBy.title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex justify-center'
        >
          <div>
            <OptimizedImage
              src='/images/innovation.png'
              alt='KTH Innovation'
              width={600}
              height={600}
              className='object-contain w-full h-full'
              priority={false}
              quality={90}
              sizes='(max-width: 768px) 100vw, 600px'
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Blog Component
function Blog() {
  const t = useTranslations("home");
  const { trackBlogClick } = useAnalytics();

  // Use real blog posts from Markdown files
  const blogPosts = [
    {
      title:
        "Komplett guide: Bouppteckning efter dödsfall - Vad du behöver veta",
      excerpt:
        "En omfattande guide som hjälper dig att förstå processen för bouppteckning efter dödsfall. Lär dig om tidsfrister, dokument och praktiska steg.",
      href: "/blog/guide-bouppteckning-efter-dodsfall",
      publishedAt: "2024-01-15",
      readingTime: "8 min",
    },
    {
      title:
        "Digitala tillgångar i dödsbo - Så hanterar du kryptovalutor och online-konton",
      excerpt:
        "Allt fler lämnar efter sig digitala tillgångar. Lär dig hur du identifierar och hanterar kryptovalutor, online-konton och digitala investeringar i bouppteckningen.",
      href: "/blog/digitala-tillgangar-dodsbo",
      publishedAt: "2024-01-20",
      readingTime: "6 min",
    },
    {
      title: "7 vanliga misstag vid bouppteckning - Så undviker du dyra fel",
      excerpt:
        "Lär dig om de vanligaste misstagen som görs vid bouppteckning och hur du undviker dem. Spara tid, pengar och undvik problem med Skatteverket.",
      href: "/blog/vanliga-misstag-bouppteckning",
      publishedAt: "2024-01-25",
      readingTime: "5 min",
    },
  ];

  return (
    <section className='py-24 relative bg-gray-50' id='blog'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center space-y-4 mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
            {t("blog.title")}
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            {t("blog.subtitle")}
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group'
            >
              <Link href={post.href}>
                <Card
                  className='h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer'
                  onClick={() => trackBlogClick(post.title, index + 1)}
                >
                  <CardHeader>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-xs text-muted-foreground'>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "sv-SE",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        {post.readingTime}
                      </span>
                    </div>
                    <CardTitle className='text-lg group-hover:text-[#0ea47a] transition-colors line-clamp-2'>
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground text-sm leading-relaxed line-clamp-3'>
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant='ghost'
                      className='p-0 h-auto text-[#0ea47a] hover:text-[#0a7557]'
                    >
                      Läs mer
                      <ArrowRight className='ml-1 h-4 w-4' />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Home Component
export function Home() {
  // Initialize scroll tracking for secondary KPI
  useScrollTracking();

  // Initialize performance monitoring
  usePerformance();

  return (
    <div>
      <StructuredData />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Reviews />
      <Blog />
      <Separator />
      <StartNow />
      <SupportedBy />
      <Footer />
      <CookieBanner />
    </div>
  );
}
