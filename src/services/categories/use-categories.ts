import { useQuery } from '@tanstack/react-query'

export interface Category {
  id: number
  name_en: string
  name_fa: string
}

interface CategoriesResponse {
  data: Category[]
}

const fetchCategories = async (): Promise<CategoriesResponse> => {
  const response = await fetch('/api/categories')
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
