import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@utils/base";
import { forwardRef, type HTMLAttributes } from "react";
import { Title } from "./title";

const alertVariants = cva(
	"tw-relative tw-w-full tw-rounded-lg tw-border tw-border-muted tw-px-4 tw-py-3 tw-text-sm [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-black [&>svg~*]:tw-pl-9",
	{
		variants: {
			variant: {
				default: "tw-bg-secondary tw-text-black",
				destructive: "tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

const Alert = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
	({ className, variant, ...props }, ref) => <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
);
Alert.displayName = "Alert";

const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
	<Title size="xs" className={cn("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("tw-text-sm [&_p]:tw-leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
