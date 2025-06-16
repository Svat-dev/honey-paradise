import * as React from "react";

import { Body, Heading, Html, Tailwind, Text } from "@react-email/components";

type Props = {
	token: string;
	t: any;
};

const EmailConfirmationTemplate: React.FC<Props> = ({ token, t }) => {
	return (
		<Tailwind>
			<Html>
				<Body className="bg-[#fffcdf]">
					<Heading>{t.heading}</Heading>

					<Text className="">{t.greeting}</Text>
					<Text>
						{t.code}&nbsp;<b className="tracking-wider">{token}</b>
					</Text>
					<Text>{t.codeLifetime}</Text>

					<Text>{t.farewell}</Text>
					<Text className="text-sm text-[#4d4d4d]">{t.noReply}</Text>
				</Body>
			</Html>
		</Tailwind>
	);
};

export { EmailConfirmationTemplate };
