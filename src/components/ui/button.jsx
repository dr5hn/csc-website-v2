import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

// Pill buttons from the Stacked Atlas style tile. One primary (deep blue) per view;
// everything else is outline, field or a text link. Lime is never a button colour.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium no-underline transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: "bg-blue font-semibold text-white hover:bg-blue-deep hover:text-white",
        outline: "bg-white text-ink ring-1 ring-inset ring-edge hover:text-ink hover:ring-blue",
        field: "bg-field text-ink hover:text-ink",
        white: "bg-white text-ink hover:text-ink",
        ink: "bg-ink font-semibold text-white hover:bg-ink/90 hover:text-white",
        ghost: "text-ink-code hover:bg-field hover:text-ink-code",
        link: "text-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "px-[22px] py-[14px] text-base",
        lg: "px-[26px] py-4 text-[17px]",
        sm: "px-[18px] py-[11px] text-[15px]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    (<Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />)
  );
}

export { Button, buttonVariants }
