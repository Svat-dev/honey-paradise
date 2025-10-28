import { orderService } from "@/services/order.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import type { CreateOrderResponse } from "@/shared/types/server";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateOrderS = () => {
  const client = useQueryClient();

  const onSuccess = (data: CreateOrderResponse) => {
    toast.success(`Order ${data.orderId} on ${data.totalAmount} USD created successfully!`);
    client.refetchQueries({ queryKey: [queryKeys.getMyCart] });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [queryKeys.createOrder],
    mutationFn: () => orderService.create(),
    onSuccess: ({ data }) => onSuccess(data),
  });

  return {
    createOrder: mutateAsync,
    isCreatingOrder: isPending,
  };
};
