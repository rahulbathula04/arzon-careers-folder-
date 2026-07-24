import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GlobalErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function GlobalErrorFallback({ error, resetErrorBoundary }: GlobalErrorFallbackProps) {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-3xl border border-red-500/10 bg-red-500/5 p-8 text-center glass-panel-deep">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500 ring-1 ring-red-500/20">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h3 className="mt-6 font-mono text-lg font-semibold tracking-widest text-red-500 uppercase">
        System Fault Detected
      </h3>
      <p className="mt-2 max-w-md text-sm text-red-400/80">
        We encountered a critical exception while loading this module. Our engineering team has been notified.
      </p>
      
      <div className="mt-4 max-w-lg overflow-auto rounded-lg bg-black/40 p-3 text-left border border-white/5">
        <pre className="text-xs text-red-300/60 font-mono">
          {error.message}
        </pre>
      </div>

      <Button
        onClick={resetErrorBoundary}
        variant="outline"
        className="mt-8 gap-2 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
      >
        <RefreshCcw className="h-4 w-4" />
        Attempt Recovery
      </Button>
    </div>
  );
}
