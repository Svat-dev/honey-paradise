"use client";

import { Title } from "@/components/ui/common";
import { useGetMyOrdersS } from "@/services/hooks/order/useGetMyOrdersS";

const Orders = () => {
	const { orders, isOrdersLoading } = useGetMyOrdersS();

	return (
		<article>
			{isOrdersLoading ? (
				<p>Loading...</p>
			) : (
				orders?.map(item => (
					<div key={item.id}>
						<Title size="md">Order {item.id}</Title>
						<p>
							{item.items.length} on price {item.totalAmount}
						</p>
						<p>Status: {item.status}</p>
					</div>
				))
			)}
		</article>
	);
};

export { Orders };
