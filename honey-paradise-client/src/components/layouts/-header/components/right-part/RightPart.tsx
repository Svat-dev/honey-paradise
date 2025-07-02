"use client";

import { useAuth } from "@hooks/auth";
import type { FC } from "react";
import { AuthOffBlock } from "./AuthOffBlock";
import { AuthOnBlock } from "./AuthOnBlock";

interface IProps {
	isAuth: boolean;
}

const RightPart: FC<IProps> = ({ isAuth }) => {
	const { isAuthenticated } = useAuth(isAuth);

	return <div className="tw-flex tw-items-center">{isAuthenticated ? <AuthOnBlock /> : <AuthOffBlock />}</div>;
};

export { RightPart };
