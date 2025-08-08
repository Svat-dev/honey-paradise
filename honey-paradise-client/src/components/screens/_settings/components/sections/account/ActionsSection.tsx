import { Button, Separator, Title } from "@/components/ui/common";

import { useMyAccount } from "@hooks/auth";
import styles from "../../../styles/account.module.scss";

const ActionsSection = () => {
	const { isAccLoading, logout } = useMyAccount();

	return (
		<section className={styles["actions-wrapper"]}>
			<Title size="sm">{"Действия"}</Title>

			<div>
				<div>
					<p>{"Выход"}</p>
					<p>{"Завершите сеанс, чтобы выйти из аккаунта на этом устройстве"}</p>
				</div>

				<Button variant="destructive" isLoading={isAccLoading} onClick={() => logout()}>
					{"Выйти из системы"}
				</Button>
			</div>

			<Separator orientation="horizontal" />

			<div>
				<div>
					<p>{"Удаление аккаунта"}</p>
					<p>{"Удаление аккаунта приведет к его полному уничтожению без возможности возврата"}</p>
				</div>

				<Button variant="destructive" disabled>
					{"Удалить аккаунт"}
				</Button>
			</div>
		</section>
	);
};

export { ActionsSection };
