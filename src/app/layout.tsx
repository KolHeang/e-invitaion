import type { Metadata, Viewport } from 'next';
import './globals.css';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import PwaInstallPrompt from '@/components/PwaInstallPrompt';

export const metadata: Metadata = {
  title: 'លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍ | គល់ ហាង & ស៊ាប សៀកលាង',
  description: 'លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍បែបឌីជីថល (E-Invitation) គល់ ហាង & ស៊ាប សៀកលាង ថ្ងៃទី២៨ ខែវិច្ឆិកា ឆ្នាំ២០២៦',
  manifest: '/manifest.json',
  icons: {
    icon: '/assets/images/icon-512.jpg',
    apple: '/assets/images/icon-512.jpg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'គល់ ហាង & ស៊ាប សៀកលាង',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍ | គល់ ហាង & ស៊ាប សៀកលាង',
    description: 'សូមគោរពអញ្ជើញចូលរួមពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ',
    images: ['/assets/images/couple-hero.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#C59A27',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="km">
      <head>
        <link rel="apple-touch-icon" href="/assets/images/icon-512.jpg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#C59A27" />
      </head>
      <body>
        <ServiceWorkerRegister />
        <PwaInstallPrompt />
        {children}
      </body>
    </html>
  );
}
