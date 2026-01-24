import { useSessions } from "@hooks/auth"
import { RefreshCcwIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/common"

import styles from "../../../styles/devices.module.scss"

import { SessionItem } from "./SessionItem"
import { SessionsLoading } from "./SessionsLoading"

const DevicesSettings = () => {
	const t = useTranslations("global.settings.content.devices")
	const {
		sessions,
		currentSession,
		removeSession,
		removeAllSessions,
		isSessionLoading,
		sessionsRefetch
	} = useSessions()

	const disabled = sessions?.length === 1 || isSessionLoading

	return (
		<div className={styles["wrapper"]}>
			{isSessionLoading ? (
				<SessionsLoading amount={3} />
			) : sessions?.length === 1 && currentSession ? (
				<SessionItem
					metadata={currentSession?.metadata}
					createdAt={currentSession?.createdAt}
					remove={removeSession}
					sid={currentSession?.id}
					isCurrent={true}
				/>
			) : (
				sessions?.map(session => (
					<SessionItem
						key={session.id}
						metadata={session?.metadata}
						createdAt={session?.createdAt}
						remove={removeSession}
						sid={session?.id}
						isCurrent={session?.id === currentSession?.id}
					/>
				))
			)}

			<div>
				<Button
					variant="ghost"
					onClick={() => sessionsRefetch()}
					disabled={isSessionLoading}
				>
					<RefreshCcwIcon size={24} />
				</Button>

				<Button
					variant="destructive"
					title={t("labels.removeAllBtn")}
					onClick={removeAllSessions}
					disabled={disabled}
					isLoading={isSessionLoading}
				>
					{t("content.removeAll")}
				</Button>
			</div>
		</div>
	)
}

export { DevicesSettings }
