import * as React from "react";

import { Body, Heading, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components";

import type { SessionMetadata } from "src/shared/types/session-metadata.type";

type Props = {
	token: string;
	email: string;
	username: string;
	metadata: SessionMetadata;
	t: any;
};

const TFAAuthTemplate: React.FC<Props> = ({ token, t, username, metadata, email }) => {
	return (
		<Html>
			<Preview>Двухфакторная аутентификация</Preview>
			<Tailwind>
				<Body className="max-w-2xl mx-auto p-6 bg-[#fffcdf]">
					<Section className="text-center mb-8">
						<Heading className="text-3xl text-black font-bold">Подтверждение входа</Heading>

						<Text className="text-black text-base mt-2">Здравствуйте, {username},</Text>
						<Text className="text-black text-base mt-2">Кто-то пытается войти на ваш аккаунт с нового устройства!</Text>
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

						<Text className="text-gray-600 mt-2">
							Если вы не инициировали этот запрос, пожалуйста, игнорируйте это сообщение, также вам следует сменить пароль, чтобы повысить
							безопасность
						</Text>
					</Section>

					<Section>
						<Text>Чтобы выполнить вход, введите следующий код:</Text>
						<div className="shadow-md border border-black rounded-md">
							<Text>{token}</Text>
						</div>
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

export { TFAAuthTemplate };
