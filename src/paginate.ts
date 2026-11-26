export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface PaginateOptions {
  /** When true, a page past the end is clamped to the last page. */
  clamp?: boolean;
}

/**
 * Return one page of `items`. Pages are 1-based.
 * By default a page past the end returns no items. With `clamp: true`,
 * a page past the end returns the last page instead.
 */
export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize: number,
  options: PaginateOptions = {},
): Page<T> {
  if (!Number.isInteger(page) || page < 1) throw new RangeError("page must be a positive integer");
  if (!Number.isInteger(pageSize) || pageSize < 1) throw new RangeError("pageSize must be a positive integer");

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const current = options.clamp ? Math.min(page, totalPages) : page;
  const start = (current - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: current,
    pageSize,
    totalItems,
    totalPages,
    hasPrevious: current > 1,
    hasNext: current < totalPages,
  };
}
