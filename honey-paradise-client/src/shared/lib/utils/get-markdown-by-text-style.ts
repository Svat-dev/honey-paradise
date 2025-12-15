export function getMarkdownByTextStyle(type: "bold" | "italic" | "link", text: string): string {
	switch (type) {
		case "bold":
			return `**${text}**`;

		case "italic":
			return `_${text}_`;

		case "link":
			return `[${text}](ссылка)`;

		default:
			return text;
	}
}
