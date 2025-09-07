import type { Metadata, NextPage } from "next";

import { Confirmation } from "@/components/screens/_confirmation/Confirmation";
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

	return {
		...(await getMetadata({
			title,
			description: "",
			index: false,
		})),
		...NO_INDEX_PAGE,
	};
}

const ConfirmationPage: NextPage<IProps> = async props => {
	const searchParams = await props.searchParams;

	return <Confirmation searchParams={searchParams} />;
};

export default ConfirmationPage;
