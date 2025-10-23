import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@utils/base";
import { forwardRef, type HTMLAttributes } from "react";
import { Title } from "./title";

const alertVariants = cva(
	"relative w-full rounded-lg border border-muted px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-black [&>svg~*]:pl-9",
	{
		variants: {
			variant: {
				default: "bg-secondary text-black",
				destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
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
	<Title size="xs" className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
