import { useSessions } from "@hooks/auth";
import styles from "../../../styles/devices.module.scss";
import { SessionItem } from "./SessionItem";
import { SessionsLoading } from "./SessionsLoading";

const DevicesSettings = () => {
	const { sessions, currentSession, removeSession, isSessionLoading } = useSessions();

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
		</div>
	);
};

export { DevicesSettings };
