import { RadioGroup, RadioGroupItem } from "@/components/ui/common";

import type { FC } from "react";
import { useRadioGroupInput } from "../../hooks/useRadioGroupInput";
import styles from "../../styles/radio-group-input.module.scss";
import type { IRadioGroupInputProps } from "../../types/form-input.type";

const RadioGroupInput: FC<IRadioGroupInputProps> = ({ name, data }) => {
	const { value, onChange, register } = useRadioGroupInput(name);

	if (!data) return null;

	return (
		<RadioGroup name={name} onChange={onChange} defaultValue={value} className={styles["radio-group"]}>
			{data.map(item => (
				<div className={styles["radio-group-item"]} key={item.id}>
					<RadioGroupItem value={item.value} id={item.id} {...register(name, {})} />
					<label htmlFor={item.id}>{item.label}</label>
				</div>
			))}
		</RadioGroup>
	);
};

export { RadioGroupInput };
