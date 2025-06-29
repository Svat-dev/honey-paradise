import { Settings } from "@/components/screens/_settings/Settings";
import type { TSearchParams } from "@/shared/types";
import type { NextPage } from "next";

interface IProps {
	searchParams: TSearchParams;
}

const SettingsPage: NextPage<IProps> = props => {
	return <Settings />;
};

export default SettingsPage;
