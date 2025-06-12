"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { format, toDate } from "date-fns";

import { sessionService } from "@/services/session.service";
import { useAuth } from "@hooks/auth";
import { useLanguage } from "@i18n/hooks";

const Index = () => {
	useLanguage();
	const { isAuthenticated } = useAuth();

	const { data: data_1 } = useQuery({
		queryKey: ["get current session"],
		queryFn: () => sessionService.getCurrent(),
	});

	const { data: data_2, refetch } = useQuery({
		queryKey: ["get sessions by user"],
		queryFn: () => sessionService.getByUser(),
	});

	const { mutate } = useMutation({
		mutationKey: ["delete session"],
		mutationFn: (sid: string) => sessionService.removeSession(sid),
	});

	const currentSession = data_1?.data;
	const sessions = data_2?.data;

	const getTime = (date: Date) => {
		const now = new Date().getTime();
		const diff = now - date.getTime();

		return Math.floor(diff / 60000);
	};

	return (
		<>
			{isAuthenticated ? (
				sessions?.length === 1 ? (
					<div>
						<ul>
							<li className="tw-font-bold">Устройство</li>
							<li>Браузер: {currentSession?.metadata.device.browser}</li>
							<li>Операционная система: {currentSession?.metadata.device.os}</li>
							<li>IP-адрес: {currentSession?.metadata.ip}</li>

							<li className="tw-font-bold">Местоположение</li>
							<li>Город: {currentSession?.metadata.location.city}</li>
							<li>Страна: {currentSession?.metadata.location.country}</li>
							<li>
								Широта: {currentSession?.metadata.location.latidute} | Долгота: {currentSession?.metadata.location.longitude}
							</li>

							<li className="tw-font-bold">Прочее</li>
							<li>Время входа: {format(toDate(currentSession?.createdAt as string), "dd/MM/yyyy hh:mm:ss")}</li>
							<li>Продолжительность: {getTime(toDate(currentSession?.createdAt as string))} минут</li>
							<li>Идентификатор сессии: {currentSession?.id}</li>
							<li>Пользователь: {currentSession?.userId}</li>
						</ul>
					</div>
				) : (
					sessions?.map(session => (
						<div key={session.id}>
							<ul>
								<li className="tw-font-bold">Устройство</li>
								<li>Браузер: {session?.metadata.device.browser}</li>
								<li>Операционная система: {session?.metadata.device.os}</li>
								<li>IP-адрес: {session?.metadata.ip}</li>

								<li className="tw-font-bold">Местоположение</li>
								<li>Город: {session?.metadata.location.city}</li>
								<li>Страна: {session?.metadata.location.country}</li>
								<li>
									Широта: {session?.metadata.location.latidute} | Долгота: {session?.metadata.location.longitude}
								</li>

								<li className="tw-font-bold">Прочее</li>
								<li>Время входа: {session?.createdAt}</li>
								<li>Продолжительность: {getTime(toDate(session?.createdAt as string))} минут</li>
								<li>Идентификатор сессии: {session?.id}</li>
								<li>Пользователь: {session?.userId}</li>
							</ul>

							<button
								onClick={() => {
									mutate(session.id);
									refetch();
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
