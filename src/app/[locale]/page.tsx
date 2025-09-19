import { Shops } from '@/components/app/shops'
import { getCategories } from '@/services/categories/get-categories'

export default async function Home() {
  const categoriesResponse = await getCategories()

  return (
    <div>
      <Shops categories={categoriesResponse.data} />
    </div>
  )
}
