import { toLocale } from '@/utils/text'
import {
  MapPinIcon,
  PhoneIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { getLocale, getTranslations } from 'next-intl/server'

interface Shop {
  id: string
  name: string
  description: string
  address: string
  phone: string
  rating: number
  category: {
    id: number
    name_en: string
    name_fa: string
  } | null
}

interface StoreDetailsInfoProps {
  shop: Shop
}

export const StoreDetailsInfo = async ({ shop }: StoreDetailsInfoProps) => {
  const t = await getTranslations('storeDetails')
  const locale = await getLocale()

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        {t('storeInfo')}
      </h2>

      <div className="space-y-6">
        {/* Description */}
        <div>
          <div className="flex items-start gap-3">
            <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
            <div>
              <h3 className="mb-2 font-medium text-gray-900">
                {t('description')}
              </h3>
              <p className="leading-relaxed text-gray-600 select-all">
                {shop.description}
              </p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <div className="flex items-start gap-3">
            <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
            <div>
              <h3 className="mb-2 font-medium text-gray-900">{t('address')}</h3>
              <p className="text-gray-600 select-all">{shop.address}</p>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <div className="flex items-start gap-3">
            <PhoneIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
            <div>
              <h3 className="mb-2 font-medium text-gray-900">{t('phone')}</h3>
              <a
                href={`tel:${shop.phone}`}
                className="select-all text-blue-600 transition-colors hover:text-blue-800"
              >
                {toLocale(shop.phone, locale)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
