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
	const { form, isOpen, isPasswordUpdating, onSubmit, setIsOpen, t } = useChangePasswordModal();

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<FormProvider {...form}>
					<form onSubmit={onSubmit}>
						<DialogHeader className="mb-7">
							<DialogTitle>{t("security.changePasswordModal.title")}</DialogTitle>

							<DialogDescription className="ml-1">{t("security.changePasswordModal.description")}</DialogDescription>
						</DialogHeader>

						<FormInput
							name="password"
							type="password"
							placeholder="••••••••••"
							label={t("security.changePasswordModal.placeholders.new")}
							tabIndex={1}
							disabled={isPasswordUpdating}
							containerClassName="mb-12"
							maxLength={VALUES.MAX_PASSWORD_LENGTH}
							required
						/>

						<FormInput
							name="confirmPassword"
							type="password"
							placeholder="••••••••••"
							label={t("security.changePasswordModal.placeholders.confirmNew")}
							tabIndex={2}
							disabled={isPasswordUpdating}
							containerClassName="mb-10"
							maxLength={VALUES.MAX_PASSWORD_LENGTH}
							required
						/>

						<DialogFooter>
							<Button
								variant="secondary"
								type="submit"
								title={t("labels.changePasswordBtn")}
								tabIndex={3}
								className="py-1.5 px-2 border border-muted"
								isLoading={isPasswordUpdating}
							>
								{t("security.changePasswordModal.confirmBtn")}
							</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};

export { ChangePasswordModal };
