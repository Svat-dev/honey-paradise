import { createContext, useEffect, useMemo, useState, type FC, type PropsWithChildren } from "react";
import type { INotificationContext, ISelectContextState } from "./types/notifications-context.type";

const NotificationsContext = createContext<INotificationContext>({
	isSelectMode: false,
	selectedIds: [],

	addSelectedId: () => {},
	removeSelectedId: () => {},
	setSelectMode: () => {},
	cancelSelectMode: () => {},
});

const NotificationsContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [ctx, setContext] = useState<ISelectContextState>({ isSelectMode: false, selectedIds: [] });

	const addSelectedId = (id: string) =>
		setContext(prev => {
			const newSelectedIds = prev.selectedIds;
			if (!newSelectedIds.includes(id)) newSelectedIds.push(id);
			return { ...prev, selectedIds: newSelectedIds };
		});

	const removeSelectedId = (id: string) =>
		setContext(prev => {
			if (!prev.selectedIds.includes(id)) return prev;
			return { ...prev, selectedIds: prev.selectedIds.filter(item => item !== id) };
		});

	const setSelectMode = (id: string) => {
		setContext(prev => ({ ...prev, isSelectMode: true }));
		addSelectedId(id);
	};

	const cancelSelectMode = () => setContext(prev => ({ ...prev, isSelectMode: false, selectedIds: [] }));

	const values: INotificationContext = useMemo(
		() => ({
			...ctx,
			addSelectedId,
			removeSelectedId,
			setSelectMode,
			cancelSelectMode,
		}),
		[ctx.isSelectMode, ctx.selectedIds.length]
	);

	useEffect(() => {
		if (ctx.selectedIds.length === 0) cancelSelectMode();
	}, [values.selectedIds.length]);

	return <NotificationsContext.Provider value={values}>{children}</NotificationsContext.Provider>;
};

export { NotificationsContext, NotificationsContextProvider };
