import type { NextPage } from "next";
import { SignIn } from "@/components/screens/_sign-in/SignIn";

interface IProps {
	params: {};
}

const SignInPage: NextPage<IProps> = () => {
	return <SignIn />;
};

export default SignInPage;
