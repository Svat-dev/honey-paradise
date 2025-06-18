"use client";

import { format, toDate } from "date-fns";
import { useGetByUserS, useGetCurrentS, useRemoveSessionS } from "@/services/hooks/session";

import { useAuth } from "@hooks/auth";
import { useLanguage } from "@i18n/hooks";

const Index = () => {
	useLanguage();
	const { isAuthenticated } = useAuth();

	const { currentSession } = useGetCurrentS();
	const { sessions, sessionsRefetch } = useGetByUserS();
	const { removeSession } = useRemoveSessionS();

	const getTime = (date: Date) => {
		const now = new Date().getTime();
		const diff = now - date.getTime();

		return Math.floor(diff / 60000);
	};

	return (
		<>
			{isAuthenticated ? (
				sessions?.data.length === 1 ? (
					<div>
						<ul>
							<li className="tw-font-bold">Устройство</li>
							<li>Браузер: {currentSession?.data.metadata.device.browser}</li>
							<li>Операционная система: {currentSession?.data.metadata.device.os}</li>
							<li>IP-адрес: {currentSession?.data.metadata.ip}</li>

							<li className="tw-font-bold">Местоположение</li>
							<li>Город: {currentSession?.data.metadata.location.city}</li>
							<li>Страна: {currentSession?.data.metadata.location.country}</li>
							<li>
								Широта: {currentSession?.data.metadata.location.latidute} | Долгота: {currentSession?.data.metadata.location.longitude}
							</li>

							<li className="tw-font-bold">Прочее</li>
							<li>Время входа: {format(toDate(currentSession?.data.createdAt as string), "dd/MM/yyyy hh:mm:ss")}</li>
							<li>Продолжительность: {getTime(toDate(currentSession?.data.createdAt as string))} минут</li>
							<li>Идентификатор сессии: {currentSession?.data.id}</li>
							<li>Пользователь: {currentSession?.data.userId}</li>
						</ul>
					</div>
				) : (
					sessions?.data.map(session => (
						<div key={session.id}>
							<ul>
								<li className="tw-font-bold">Устройство</li>
								<li>Браузер: {session.metadata.device.browser}</li>
								<li>Операционная система: {session.metadata.device.os}</li>
								<li>IP-адрес: {session.metadata.ip}</li>

								<li className="tw-font-bold">Местоположение</li>
								<li>Город: {session.metadata.location.city}</li>
								<li>Страна: {session.metadata.location.country}</li>
								<li>
									Широта: {session.metadata.location.latidute} | Долгота: {session.metadata.location.longitude}
								</li>

								<li className="tw-font-bold">Прочее</li>
								<li>Время входа: {session.createdAt}</li>
								<li>Продолжительность: {getTime(toDate(session.createdAt as string))} минут</li>
								<li>Идентификатор сессии: {session.id}</li>
								<li>Пользователь: {session.userId}</li>
							</ul>

							<button
								onClick={() => {
									removeSession(session.id);
									sessionsRefetch();
								}}
							>
								УДАЛИТЬ
							</button>
						</div>
					))
				)
			) : (
				<>
					<p>Авторизуйтесь</p>
				</>
			)}
		</>
	);
};

export { Index };
