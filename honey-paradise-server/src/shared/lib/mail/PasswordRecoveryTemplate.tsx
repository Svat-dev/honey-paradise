import * as React from "react";

import { Body, Heading, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components";

import type { SessionMetadata } from "src/shared/types/session-metadata.type";

type Props = {
	link: string;
	email: string;
	username: string;
	metadata: SessionMetadata;
	t: any;
};

const PasswordRecoveryTemplate: React.FC<Props> = ({ link, t, username, metadata, email }) => {
	return (
		<Html>
			<Preview>Сброс пароля</Preview>
			<Tailwind>
				<Body className="max-w-2xl mx-auto p-6 bg-[#fffcdf]">
					<Section className="text-center mb-8">
						<Heading className="text-3xl text-black font-bold">Сброс пароля</Heading>

						<Text className="text-black text-base mt-2">Здравствуйте, {username}!</Text>
						<Text className="text-black text-base mt-2">Вы запросили сброс пароля для вашей учетной записи.</Text>
						<Text className="text-black text-base mt-2">Чтобы создать новый пароль, нажмите на ссылку ниже:</Text>
						<Link href={link} className="inline-flex justify-center items-center rounded-full text-sm font-medium text-black px-5 py-2">
							Сбросить пароль
						</Link>
					</Section>

					<Section className="rounded-lg p-6 mb-6">
						<Heading className="text-xl font-semibold">Информация о запросе:</Heading>

						<ul className="list-disc list-inside text-black mt-2">
							<li>
								🌍 Расположение: {metadata.location.country}, {metadata.location.city}
							</li>
							<li>📱 Операционная система: {metadata.device.os}</li>
							<li>🌐 Браузер: {metadata.device.browser}</li>
							<li>💻 IP-адрес: {metadata.ip}</li>
						</ul>

						<Text className="text-gray-600 mt-2">Если вы не инициировали этот запрос, пожалуйста, игнорируйте это сообщение.</Text>
					</Section>

					<Section className="text-center mt-8">
						<Text className="text-gray-600">
							Если у вас есть вопросы или вы столкнулись с трудностями, не стесняйтесь обращаться в нашу службу поддержки по адресу{" "}
							<Link href={`mailto:${email}`} className="text-black underline">
								{email}
							</Link>
							.
						</Text>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	);
};

export { PasswordRecoveryTemplate };
