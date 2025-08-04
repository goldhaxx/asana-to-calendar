/**
 * Root Layout with comprehensive SEO and social media optimization
 * Includes Open Graph meta tags, Twitter Cards, structured data, and PWA support
 */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "@/context/app-context";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/structured-data";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Asana Task Calendar | Transform Tasks into Visual Timeline",
  description: "Transform your Asana project exports into beautiful, interactive calendars. Visualize deadlines, track progress, and plan your work like never before. Free and easy to use.",
  keywords: [
    "Asana",
    "calendar",
    "task management", 
    "project visualization",
    "task calendar",
    "Asana export",
    "timeline view",
    "project planning",
    "task visualization",
    "productivity tools"
  ],
  authors: [{ name: "Asana Task Calendar Team" }],
  creator: "Asana Task Calendar",
  publisher: "Asana Task Calendar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://asana-task-calendar.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: "Asana Task Calendar | Transform Tasks into Visual Timeline",
    description: "Transform your Asana project exports into beautiful, interactive calendars. Visualize deadlines, track progress, and plan your work like never before. Free and easy to use.",
    siteName: "Asana Task Calendar",
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Asana Task Calendar - Transform your tasks into beautiful calendar views',
        type: 'image/png',
      },
      {
        url: '/api/og?size=square',
        width: 600,
        height: 600,
        alt: 'Asana Task Calendar Logo',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Asana Task Calendar | Transform Tasks into Visual Timeline",
    description: "Transform your Asana project exports into beautiful, interactive calendars. Visualize deadlines, track progress, and plan your work like never before.",
    images: ['/api/og'],
    creator: '@asana_calendar',
    site: '@asana_calendar',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification tokens when available
    // google: 'your-google-verification-token',
    // yandex: 'your-yandex-verification-token',
    // bing: 'your-bing-verification-token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
