import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type GetStartedButtonProps = ButtonProps & {
  iconSize?: number;
  iconStrokeWidth?: number;
};

export const GetStartedButton = React.forwardRef<
  HTMLButtonElement,
  GetStartedButtonProps
>((props, ref) => {
  const {
    className,
    size = "lg",
    children = "Get Started",
    iconSize = 16,
    iconStrokeWidth = 2,
    ...restProps
  } = props;

  return (
    <Button
      ref={ref}
      size="lg"
      variant="default"
      className={cn(
        "group relative overflow-hidden bg-green-600 py-6",
        className
      )}
      {...restProps}
    >
      <span className="mr-8 transition-opacity duration-300 group-hover:opacity-0">
        {children}
      </span>
      <Link
        href="/auth?mode=signup"
        className="absolute right-1 top-1 bottom-1 rounded-sm z-10 flex items-center justify-center w-1/4 transition-all duration-300 bg-primary-foreground/15 group-hover:w-[c3alc(100%-0.5rem)] group-active:scale-95"
        aria-hidden="true"
      >
        <ChevronRight size={iconSize} strokeWidth={iconStrokeWidth} />
      </Link>
    </Button>
  );
});
