import type { ALLOWED_FILE_FORMATS } from "../constants/file.const";

export function validateFileFormat(filename: string, allowedFormats: typeof ALLOWED_FILE_FORMATS) {
	const fileParts = filename.split(".");
	const extension = fileParts[fileParts.length - 1];

	return allowedFormats.includes(extension);
}
