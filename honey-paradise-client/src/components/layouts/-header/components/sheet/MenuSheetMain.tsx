import { useMenuSheetMain } from "../../hooks/useMenuSheetMain";

const MenuSheetMain = () => {
	const { data } = useMenuSheetMain();

	return (
		<div>
			<ul>
				{data.map(item => (
					<li className="" key={item.title}>
						<a href={item.link} className="tw-flex">
							<p>{item.title}</p>
							<item.icon />
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export { MenuSheetMain };
