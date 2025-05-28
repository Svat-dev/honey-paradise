import { useEffect, useState } from "react";

import type { ITimeout } from "../types/show-description.type";

export const useShowDescription = () => {
	const [timeouts, setTimeouts] = useState<ITimeout>({
		id_1: null,
		id_2: null,
	});

	const [isShowed, setIsShowed] = useState<boolean>(false);

	const DELAY_1 = 1000;
	const DELAY_2 = 300;

	const handleMouseEnter = () => {
		const id = setTimeout(() => setIsShowed(true), DELAY_1);

		if (timeouts.id_1) clearTimeout(timeouts.id_1);
		return setTimeouts(t => ({ ...t, id_1: id }));
	};

	const handleMouseLeave = () => {
		if (isShowed) {
			const id = setTimeout(() => setIsShowed(false), DELAY_2);
			return setTimeouts(t => ({ ...t, id_2: id }));
		}
		if (timeouts.id_1) return clearTimeout(timeouts.id_1);
	};

	useEffect(() => {
		return () => {
			if (timeouts.id_1) clearTimeout(timeouts.id_1);
			if (timeouts.id_2) return clearTimeout(timeouts.id_2);
		};
	}, [timeouts.id_1, timeouts.id_2]);

	return { isShowed, handleMouseEnter, handleMouseLeave };
};
