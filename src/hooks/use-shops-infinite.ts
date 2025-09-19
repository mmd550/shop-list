import { useInfiniteQuery } from '@tanstack/react-query'

export interface Shop {
  id: string
  name: string
  imageUrl: string
  category_id: number
  description: string
  address: string
  phone: string
  rating: number
  category?: {
    id: number
    name_en: string
    name_fa: string
  } | null
}

export interface ShopsResponse {
  data: Shop[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

const fetchShops = async (
  page: number,
  limit: number = 10,
): Promise<ShopsResponse> => {
  const response = await fetch(`/api/stores?page=${page}&limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch shops')
  }
  return response.json()
}

export const useShopsInfinite = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['shops', limit],
    queryFn: ({ pageParam = 1 }) => fetchShops(pageParam, limit),
    getNextPageParam: lastPage => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined
    },
    initialPageParam: 1,
  })
}
