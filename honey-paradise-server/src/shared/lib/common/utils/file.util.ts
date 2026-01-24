export function validateFileFormat(filename: string, allowedFormats: string[]) {
	const fileParts = filename.split(".")
	const extension = fileParts[fileParts.length - 1]

	return allowedFormats.includes(extension)
}
