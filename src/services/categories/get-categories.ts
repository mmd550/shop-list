import data from '@/app/api/data.json'

export interface Category {
  id: number
  name_en: string
  name_fa: string
}

interface CategoriesResponse {
  data: Category[]
}

export const getCategories = async (): Promise<CategoriesResponse> => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    data: data.categories,
  }
}
