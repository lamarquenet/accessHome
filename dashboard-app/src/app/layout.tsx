import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { SideNav } from "../components/SideNav";
import { useTheme } from "../hooks/useTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "A simple dashboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define styles for the body
  const bodyStyles = {
    fontFamily: 'var(--font-geist-sans)',
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
    transition: 'background-color 200ms ease-in-out, color 200ms ease-in-out',
  };

  // Define styles for the layout container
  const layoutContainerStyles = {
    display: 'flex',
    minHeight: '100vh',
  };

  // Define styles for the sidebar
  const sidebarStyles = {
    width: '16rem', // w-64
    flexShrink: 0 as const, // flex-shrink-0
  };

  // Define styles for the main content
  const mainContentStyles = {
    flexGrow: 1, // flex-1
    padding: '1.5rem', // p-6
  };

  // Ensure no whitespace between tags for hydration
  return (
    <html lang="en" suppressHydrationWarning>{/*
   */}<head>
        {/* Basic head elements can be added here if needed */}
      </head>{/*
   */}<body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={bodyStyles}
      >
        <ThemeProvider>
          <div style={layoutContainerStyles}>
            {/* Left Sidebar Area */}
            <aside style={sidebarStyles}>
              <SideNav />
            </aside>

            {/* Main Content Area */}
            <main style={mainContentStyles}>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>{/*
*/ }</html>
  );
}
