import { Toaster } from "@/components/ui/sonner";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}
