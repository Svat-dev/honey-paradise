import { UploadIcon } from "lucide-react"
import type { FC } from "react"

import { Button } from "@/components/ui/common"
import { ALLOWED_SETTINGS_FILE_TYPES } from "@/shared/lib/constants/base"

import { useUploadSettings } from "../../../hooks/useUploadSettings"

interface IProps {
	isLoading: boolean
}

const UploadSettings: FC<IProps> = ({ isLoading }) => {
	const {
		t,
		inputRef,
		handleUploadFile,
		handleFileChange,
		isSettingsUploading
	} = useUploadSettings()

	const isDisabled = isSettingsUploading || isLoading

	return (
		<div>
			<div>
				<p>{t("uploadFile.title")}</p>
				<p>{t("uploadFile.description")}</p>
			</div>

			<input
				type="file"
				ref={inputRef}
				accept={ALLOWED_SETTINGS_FILE_TYPES.join(",")}
				className="sr-only"
				onChange={handleFileChange}
				disabled={isDisabled}
			/>

			<Button
				variant="default"
				className="items-center gap-2 px-2 py-1.5"
				title={t("uploadFile.title")}
				onClick={handleUploadFile}
				disabled={isDisabled}
				isLoading={isSettingsUploading}
			>
				<UploadIcon size={20} />
				{t("uploadFile.btn")}
			</Button>
		</div>
	)
}

export { UploadSettings }
