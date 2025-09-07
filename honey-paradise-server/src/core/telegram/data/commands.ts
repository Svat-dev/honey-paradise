import type { BotCommand } from "node-telegram-bot-api";

export const BotCommands = {
	START: "/start",
	INFO: "/info",
	HELP: "/help",
	ME: "/me",
	DISCONNECT: "/disconnect",
} as const;

type TLocale = "ru" | "en";
type TReturnCommands = Record<TLocale, BotCommand[]>;
type TCommands = Record<TLocale, Record<keyof typeof BotCommands, string>>;

export const getCommandList = (auth: boolean): TReturnCommands => {
	const defaultValue: TCommands = {
		en: {
			START: "Restart the bot",
			HELP: "Help with commands",
			INFO: "Information about bot",
			ME: "View your profile information",
			DISCONNECT: "Disconnect bot from the account",
		},
		ru: {
			START: "Перезапустить бота",
			HELP: "Помощь с командами",
			INFO: "Информация о боте",
			ME: "Посмотреть информацию о профиле",
			DISCONNECT: "Отключить бота от аккаунта",
		},
	};

	const returnCommands: TReturnCommands = {
		en: [],
		ru: [],
	};

	for (const l_key in defaultValue) {
		if (defaultValue[l_key]) {
			const commands: Record<keyof typeof BotCommands, string> = defaultValue[l_key];

			for (const key in commands) {
				if (auth) returnCommands[l_key].push({ command: BotCommands[key], description: commands[key] });
				else {
					if (BotCommands[key] === BotCommands.DISCONNECT || BotCommands[key] === BotCommands.ME) continue;
					returnCommands[l_key].push({ command: BotCommands[key], description: commands[key] });
				}
			}
		}
	}

	return returnCommands;
};
