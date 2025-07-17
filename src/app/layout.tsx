import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Petakan.ai | Simulasikan Strategi Bisnismu',
  description: 'Gunakan AI untuk memvalidasi ide, merencanakan keuangan, dan menyusun strategi aksi yang solid untuk pasar e-commerce Indonesia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>{children}</body>
    </html>
  );
}
