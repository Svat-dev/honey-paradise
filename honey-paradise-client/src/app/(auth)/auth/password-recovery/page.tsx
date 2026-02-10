import { getMetadata } from "@utils/base"
import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { PasswordRecovery } from "@/components/screens/_password-recovery/PasswordRecovery"
import type { TSearchParams } from "@/shared/types"

interface IProps {
	searchParams: Promise<TSearchParams>
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.password-recovery")

	return {
		...(await getMetadata({
			title: t("title"),
			description: "",
			index: false
		}))
	}
}

const PasswordRecoveryPage: NextPage<IProps> = async props => {
	const searchParams = await props.searchParams

	return <PasswordRecovery searchParams={searchParams} />
}

export default PasswordRecoveryPage
