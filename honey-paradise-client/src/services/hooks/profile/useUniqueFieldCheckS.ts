import { profileService } from "@/services/profile.service";
import { useMutation } from "@tanstack/react-query";

interface IDto {
	fieldValue: string | undefined;
	field: "email" | "username" | "phone";
}

export const useUniqueFieldCheckS = () => {
	const { mutate, mutateAsync, isPending, data } = useMutation({
		mutationKey: ["unique field check"],
		mutationFn: (dto: IDto) => profileService.uniqueFieldCheck(dto.fieldValue, dto.field),
	});

	return {
		checkFieldUnique: mutate,
		checkFieldUniqueAsync: mutateAsync,
		isCheckingUnique: isPending,
		isFieldUnique: data?.data,
	};
};
