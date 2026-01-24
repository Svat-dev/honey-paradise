import { useEffect, useRef } from "react"

/**
 * Хук для воспроизведения аудио без использования компонента audio
 * @param {string} src - путь к аудиофайлу в формате nextjs
 * @returns {{play: Promise<void>}} play - функция для воспроизведения аудио
 */
export const useSound = (src: string): { play: () => Promise<void> } => {
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		audioRef.current = new Audio(src)

		return () => {
			if (audioRef.current) {
				audioRef.current.pause()
				audioRef.current.currentTime = 0
				audioRef.current = null
			}
		}
	}, [src])

	const play = async () => {
		try {
			if (audioRef.current) {
				await audioRef.current.play()
				audioRef.current.currentTime = 0
			}
		} catch (error) {
			console.error("Error while playing an audio:", error)
		}
	}

	return { play }
}
