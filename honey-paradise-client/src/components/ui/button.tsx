import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@utils/base";
import { Loader2Icon } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
	"tw-relative tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-transition-all tw-will-change-auto focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none",
	{
		variants: {
			variant: {
				default: "tw-bg-primary tw-text-primary-foreground tw-shadow hover:tw-bg-primary/90",
				outline: "tw-border tw-border-input tw-bg-background tw-shadow-sm hover:tw-bg-accent",
				secondary: "tw-bg-secondary tw-text-secondary-foreground tw-shadow-sm hover:tw-bg-secondary/80", // тут закончил
				ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground",
				link: "tw-text-primary tw-underline-offset-4 hover:tw-underline",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, asChild = false, isLoading, children, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp className={cn(buttonVariants({ variant, className }))} type="button" ref={ref} disabled={isLoading || props.disabled} {...props}>
			{!isLoading ? children : <Loader2Icon className="tw-w-5 tw-h-5 tw-animate-spin" />}
		</Comp>
	);
});
Button.displayName = "Button";

export { Button, buttonVariants };
