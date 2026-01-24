"use client"

import { useEffect, useRef, useState } from "react"
import {
	type Options,
	type Styles,
	Calendar as VanillaCalendar
} from "vanilla-calendar-pro"
import "vanilla-calendar-pro/styles/index.css"

import "./styles/calendar.scss"

interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
	config: Options
}

function Calendar({ config, ...attributes }: CalendarProps) {
	const ref = useRef(null)
	const [calendar, setCalendar] = useState<VanillaCalendar | null>(null)

	const calendarStyles: Partial<Styles> = {
		calendar: "bg-red"
	}

	useEffect(() => {
		if (!ref.current) return
		setCalendar(
			new VanillaCalendar(ref.current, {
				...config,
				styles: calendarStyles
			})
		)
	}, [ref, config])

	useEffect(() => {
		if (!calendar) return
		calendar.init()
	}, [calendar])

	return <div {...attributes} ref={ref}></div>
}

export { Calendar }
