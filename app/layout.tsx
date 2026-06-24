import type {Metadata} from 'next';
import {Cormorant_Garamond, Outfit, JetBrains_Mono} from 'next/font/google';
import './globals.css'; // Global styles

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-cormorant',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'BrightMind AI Summer Camp 2026 - Slide Decks',
  description: 'Complete 20-Day Interactive Slide Decks for BrightMind Institute of Education AI Summer Camp.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#FAF7F2] text-[#12120E] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
