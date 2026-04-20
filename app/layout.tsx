import type {Metadata} from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export async function generateMetadata(): Promise<Metadata> {
  const ROOT_URL = process.env.APP_URL || process.env.NEXT_PUBLIC_URL || 'https://ais-dev-jizc73tbiysxecwbdlq4e2-615601803900.asia-southeast1.run.app';
  
  return {
    title: 'PulseNode | Farcaster Monitor',
    description: 'Decentralized social monitoring node with professional precision.',
    other: {
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: `${ROOT_URL}/hero.png`,
        button: {
          title: 'Launch PulseNode',
          action: {
            type: 'launch_miniapp',
            name: 'PulseNode',
            url: ROOT_URL,
            splashImageUrl: `${ROOT_URL}/splash.png`,
            splashBackgroundColor: '#0f172a', // slate-900
          },
        },
      }),
    },
  };
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-slate-50 text-slate-900 antialiased font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
