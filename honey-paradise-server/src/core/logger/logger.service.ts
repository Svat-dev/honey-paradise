import { ConsoleLogger } from "@nestjs/common/services/console-logger.service"
import type {
	LogLevel,
	LoggerService as NestLoggerService
} from "@nestjs/common/services/logger.service"
import * as fs from "fs"
import * as path from "path"
import { monthsByKeys } from "src/shared/lib/common/constants/logger.const"

export class LoggerService implements NestLoggerService {
	private readonly year = new Date().getFullYear()
	private readonly month = monthsByKeys[new Date().getMonth()]
	private readonly day =
		new Date().getDate() < 10
			? `0${new Date().getDate()}`
			: new Date().getDate()

	private readonly hours =
		new Date().getHours() < 10
			? `0${new Date().getHours()}`
			: new Date().getHours()
	private readonly minutes =
		new Date().getMinutes() < 10
			? `0${new Date().getMinutes()}`
			: new Date().getMinutes()
	private readonly seconds =
		new Date().getSeconds() < 10
			? `0${new Date().getSeconds()}`
			: new Date().getSeconds()
	private readonly time = this.hours + ":" + this.minutes + ":" + this.seconds

	private readonly logFile = path.join(
		__dirname,
		`../../../logs/${this.year}/${this.month}/${this.day}.log`
	)
	private readonly consoleLogger = new ConsoleLogger()

	log(message: any, ctx: string) {
		this.writeToFile("log", message, ctx)
		this.consoleLogger.log(message, ctx)
	}

	error(message: any, trace?: any, ctx?: string) {
		const errCode = trace?.status
		const canLogError = [500, 403]

		if (!canLogError.includes(errCode)) return true

		this.writeToFile("error", message, ctx, trace)
		this.consoleLogger.error(message, trace, ctx)
	}

	warn(message: any, ctx?: string) {
		this.writeToFile("warn", message, ctx)
		this.consoleLogger.warn(message, ctx)
	}

	fatal(message: any, ctx?: string) {
		this.writeToFile("fatal", message, ctx)
		this.consoleLogger.fatal(message, ctx)
	}

	private writeToFile(level: LogLevel, msg: any, ctx?: string, trace?: string) {
		const log = `[${this.time}] [${level}] [${ctx || "No Context"}] ${msg} ${trace ? `\nTRACE: ${trace}` : ""}\n`

		const logDir = path.dirname(this.logFile)
		if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })

		fs.appendFileSync(this.logFile, log)
	}
}
