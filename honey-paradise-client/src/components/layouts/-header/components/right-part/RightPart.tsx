import { useProfile } from "@hooks/auth";
import { AuthOffBlock } from "./AuthOffBlock";
import { AuthOnBlock } from "./AuthOnBlock";

const RightPart = () => {
	const { IS_AUTHORIZED } = useProfile();

	return <div className="tw-flex tw-items-center">{IS_AUTHORIZED ? <AuthOnBlock /> : <AuthOffBlock />}</div>;
};

export { RightPart };
