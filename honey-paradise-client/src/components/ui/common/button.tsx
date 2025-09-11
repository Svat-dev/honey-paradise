import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@utils/base";
import { Loader2Icon } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { Link } from "./link";
import styles from "./styles/button.module.scss";

const buttonVariants = cva(styles["button-ui"], {
	variants: {
		variant: {
			default: styles["button-ui-default"],
			outline: styles["button-ui-outline"],
			secondary: styles["button-ui-secondary"],
			ghost: styles["button-ui-ghost"],
			link: styles["button-ui-link"],
			destructive: styles["button-ui-destructive"],
			"destructive-outline": styles["button-ui-destructive-outline"],
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	href?: string;
	isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, asChild = false, isLoading, children, href, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";

		return (
			<Comp
				className={cn(buttonVariants({ variant, className }))}
				type="button"
				ref={ref}
				disabled={isLoading || props.disabled}
				{...props}
				data-loading={isLoading}
			>
				{!isLoading ? href ? <Link href={href}>{children}</Link> : children : <Loader2Icon className={styles["button-ui-loader"]} />}
			</Comp>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
