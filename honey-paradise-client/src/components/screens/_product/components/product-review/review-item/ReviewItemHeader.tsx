import { Avatar, AvatarFallback, AvatarFrame, AvatarImage, Button } from "@/components/ui/common";
import { getAvatarPath, getFramesPath } from "@/shared/lib/utils";

import type { GetReviewsByPidResponseUser } from "@/shared/types/server";
import { format } from "date-fns";
import { InfoIcon } from "lucide-react";
import type { FC } from "react";

interface IReviewItemHeader {
	user: GetReviewsByPidResponseUser;
	createdAt: string;
}

const ReviewItemHeader: FC<IReviewItemHeader> = ({ createdAt, user }) => {
	return (
		<header className="flex items-center justify-between mb-4">
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarImage src={getAvatarPath(user.avatarPath)} alt={"Avatar"} width={40} height={40} loading="lazy" />

					{user?.framePath && <AvatarFrame src={getFramesPath(user.framePath)} alt="" loading="lazy" />}

					<AvatarFallback>{user.username.split("")[0]}</AvatarFallback>
				</Avatar>

				<span>{user.username}</span>
			</div>

			<div className="flex items-center gap-2 text-muted">
				<span>{format(createdAt, "dd.MM.yyyy")}</span>

				<Button variant="ghost">
					<InfoIcon size={20} />
				</Button>
			</div>
		</header>
	);
};

export { ReviewItemHeader };
