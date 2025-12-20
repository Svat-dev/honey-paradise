import { useEffect, useState } from "react";

import { errorCatch } from "@/api/api-helper";
import { useDeleteReviewS } from "@/services/hooks/products";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useDeleteReviewToaster = (setNotDeleted: VoidFunction, removeToast: VoidFunction, reviewId: string) => {
	const { deleteReviewAsync } = useDeleteReviewS();
	const [timer, setTimer] = useState<number>(10);

	const cancelDeleting = () => {
		setTimer(10);
		setNotDeleted();
		removeToast();
	};

	const handleDeleteReview = async () => {
		try {
			await deleteReviewAsync(reviewId);
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);
			toast.error(errMsg);
		} finally {
			removeToast();
		}
	};

	const agreeWithDeleting = () => setTimer(0);

	useEffect(() => {
		if (timer <= -1) {
			handleDeleteReview();
			return;
		}

		const timeout = setTimeout(() => {
			setTimer(prev => prev - 0.5);
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [timer]);

	const progressWidth = (timer / 10) * 100;

	return {
		cancelDeleting,
		progressWidth,
		agreeWithDeleting,
	};
};
