import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/common";
import type { FC, PropsWithChildren } from "react";

import { FormInput } from "@/components/ui/components/form-input";
import { VALUES } from "@constants/base";
import { FormProvider } from "react-hook-form";
import { useChangePasswordModal } from "../../../hooks/useSecuritySection";

interface IProps extends PropsWithChildren {}

const ChangePasswordModal: FC<IProps> = ({ children }) => {
	const { form, isOpen, isPasswordUpdating, onSubmit, setIsOpen } = useChangePasswordModal();

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<FormProvider {...form}>
					<form onSubmit={onSubmit}>
						<DialogHeader className="tw-mb-7">
							<DialogTitle>{"Изменение пароля"}</DialogTitle>

							<DialogDescription className="tw-ml-1">
								{"Поменяйте свой пароль на какой пожелаете, если у вас включена 2fa после смены вам нужно будет войти в аккаунт снова"}
							</DialogDescription>
						</DialogHeader>

						<FormInput
							name="password"
							type="password"
							placeholder="••••••••••"
							label="Введите новый пароль"
							tabIndex={1}
							disabled={isPasswordUpdating}
							containerClassName="tw-mb-12"
							maxLength={VALUES.MAX_PASSWORD_LENGTH}
							required
						/>

						<FormInput
							name="confirmPassword"
							type="password"
							placeholder="••••••••••"
							label="Подтвердите новый пароль"
							tabIndex={2}
							disabled={isPasswordUpdating}
							containerClassName="tw-mb-10"
							maxLength={VALUES.MAX_PASSWORD_LENGTH}
							required
						/>

						<DialogFooter>
							<Button
								variant="secondary"
								type="submit"
								tabIndex={3}
								className="tw-py-1.5 tw-px-2 tw-border tw-border-muted"
								isLoading={isPasswordUpdating}
							>
								{"Сохранить изменения"}
							</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};

export { ChangePasswordModal };

