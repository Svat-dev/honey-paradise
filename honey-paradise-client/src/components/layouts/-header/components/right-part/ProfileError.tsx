import { errorCatch } from "@/api/api-helper";
import { AxiosError } from "axios";
import type { FC } from "react";

interface IProfileError {
	error: AxiosError;
}

const ProfileError: FC<IProfileError> = ({ error }) => {
	const { errMsg } = errorCatch(error);

	return <p>{errMsg}</p>;
};

export { ProfileError };
