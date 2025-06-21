import type { Metadata, NextPage } from "next";

import { PasswordRecovery } from "@/components/screens/_password-recovery/PasswordRecovery";
import type { TSearchParams } from "@/shared/types";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {
	searchParams: Promise<TSearchParams>;
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.password-recovery");

	return {
		...(await getMetadata({
			title: t("title"),
			description: t("description", { title: t("title") }),
		})),
	};
}

const PasswordRecoveryPage: NextPage<IProps> = async props => {
	const searchParams = await props.searchParams;

	return <PasswordRecovery searchParams={searchParams} />;
};

export default PasswordRecoveryPage;
