const defaultPerPage = 0;
const defaultPage = 1;

export function getPagination(
  page?: number | string,
  perPage?: number | string,
) {
  const _page = !page || isNaN(+page) ? defaultPage : +page;
  const _perPage = !perPage || isNaN(+perPage) ? defaultPerPage : +perPage;

  const skip = (_page - 1) * _perPage;

  return { perPage: _perPage, skip };
}
