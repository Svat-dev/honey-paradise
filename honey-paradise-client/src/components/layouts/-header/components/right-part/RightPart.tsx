"use client"

import { useAuth } from "@hooks/auth"

import { AuthOffBlock } from "./AuthOffBlock"
import { AuthOnBlock } from "./AuthOnBlock"

import type { FC } from "react"
interface IProps {
	isAuth: boolean
}

const RightPart: FC<IProps> = ({ isAuth }) => {
	const { isAuthenticated } = useAuth(isAuth)

	return <div className="flex items-center print:hidden">{isAuthenticated ? <AuthOnBlock /> : <AuthOffBlock />}</div>
}

export { RightPart }
