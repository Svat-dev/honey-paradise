"use client";

import { useAuth } from "@hooks/auth";
import { AuthOffBlock } from "./AuthOffBlock";
import { AuthOnBlock } from "./AuthOnBlock";

const RightPart = () => {
	const { isAuthenticated } = useAuth();

	return <div className="tw-flex tw-items-center">{isAuthenticated ? <AuthOnBlock /> : <AuthOffBlock />}</div>;
};

export { RightPart };
