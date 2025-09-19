import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { getLocale, getTranslations } from 'next-intl/server'
import { AspectRatio } from '@/components/shared/aspect-ratio'
import { ImageWithSkeleton } from '@/components/shared/image-with-skeleton'
import { Rating } from '@mui/material'
import { toLocale } from '@/utils/text'

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

interface ProductCardProps {
  product: Product
}

export const ProductCard = async ({ product }: ProductCardProps) => {
  const t = await getTranslations('storeDetails')
  const locale = await getLocale()

  return (
    <div className="flex w-full max-w-[320px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md">
      <AspectRatio ratio={1} className="flex-shrink-0">
        <ImageWithSkeleton
          imageProps={{
            src: product.imageUrl,
            alt: product.name,
            fill: true,
            className: 'object-cover',
          }}
          className="h-full w-full"
        />
      </AspectRatio>

      <div className="flex flex-grow flex-col justify-between p-4">
        <h3 className="mb-2 line-clamp-2 font-medium text-gray-900">
          {product.name}
        </h3>

        <div>
          <div className="mb-2 flex gap-1 dir-ltr rtl:flex-row-reverse">
            <Rating
              value={product.rating}
              precision={0.01}
              readOnly
              size="small"
            />
            <span className="mr-1 text-sm text-gray-600">
              ({toLocale(product.rating, locale)})
            </span>
          </div>
          <div className="mt-auto flex flex-col items-start justify-between">
            <div className="text-lg font-semibold text-gray-900">
              {toLocale(product.price, locale, true)}{' '}
              <span className="text-sm text-gray-500">{t('currency')}</span>
            </div>
            <div className="text-sm text-gray-500">
              {toLocale(product.sales_count, locale, true)} {t('sales')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
