"use client";

import { LogOutIcon } from "lucide-react";

const LogoutButton = () => {
	return (
		<button
			type="button"
			className="tw-text-red-600 tw-font-medium tw-flex tw-gap-1 tw-items-center tw-transition-transform hover:tw-translate-x-2 tw-p-1"
		>
			<LogOutIcon size={20} strokeWidth={3} />
			<p>Выйти</p>
		</button>
	);
};

export { LogoutButton };
