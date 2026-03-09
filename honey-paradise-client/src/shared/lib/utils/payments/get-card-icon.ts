import { CreditCardIcon } from "lucide-react"

import {
	JCBCardIcon,
	MasterCardIcon,
	MirCardIcon,
	VisaIcon
} from "@/components/ui/common/icons/cards"

export function getPaymentCardIcon(type: string) {
	switch (type) {
		case "MasterCard":
			return MasterCardIcon
		case "Visa":
			return VisaIcon
		case "JCB":
			return JCBCardIcon
		case "Mir":
			return MirCardIcon
		default:
			return CreditCardIcon
	}
}
