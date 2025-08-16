export interface ISelectContextState {
	isSelectMode: boolean;
	selectedIds: string[];
}

export interface INotificationContext extends IActions {
	isSelectMode: boolean;
	selectedIds: string[];
}

interface IActions {
	addSelectedId: (id: string) => void;
	removeSelectedId: (id: string) => void;
	setSelectMode: (id: string) => void;
	cancelSelectMode: () => void;
}
