import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-colorful hover:shadow-glow transform hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg transform hover:scale-105",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50 transform hover:scale-105",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md transform hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground transform hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark",
        creative: "bg-gradient-creative text-white hover:animate-color-shift shadow-creative transform hover:scale-105 hover:shadow-glow",
        gradient: "bg-gradient-primary text-white hover:bg-gradient-sunset shadow-colorful transform hover:scale-105 hover:shadow-glow",
        orange: "bg-creative-orange text-creative-orange-foreground hover:bg-creative-orange/90 shadow-creative transform hover:scale-105",
        magenta: "bg-creative-magenta text-creative-magenta-foreground hover:bg-creative-magenta/90 shadow-creative transform hover:scale-105",
        cyan: "bg-creative-cyan text-creative-cyan-foreground hover:bg-creative-cyan/90 shadow-creative transform hover:scale-105",
        yellow: "bg-creative-yellow text-creative-yellow-foreground hover:bg-creative-yellow/90 shadow-creative transform hover:scale-105",
        green: "bg-creative-green text-creative-green-foreground hover:bg-creative-green/90 shadow-creative transform hover:scale-105",
        purple: "bg-creative-purple text-creative-purple-foreground hover:bg-creative-purple/90 shadow-creative transform hover:scale-105",
        glow: "bg-primary text-primary-foreground animate-glow hover:animate-bounce-in shadow-glow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
