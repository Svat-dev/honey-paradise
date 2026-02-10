export function highlightComment(commentId: string | undefined) {
	if (!commentId) return

	const el = document.getElementById(`comment-${commentId}`)
	const className = "review-comment-highlighted"

	if (!el) return

	el.scrollIntoView()

	// If not works, do with el.style = ""

	setTimeout(() => el.classList.add(className), 300)
	setTimeout(() => el.classList.remove(className), 800)
}
