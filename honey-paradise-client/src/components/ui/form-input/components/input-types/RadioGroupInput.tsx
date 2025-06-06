import { RadioGroup, RadioGroupItem } from "@/components/ui";

import type { FC } from "react";
import type { IRadioGroupInputProps } from "../../types/form-input.type";
import styles from "../../styles/radio-group-input.module.scss";
import { useRadioGroupInput } from "../../hooks/useRadioGroupInput";

const RadioGroupInput: FC<IRadioGroupInputProps> = ({ name }) => {
	const { data, getValues, onChange, register } = useRadioGroupInput(name);

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
