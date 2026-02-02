import { FormProvider, useForm } from "react-hook-form"

import { Button } from "@/components/ui/common"
import { FormInput } from "@/components/ui/components/form-input"
import { VALUES } from "@/shared/lib/constants/base"

const CreateComment = () => {
	const form = useForm({})

	const func = (data: any) => {
		console.log(data)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(func)} className="mt-4 flex flex-col">
				<FormInput
					name="comment"
					textareaProps={{
						className: "!px-3 !py-2 border border-muted !resize-y",
						counter: true,
						maxLength: VALUES.MAX_COMMENT_LENGTH,
						rows: 4
					}}
					containerClassName="mb-2"
				/>

				<Button variant="secondary" className="self-end px-2 py-1.5">
					Leave comment
				</Button>
			</form>
		</FormProvider>
	)
}

export { CreateComment }
