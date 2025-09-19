export interface Store {
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

export interface StoresResponse {
  data: Store[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface SortBy {
  property: string
  order: 'asc' | 'desc'
}

export interface StoreFilters {
  name: string
  categoryId: number | null
  sortBy: SortBy
}
