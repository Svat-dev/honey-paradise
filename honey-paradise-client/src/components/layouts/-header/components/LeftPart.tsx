import { APP_NAME_EN } from "@/shared/lib/constants/base";

const LeftPart = () => {
	return (
		<>
			<div className="tw-flex tw-items-center tw-gap-2">
				<div className="tw-bg-secondary tw-w-8 tw-h-8 tw-rounded-full" />
				<p className="tw-uppercase tw-font-bold tw-text-2xl tw-tracking-tighter">{APP_NAME_EN}</p>
			</div>

			<ul className="tw-ml-14 tw-flex tw-items-center tw-gap-5">
				<li>
					<a href={"#"}>Акции</a>
				</li>
				<li>
					<a href={"#"}>Контакты</a>
				</li>
				<li>
					<a href={"#"}>Промокод</a>
				</li>
			</ul>
		</>
	);
};

export { LeftPart };
