import { toLocale } from '@/utils/text'
import { ProductCard } from './product-card'
import { getLocale, getTranslations } from 'next-intl/server'

interface Product {
  id: string
  store_id: string
  name: string
  price: number
  rating: number
  sales_count: number
  category_id: number
  imageUrl: string
}

interface StoreProductsSectionProps {
  products: Product[]
  productCount: number
  storeName: string
}

export const StoreProductsSection = async ({
  products,
  productCount,
  storeName,
}: StoreProductsSectionProps) => {
  const t = await getTranslations('storeDetails')
  const locale = await getLocale()

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          {t('products')} {storeName}
        </h2>
        <p className="text-gray-600">
          {t('productsCount', { count: toLocale(productCount, locale) })}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 justify-items-center gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mb-4 text-gray-400">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            {t('noProducts')}
          </h3>
          <p className="text-gray-600">{t('noProductsDescription')}</p>
        </div>
      )}
    </div>
  )
}
