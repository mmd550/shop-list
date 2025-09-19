import { notFound } from 'next/navigation'
import { StoreDetailsHeader } from './components/store-details-header'
import { StoreDetailsInfo } from './components/store-details-info'
import { StoreProductsSection } from './components/store-products-section'

interface StoreDetailsPageProps {
  params: Promise<{ id: string; locale: string }>
}

export default async function StoreDetailsPage({
  params,
}: StoreDetailsPageProps) {
  const { id } = await params

  const storeData = await getStoreData(id)

  if (!storeData) {
    notFound()
  }

  const { shop, products, productCount } = storeData

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="tablet:px-6 desktop:px-8 mx-auto max-w-7xl px-4 py-8">
        {/* Store Header */}
        <StoreDetailsHeader shop={shop} />

        <div className="desktop:grid-cols-3 mt-8 grid grid-cols-1 gap-8">
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

async function getStoreData(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/stores/${id}`,
      {
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch store data')
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching store data:', error)
    throw error
  }
}
