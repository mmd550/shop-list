import Image from 'next/image'
import { Rating } from '@mui/material'
import { toLocale } from '@/utils/text'
import { getLocale } from 'next-intl/server'

interface Shop {
  id: string
  name: string
  imageUrl: string
  rating: number
  category: {
    id: number
    name_en: string
    name_fa: string
  } | null
}

interface StoreDetailsHeaderProps {
  shop: Shop
}

export const StoreDetailsHeader = async ({ shop }: StoreDetailsHeaderProps) => {
  const locale = await getLocale()
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="relative h-64 tablet:h-80">
        <Image
          src={shop.imageUrl}
          alt={shop.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-4 tablet:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {shop.name}
            </h1>
            {shop.category && (
              <p className="text-lg text-gray-600">{shop.category.name_fa}</p>
            )}
          </div>

          <div className="flex gap-2 dir-ltr rtl:flex-row-reverse">
            <Rating
              value={shop.rating}
              precision={0.01}
              readOnly
              size="medium"
            />
            <span className="text-xl text-gray-900">
              ({toLocale(shop.rating, locale)})
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
