export const MAX_AVATAR_FILE_SIZE = 10
export const MAX_AVATAR_FILE_BYTES = 1024 * 1024 * MAX_AVATAR_FILE_SIZE

export const MAX_SETTINGS_FILE_SIZE = 5
export const MAX_SETTINGS_FILE_BYTES = 1024 * MAX_SETTINGS_FILE_SIZE

export const ALLOWED_SETTINGS_FILE_TYPES = [".yml", ".json"] as const
export const ALLOWED_AVATAR_FILE_TYPES = [
	".png",
	".webp",
	".jpg",
	".jpeg",
	".gif"
] as const
