import { type Style, Workbook } from "exceljs"
import { I18nService } from "nestjs-i18n"
import * as path from "path"
import type { CartExcelModelResponse } from "src/modules/cart/types/cart-excel-model.type"
import { EnumClientRoutes } from "src/shared/types/client/enums.type"

import type { TColByIdx, TRowWidth } from "./types/create-cart-table.type"

const colByIndex: TColByIdx = ["A", "B", "C", "D", "E", "F", "G"]
const headerRowWidths: TRowWidth = {
	2: 25,
	3: 25,
	4: 20,
	7: 18
}

const style: Record<string, Partial<Style>> = {
	default: {
		border: {
			bottom: { color: { argb: "000000" }, style: "medium" },
			right: { color: { argb: "000000" }, style: "thin" }
		},
		font: { size: 12, bold: true },
		fill: { type: "pattern", pattern: "solid", fgColor: { argb: "e5ff00" } }
	},
	hyperlink: {
		font: { underline: true, color: { argb: "0000ff" } }
	},
	extra: {
		border: { bottom: { style: "thin", color: { argb: "000000" } } }
	}
}
style.extra.font = style.default.font
style.extra.fill = style.default.fill

export function createCartTable(
	clientUrl: string,
	i18n: I18nService,
	lang: string,
	data: CartExcelModelResponse
): Workbook {
	const { cartItems, totalPrice, username, length } = data

	const workbook = new Workbook()

	workbook.title = i18n.t("d.tables.cart.title")
	workbook.description = i18n.t("d.tables.cart.description")
	workbook.creator = "Honey Paradise Shop"
	workbook.created = new Date()

	const worksheet = workbook.addWorksheet("Sheet 1")

	worksheet.addRow([
		"№",
		i18n.t("d.tables.cart.header.product"),
		i18n.t("d.tables.cart.header.category"),
		i18n.t("d.tables.cart.header.variation"),
		i18n.t("d.tables.cart.header.quantity"),
		i18n.t("d.tables.cart.header.price"),
		i18n.t("d.tables.cart.header.total")
	])

	for (const key in headerRowWidths)
		worksheet.getColumn(Number(key)).width = headerRowWidths[Number(key)] + 1

	new Array(colByIndex.length)
		.fill(0)
		.map(
			(_, i) => (worksheet.getCell(`${colByIndex[i]}1`).style = style.default)
		)

	let i: number = 2
	for (const item of cartItems) {
		const {
			title,
			slug,
			category: { title: categoryTitle, slug: categorySlug }
		} = item.product
		const totalItemPrice = item.quantity * item.priceInUSD

		const hyperlink_1 = path.join(clientUrl, EnumClientRoutes.PRODUCT, slug)
		const hyperlink_2 = path.join(
			clientUrl,
			EnumClientRoutes.CATEGORY,
			categorySlug
		)

		worksheet.insertRow(i, [
			i - 1,
			"undefined",
			"undefined",
			i18n.t("d.tables.cart.weight", { args: { count: 300 } }),
			item.quantity,
			item.priceInUSD,
			totalItemPrice
		])

		worksheet.getCell(`A${i}`).value = {
			formula: `=ROW()-1`,
			result: i - 1
		}
		worksheet.getCell(`B${i}`).value = {
			text: title[lang],
			hyperlink: hyperlink_1,
			tooltip: i18n.t("d.tables.cart.tooltips.product")
		}
		worksheet.getCell(`C${i}`).value = {
			text: categoryTitle[lang],
			hyperlink: hyperlink_2,
			tooltip: i18n.t("d.tables.cart.tooltips.category")
		}
		worksheet.getCell(`G${i}`).value = {
			formula: `=PRODUCT(E${i}:F${i})`,
			result: totalItemPrice
		}

		worksheet.getCell(`B${i}`).style = style.hyperlink
		worksheet.getCell(`C${i}`).style = style.hyperlink

		for (const j of colByIndex.slice(4))
			worksheet.getCell(`${j}${i}`).style = {
				alignment: { horizontal: "right" }
			}

		i++
	}

	worksheet.getColumn(1).alignment = { horizontal: "center" }
	worksheet.addRow("")

	const footerColNum = worksheet.addRow([
		"",
		i18n.t("d.tables.cart.total"),
		"",
		"",
		1,
		totalPrice,
		""
	]).number

	worksheet.mergeCells(`C${footerColNum}:D${footerColNum}`)
	worksheet.mergeCells(`F${footerColNum}:G${footerColNum}`)

	worksheet.getCell(`E${footerColNum}`).value = {
		formula: `=COUNTA(A2:A${footerColNum})-1`,
		result: 1
	}

	worksheet.getCell(`F${footerColNum}`).value = {
		formula: `=SUM(G2:G${footerColNum})`,
		result: totalPrice
	}

	new Array(colByIndex.length).fill(0).map(
		(_, i) =>
			(worksheet.getCell(`${colByIndex[i]}${footerColNum}`).style = {
				alignment: { horizontal: colByIndex[i] === "B" ? "left" : "right" },
				font: { bold: true }
			})
	)

	worksheet.addRow("")
	worksheet.addRow("")

	const date = new Date()
	const userRowNum = worksheet.addRow([
		"",
		i18n.t("d.tables.cart.user"),
		username
	]).number
	worksheet.addRow(["", i18n.t("d.tables.cart.date"), date.toDateString()])
		.number

	const extraItalic = { ...style.extra, font: { italic: true } }

	worksheet.getCell(`B${userRowNum}`).style = style.extra
	worksheet.getCell(`B${userRowNum + 1}`).style = style.extra

	worksheet.getCell(`C${userRowNum}`).style = extraItalic
	worksheet.getCell(`C${userRowNum + 1}`).style = extraItalic

	return workbook
}
