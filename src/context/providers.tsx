import { Toaster } from "@/components/ui/toaster";
import { IpProvider } from "@/context/ip-context";
import { ThemeProvider } from "@/context/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <IpProvider>
        {children}
        <Toaster />
      </IpProvider>
    </ThemeProvider>
  );
}
