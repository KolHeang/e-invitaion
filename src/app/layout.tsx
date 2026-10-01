import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍ | គល់ ហាង & ស៊ាប សៀកលាង',
  description: 'លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍ឌីជីថល (E-Invitation) គល់ ហាង & ស៊ាប សៀកលាង ថ្ងៃទី២៨ ខែវិច្ឆិកា ឆ្នាំ២០២៧',
  manifest: '/manifest.json',
  icons: {
    icon: '/assets/images/icon-512.jpg',
    apple: '/assets/images/icon-512.jpg',
  },
  openGraph: {
    title: 'លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍ | គល់ ហាង & ស៊ាប សៀកលាង',
    description: 'សូមគោរពអញ្ជើញចូលរួមពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ',
    images: ['/assets/images/couple-hero.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#8b152b',
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
      <body>{children}</body>
    </html>
  );
}
