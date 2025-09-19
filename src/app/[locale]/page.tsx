import { Shops } from '@/components/app/stores'
import { getCategories } from '@/app/api/categories/get-categories'
import { unstable_cache } from 'next/cache'

export default async function Home() {
  const cachedGetCategories = unstable_cache(getCategories, ['categories'], {
    tags: ['categories'],
    revalidate: 60 * 60 * 6, // 6 hours
  })

  const categoriesResponse = await cachedGetCategories()

  return (
    <div>
      <Shops categories={categoriesResponse.data} />
    </div>
  )
}
