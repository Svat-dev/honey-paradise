import { useMyAccount } from "@hooks/auth";
import { AppearanceSection } from "./AppearanceSection";
import { AvatarSection } from "./avatar/AvatarSection";
import { InfoSection } from "./InfoSection";
import { TelegramSection } from "./TelegramSection";

const ProfileSettings = () => {
	const { user, isAccLoading } = useMyAccount();

	return (
		<>
			<AvatarSection avatarPath={user?.avatarPath} framePath={user?.framePath} username={user?.username} isAccLoading={isAccLoading} />

			<InfoSection
				birthdate={user?.birthdate || undefined}
				gender={user?.gender}
				phone={user?.phoneNumber || undefined}
				username={user?.username}
				isLoading={isAccLoading}
			/>

			<AppearanceSection settings={user?.settings} isAccLoading={isAccLoading} />

			<TelegramSection />
		</>
	);
};

export { ProfileSettings };
