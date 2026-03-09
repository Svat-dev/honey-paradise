import type { LucideProps } from "lucide-react"
import type { FC } from "react"

const MirCardIcon: FC<LucideProps> = ({
	size = 32,
	strokeWidth = 0,
	stroke = "currentColor",
	fill = "#000000",
	...props
}) => {
	const { height, width, viewBox } = props

	return (
		<svg
			stroke={stroke}
			fill={fill}
			strokeWidth={strokeWidth}
			viewBox={viewBox ?? "0 0 780 500"}
			height={height ? height : typeof size === "number" ? size - 2 : size}
			width={width ? width : size}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Mir</title>
			<g transform="translate(-91.000000, -154.000000)">
				<g transform="translate(91.000000, 154.000000)">
					<path
						className="fill-[#37a72e]"
						d="M544.1,240.5v108h60v-64h68c28.6-0.2,52.9-18.5,62.1-44H544.1z"
					></path>
					<linearGradient
						id="mir-gradient"
						gradientUnits="userSpaceOnUse"
						x1="362.4047"
						y1="275.4307"
						x2="363.4047"
						y2="275.4307"
						gradientTransform="matrix(201.7633 0 0 -79 -72583.8438 21950.0254)"
					>
						<stop offset="0" style={{ stopColor: "#00a0e5" }}></stop>
						<stop offset="1" style={{ stopColor: "#0077c3" }}></stop>
					</linearGradient>
					<path
						className="fill-[url(#mir-gradient)]"
						d="M536.1,151.5c3.5,44.1,45.3,79,96.3,79c0.2,0,104.3,0,104.3,0 c0.8-4,1.2-8.2,1.2-12.5c0-36.6-29.5-66.2-66-66.5L536.1,151.5z"
					></path>
					<path
						className="fill-[#37a72e]"
						d="M447.3,229.4l0-0.1L447.3,229.4c0.7-1.2,1.8-1.9,3.2-1.9c2,0,3.5,1.6,3.6,3.5l0,0 v116.5h60v-196h-60c-7.6,0.3-16.2,5.8-19.4,12.7L387,266.6c-0.1,0.4-0.3,0.8-0.5,1.2l0,0l0,0c-0.7,1-1.9,1.7-3.3,1.7 c-2.2,0-4-1.8-4-4v-114h-60v196h60v0c7.5-0.4,15.9-5.9,19.1-12.7l49-105.1C447.2,229.6,447.3,229.5,447.3,229.4L447.3,229.4z"
					></path>
					<path
						className="fill-[#37a72e]"
						d="M223.3,232.8l-35.1,114.7H145L110,232.7c-0.3-1.8-1.9-3.2-3.9-3.2 c-2.2,0-3.9,1.8-3.9,3.9c0,0,0,0,0,0l0,114h-60v-196h51.5H109c11,0,22.6,8.6,25.8,19.1l29.2,95.5c1.5,4.8,3.8,4.7,5.3,0 l29.2-95.5c3.2-10.6,14.8-19.1,25.8-19.1h15.3h51.5v196h-60v-114c0,0,0,0,0-0.1c0-2.2-1.8-3.9-3.9-3.9 C225.2,229.5,223.6,230.9,223.3,232.8L223.3,232.8z"
					></path>
				</g>
			</g>
		</svg>
	)
}

export { MirCardIcon }
