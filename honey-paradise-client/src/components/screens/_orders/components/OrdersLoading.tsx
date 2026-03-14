const OrdersLoading = () => {
	return (
		<>
			{["a", "b", "c", "d", "e"].map(key => (
				<span key={key}>Loading...</span>
			))}
		</>
	)
}

export { OrdersLoading }
