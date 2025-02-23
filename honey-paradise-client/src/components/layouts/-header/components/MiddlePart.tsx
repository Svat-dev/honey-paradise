import { Button } from "@/components/ui";
import { SearchIcon } from "lucide-react";
import styles from "../styles/middle-part.module.scss";

const MiddlePart = () => {
	return (
		<div className={styles["block"]}>
			<Button variant="secondary" className={styles["search-button"]}>
				<SearchIcon size={22} />
				<span id="key-combination" className="search">
					Ctrl+K
				</span>
			</Button>
		</div>
	);
};

export { MiddlePart };
