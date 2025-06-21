import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Shield, FileText, Clock, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Starta bouppteckning - Enkel digital process | Veyla",
  description:
    "Kom igång med din bouppteckning på 5 minuter. AI-guidning, juridisk support och direktinlämning till Skatteverket för endast 1999 kr.",
  keywords: [
    "starta bouppteckning",
    "digital bouppteckning",
    "skatteverket",
    "dödsbo",
    "arvskifte",
  ],
  openGraph: {
    title: "Starta bouppteckning - Enkel digital process | Veyla",
    description:
      "Kom igång med din bouppteckning på 5 minuter. AI-guidning, juridisk support och direktinlämning till Skatteverket.",
    type: "website",
  },
};

export default function StartPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='bg-gradient-to-b from-gray-50 to-background border-b'>
        <div className='container mx-auto px-4 py-16'>
          <div className='text-center max-w-3xl mx-auto'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
              Starta din bouppteckning
            </h1>
            <p className='text-xl text-muted-foreground mb-8'>
              Kom igång på 5 minuter med vår AI-guidning. Transparent
              prissättning, juridisk support och direktinlämning till
              Skatteverket.
            </p>
            <div className='flex items-center justify-center gap-6 text-sm text-muted-foreground'>
              <div className='flex items-center gap-2'>
                <Shield className='w-4 h-4 text-[#0ea47a]' />
                <span>100% säkert</span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 text-[#0ea47a]' />
                <span>Starta på 5 min</span>
              </div>
              <div className='flex items-center gap-2'>
                <FileText className='w-4 h-4 text-[#0ea47a]' />
                <span>Automatisk inlämning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className='text-2xl'>
                    Grundläggande information
                  </CardTitle>
                  <p className='text-muted-foreground'>
                    Fyll i informationen nedan för att komma igång med din
                    bouppteckning.
                  </p>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='firstName'>Ditt förnamn</Label>
                      <Input id='firstName' placeholder='Anna' />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='lastName'>Ditt efternamn</Label>
                      <Input id='lastName' placeholder='Andersson' />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='email'>Din e-postadress</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='anna@example.com'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Telefonnummer</Label>
                    <Input id='phone' type='tel' placeholder='070-123 45 67' />
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='deceasedFirstName'>
                        Avlidens förnamn
                      </Label>
                      <Input id='deceasedFirstName' placeholder='Lars' />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='deceasedLastName'>
                        Avlidens efternamn
                      </Label>
                      <Input id='deceasedLastName' placeholder='Larsson' />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='dateOfDeath'>Dödsdatum</Label>
                    <Input id='dateOfDeath' type='date' />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='personalNumber'>
                      Avlidens personnummer
                    </Label>
                    <Input id='personalNumber' placeholder='YYYYMMDD-XXXX' />
                  </div>

                  <div className='pt-4'>
                    <Button
                      size='lg'
                      className='w-full bg-[#0ea47a] hover:bg-[#0a7557] text-white'
                    >
                      Starta bouppteckning - 1999 kr
                      <ArrowRight className='ml-2 w-5 h-5' />
                    </Button>
                    <p className='text-xs text-muted-foreground text-center mt-3'>
                      Betalning sker efter att du granskat och godkänt din
                      bouppteckning
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <div className='space-y-6'>
              <div>
                <h2 className='text-2xl font-bold mb-4'>
                  Vad ingår i Veyla Bouppteckning?
                </h2>
                <div className='space-y-4'>
                  <div className='flex items-start gap-3'>
                    <div className='w-6 h-6 rounded-full bg-[#0ea47a] flex items-center justify-center mt-0.5'>
                      <span className='text-white text-sm'>✓</span>
                    </div>
                    <div>
                      <h3 className='font-semibold'>AI-driven guidning</h3>
                      <p className='text-sm text-muted-foreground'>
                        Personlig AI-jurist som analyserar just ditt ärende och
                        guidar dig genom varje steg.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <div className='w-6 h-6 rounded-full bg-[#0ea47a] flex items-center justify-center mt-0.5'>
                      <span className='text-white text-sm'>✓</span>
                    </div>
                    <div>
                      <h3 className='font-semibold'>
                        Automatisk dokumenthantering
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        Alla nödvändiga dokument fylls i automatiskt baserat på
                        din information.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <div className='w-6 h-6 rounded-full bg-[#0ea47a] flex items-center justify-center mt-0.5'>
                      <span className='text-white text-sm'>✓</span>
                    </div>
                    <div>
                      <h3 className='font-semibold'>
                        Direktinlämning till Skatteverket
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        Digital signering och automatisk inlämning direkt till
                        rätt myndighet.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <div className='w-6 h-6 rounded-full bg-[#0ea47a] flex items-center justify-center mt-0.5'>
                      <span className='text-white text-sm'>✓</span>
                    </div>
                    <div>
                      <h3 className='font-semibold'>Juridisk support</h3>
                      <p className='text-sm text-muted-foreground'>
                        Obegränsad support via e-post under hela processen från
                        våra jurister.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <div className='w-6 h-6 rounded-full bg-[#0ea47a] flex items-center justify-center mt-0.5'>
                      <span className='text-white text-sm'>✓</span>
                    </div>
                    <div>
                      <h3 className='font-semibold'>Säker hantering</h3>
                      <p className='text-sm text-muted-foreground'>
                        End-to-end kryptering och säker lagring enligt GDPR.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <div className='w-6 h-6 rounded-full bg-[#0ea47a] flex items-center justify-center mt-0.5'>
                      <span className='text-white text-sm'>✓</span>
                    </div>
                    <div>
                      <h3 className='font-semibold'>
                        Tillgång för hela familjen
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        Alla arvingar kan följa processen - inga extra avgifter.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing comparison */}
              <Card className='bg-gray-50'>
                <CardHeader>
                  <CardTitle className='text-lg'>
                    Jämförelse med traditionell metod
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm'>
                        Traditionell bouppteckningsförrättare
                      </span>
                      <span className='font-semibold text-red-600'>
                        15 000 - 50 000 kr
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm'>
                        Värderingar och juridisk rådgivning
                      </span>
                      <span className='font-semibold text-red-600'>
                        5 000 - 15 000 kr
                      </span>
                    </div>
                    <div className='border-t pt-3'>
                      <div className='flex justify-between items-center'>
                        <span className='font-semibold'>
                          Veyla (allt inkluderat)
                        </span>
                        <span className='font-bold text-[#0ea47a] text-lg'>
                          1 999 kr
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card>
                <CardContent className='pt-6'>
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 rounded-full bg-[#0ea47a] flex items-center justify-center'>
                      <Users className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <p className='text-sm italic mb-2'>
                        &ldquo;Veyla gjorde hela processen så mycket enklare.
                        Istället för månader av stress fick vi allt klart på
                        några veckor.&rdquo;
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        - Anna Andersson, Stockholm
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ */}
          <div className='mt-20'>
            <h2 className='text-2xl font-bold text-center mb-8'>
              Vanliga frågor
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>
                    När behöver jag betala?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    Du betalar först efter att du granskat och godkänt din
                    färdiga bouppteckning. Inga dolda kostnader eller
                    överraskningar.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>
                    Hur lång tid tar det?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    De flesta kunder får sin bouppteckning klar inom 1-2 veckor.
                    Komplexa dödsbon kan ta upp till 4 veckor.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>
                    Vad händer om jag behöver hjälp?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    Du får obegränsad support via e-post från våra jurister
                    under hela processen. Svarstid inom 24 timmar på vardagar.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>
                    Är mina uppgifter säkra?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>
                    Ja, vi använder end-to-end kryptering och följer GDPR. Dina
                    uppgifter lagras säkert i Sverige och delas aldrig med
                    tredje part.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back to home */}
          <div className='mt-12 text-center'>
            <Link href='/'>
              <Button variant='outline'>Tillbaka till startsidan</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
