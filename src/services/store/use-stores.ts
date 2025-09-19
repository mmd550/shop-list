import { useInfiniteQuery } from '@tanstack/react-query'
import { StoreFilters, StoresResponse } from './types'

const fetchStoressWithFilters = async (
  page: number,
  limit: number = 10,
  filters: StoreFilters = {
    name: '',
    categoryId: null,
    sortBy: {
      property: 'default',
      order: 'desc',
    },
  },
): Promise<StoresResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  if (filters.name) {
    params.append('name', filters.name)
  }

  if (filters.categoryId) {
    params.append('category_id', filters.categoryId.toString())
  }

  if (filters.sortBy.property !== 'default') {
    params.append('sort_by', filters.sortBy.property)
    params.append('sort_order', filters.sortBy.order)
  }

  const response = await fetch(`/api/stores?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch shops')
  }
  return response.json()
}

export const useInfiniteStores = (
  limit: number = 10,
  filters: StoreFilters = {
    name: '',
    categoryId: null,
    sortBy: {
      property: 'default',
      order: 'desc',
    },
  },
) => {
  return useInfiniteQuery({
    queryKey: ['shops', limit, filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchStoressWithFilters(pageParam, limit, filters),
    getNextPageParam: lastPage => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined
    },
    initialPageParam: 1,
  })
}
