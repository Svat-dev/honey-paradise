/**
 * Генерирует массив номеров страниц для пагинации
 * @param {number} pages - Общее количество страниц
 * @param {number} maxPages - Максимальное количество отображаемых страниц
 * @param {number} curPage - Текущая страница
 * @returns {number[] | string[]} Массив номеров страниц и разделителей
 */
export function getPaginationSchema(pages: number, maxPages: number, curPage: number): string[] | number[] {
	if (isNaN(pages) || isNaN(maxPages) || isNaN(curPage)) return [1, 2, 3, 4, 5];

	// Если общее количество страниц меньше или равно максимальному видимому количеству, возвращаем все страницы
	if (pages <= maxPages) return Array.from({ length: pages }, (_, i) => i + 1);

	// Рассчитываем количество промежуточных элементов между 1 и pages
	const availableSlots = maxPages - 2;

	// Определяем начальную позицию для промежуточных элементов
	let startMid = Math.max(2, curPage - Math.floor((availableSlots - 1) / 2));
	let endMid = startMid + availableSlots - 1;

	// Корректируем диапазон, если он выходит за пределы
	if (endMid > pages - 1) {
		startMid = pages - availableSlots;
		endMid = pages - 1;
	}

	// Генерируем промежуточные элементы
	const middle = [];
	for (let i = startMid; i <= endMid; i++) middle.push(i);

	const result = [1, ...middle, pages];

	const formatted = [];
	for (let i = 0; i < result.length; i++) {
		formatted.push(result[i].toString());

		// Добавляем разделитель, если:
		// 1. Это не последний элемент
		// 2. Следующий элемент существует
		// 3. Следующий элемент не является последовательным
		if (i < result.length - 1 && result[i + 1] !== result[i] + 1) formatted.push("...");
	}

	return formatted;
}
