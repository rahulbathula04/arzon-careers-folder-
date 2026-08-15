import * as React from "react";
import { Sparkles, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AiThinkingLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "inline" | "block" | "card" | "full";
  icon?: "sparkles" | "brain";
  showText?: boolean;
  iconClassName?: string;
  textClassName?: string;
}

const sizeConfig = {
  sm: { icon: "h-3.5 w-3.5", text: "text-xs" },
  md: { icon: "h-4 w-4", text: "text-sm" },
  lg: { icon: "h-6 w-6", text: "text-base" },
  xl: { icon: "h-8 w-8", text: "text-lg" },
};

export const AiThinkingLoader = React.forwardRef<HTMLDivElement, AiThinkingLoaderProps>(
  (
    {
      label = "Thinking…",
      size = "md",
      variant = "inline",
      icon = "sparkles",
      showText = true,
      className,
      iconClassName,
      textClassName,
      ...props
    },
    ref,
  ) => {
    const config = sizeConfig[size];
    const IconComp = icon === "brain" ? Brain : Sparkles;

    if (variant === "card" || variant === "full") {
      return (
        <div
          ref={ref}
          role="status"
          className={cn(
            "flex flex-col items-center justify-center gap-3 p-8 text-center",
            variant === "full" && "min-h-[300px] w-full",
            className,
          )}
          {...props}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md motion-safe:animate-pulse" />
            <div className="relative rounded-full bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
              <IconComp className={cn(config.icon, "motion-safe:animate-spin-slow", iconClassName)} />
            </div>
          </div>
          {showText && (
            <div className="flex items-center gap-1.5 font-medium text-foreground/80">
              <span className={cn(config.text, textClassName)}>{label}</span>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          "inline-flex items-center gap-2 text-muted-foreground",
          variant === "block" && "flex w-full justify-center py-4",
          className,
        )}
        {...props}
      >
        <span className="relative inline-flex items-center justify-center">
          <IconComp
            className={cn(
              config.icon,
              "text-primary motion-safe:animate-pulse shrink-0",
              iconClassName,
            )}
          />
        </span>
        {showText && <span className={cn(config.text, "font-medium", textClassName)}>{label}</span>}
      </div>
    );
  },
);

AiThinkingLoader.displayName = "AiThinkingLoader";
