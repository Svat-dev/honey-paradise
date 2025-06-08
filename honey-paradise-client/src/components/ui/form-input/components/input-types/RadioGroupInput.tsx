import { RadioGroup, RadioGroupItem } from "@/components/ui";

import type { FC } from "react";
import { useRadioGroupInput } from "../../hooks/useRadioGroupInput";
import styles from "../../styles/radio-group-input.module.scss";
import type { IRadioGroupInputProps } from "../../types/form-input.type";

const RadioGroupInput: FC<IRadioGroupInputProps> = ({ name, data }) => {
	const { getValues, onChange, register } = useRadioGroupInput(name);

	if (!data) return null;

	return (
		<RadioGroup name={name} onChange={onChange} defaultValue={getValues("gender")} className={styles["radio-group"]}>
			{data.map(item => (
				<div className={styles["radio-group-item"]} key={item.id}>
					<RadioGroupItem value={item.value} id={item.id} {...register("gender", {})} />
					<label htmlFor={item.id}>{item.label}</label>
				</div>
			))}
		</RadioGroup>
	);
};

export { RadioGroupInput };
