import type { NextPage } from "next";
import { SignUp } from "@/components/screens/_sign-up/SignUp";

interface IProps {
	params: {};
}

const SignUpPage: NextPage<IProps> = () => {
	return <SignUp />;
};

export default SignUpPage;
