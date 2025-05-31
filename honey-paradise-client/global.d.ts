import en from "./public/languages/en.json";
import ru from "./public/languages/ru.json";

type Messages = typeof en & typeof ru;

declare module "next-intl" {
	interface AppConfig {
		Messages: Messages;
	}
}
