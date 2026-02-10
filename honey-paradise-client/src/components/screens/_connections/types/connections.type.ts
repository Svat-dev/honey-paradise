import { GetAllConnectionsResponseType } from "@/shared/types/server"

export interface IConnectionsData {
	name: string
	type: GetAllConnectionsResponseType
	src: string
}
