import { notFound } from 'next/navigation'
import { StoreDetailsHeader } from '../../../../components/app/store-details/store-details-header'
import { StoreDetailsInfo } from '../../../../components/app/store-details/store-details-info'
import { StoreProductsSection } from '../../../../components/app/store-details/store-products-section'
import { getStore } from '@/app/api/stores/[id]/get-store'
import { unstable_cache } from 'next/cache'

interface StoreDetailsPageProps {
  params: Promise<{ id: string; locale: string }>
}

export default async function StoreDetailsPage({
  params,
}: StoreDetailsPageProps) {
  const { id } = await params

  const cachedGetStore = unstable_cache(() => getStore(id), ['store', id], {
    tags: ['store'],
    revalidate: 60 * 60 * 6, // 6 hours
  })

  const storeData = await cachedGetStore()

  if (!storeData) {
    notFound()
  }

  const { shop, products, productCount } = storeData

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 tablet:px-6 desktop:px-8">
        {/* Store Header */}
        <StoreDetailsHeader shop={shop} />

        <div className="mt-8 grid grid-cols-1 gap-8 desktop:grid-cols-3">
          {/* Store Information */}
          <div className="desktop:col-span-1">
            <StoreDetailsInfo shop={shop} />
          </div>

          {/* Products Section */}
          <div className="desktop:col-span-2">
            <StoreProductsSection
              products={products}
              productCount={productCount}
              storeName={shop.name}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
