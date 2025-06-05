"use client";

import { Button, Separator } from "@/components/ui";
import { LanguagesIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SelectLanguageDM } from "../SelectLanguageDM";
import styles from "./../../styles/right-part.module.scss";

import { EnumAppRoute } from "@constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthOffBlock = () => {
	const t = useTranslations("layout.header");
	const pathname = usePathname();

	const isSignUpPage = pathname === EnumAppRoute.SIGN_UP;
	const isSignInPage = pathname === EnumAppRoute.SIGN_IN;
	const isAuthPage = isSignUpPage || isSignInPage;

	return (
		<>
			<SelectLanguageDM>
				<Button className={styles["change-lang-btn"]} title={t("labels.changeLang")}>
					<LanguagesIcon />
				</Button>
			</SelectLanguageDM>

			<div className="tw-flex tw-items-center">
				{!isSignInPage && (
					<Link href={EnumAppRoute.SIGN_IN}>
						<Button variant="secondary" className={styles["auth-btn"]}>
							{t("auth.signIn")}
						</Button>
					</Link>
				)}

				{!isAuthPage && <Separator className={styles["separator"]} orientation="vertical" />}

				{!isSignUpPage && (
					<Link href={EnumAppRoute.SIGN_UP}>
						<Button variant="secondary" className={styles["auth-btn"]}>
							{t("auth.signUp")}
						</Button>
					</Link>
				)}
			</div>
		</>
	);
};

export { AuthOffBlock };
