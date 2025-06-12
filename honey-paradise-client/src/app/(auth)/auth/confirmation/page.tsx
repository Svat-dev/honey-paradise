import type { Metadata, NextPage } from "next";

import type { TSearchParams } from "@/shared/types";
import { NO_INDEX_PAGE } from "@constants/base";
import { EnumConfirmationTypes } from "@constants/routes";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {
	searchParams: Promise<TSearchParams>;
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
	const t = await getTranslations("global.confirmation");
	const type = (await props.searchParams).type;

	const title = type === EnumConfirmationTypes.SIGN_IN ? t("title.2fa") : type === EnumConfirmationTypes.EMAIL ? t("title.email") : "";

	const description =
		type === EnumConfirmationTypes.SIGN_IN ? t("title.2fa") : type === EnumConfirmationTypes.EMAIL ? t("title.email") : "";

	return {
		...(await getMetadata({
			title,
			description,
		})),
		...NO_INDEX_PAGE,
	};
}

const ConfirmationPage: NextPage<IProps> = async props => {
	const searchParams = await props.searchParams;

	return <div></div>;
};

export default ConfirmationPage;
