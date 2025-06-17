"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@utils/base";
import { CircleIcon } from "lucide-react";
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react";

import styles from "./styles/radio-group.module.scss";

const RadioGroup = forwardRef<ComponentRef<typeof RadioGroupPrimitive.Root>, ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>>(
	({ className, ...props }, ref) => {
		return <RadioGroupPrimitive.Root className={cn(styles["radio-group-ui"], className)} {...props} ref={ref} />;
	}
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<ComponentRef<typeof RadioGroupPrimitive.Item>, ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>>(
	({ className, ...props }, ref) => {
		return (
			<RadioGroupPrimitive.Item ref={ref} className={cn(styles["radio-group-item-ui"], className)} {...props}>
				<RadioGroupPrimitive.Indicator className={styles["radio-group-item-indicator-ui"]}>
					<CircleIcon />
				</RadioGroupPrimitive.Indicator>
			</RadioGroupPrimitive.Item>
		);
	}
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
