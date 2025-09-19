'use client'

import { useState } from 'react'
import { Button, Typography, Alert } from '@mui/material'
import { useLocale, useTranslations } from 'next-intl'
import { useInfiniteStores } from '@/services/store/use-stores'
import { useCategories } from '@/services/categories/use-categories'
import { ShopCard, ShopCardSkeleton } from './shop-card'
import { FiltersBar } from './filters-bar'
import { classed } from '@/utils/classed'
import { toLocale } from '@/utils/text'
import { SortBy } from '@/services/store/types'

export const Shops = () => {
  const t = useTranslations('shops')
  const locale = useLocale()

  const [filters, setFilters] = useState<{
    name: string
    categoryId: number | null
    sortBy: SortBy
  }>({
    name: '',
    categoryId: null as number | null,
    sortBy: {
      property: 'default',
      order: 'desc',
    },
  })

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteStores(10, filters)

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories()

  if (isError) {
    return (
      <Container>
        <Alert severity="error">
          {t('loadingError', { error: error?.message })}
        </Alert>
      </Container>
    )
  }

  const allShops = data?.pages.flatMap(page => page.data) || []
  const totalShops = data?.pages[0]?.pagination.total
  const categories = categoriesData?.data || []

  return (
    <Container>
      <Header>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('title')}
        </Typography>
        {!!totalShops && (
          <Typography variant="body1" color="text.secondary">
            {t('shopsCount', { count: toLocale(totalShops, locale) })}
          </Typography>
        )}
      </Header>

      {!categoriesLoading && (
        <FiltersBar categories={categories} onFiltersChange={setFilters} />
      )}

      <ShopsGrid>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ShopCardSkeleton key={index} />
            ))
          : allShops.map(shop => <ShopCard key={shop.id} shop={shop} />)}
      </ShopsGrid>

      {hasNextPage && (
        <LoadMoreContainer>
          <Button
            variant="contained"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            loading={isFetchingNextPage}
          >
            {t('loadMore')}
          </Button>
        </LoadMoreContainer>
      )}
    </Container>
  )
}

const Container = classed('div')('my-8')

const Header = classed('div')('mb-8 constrain')

const ShopsGrid = classed('div')(
  'grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8 mb-8 justify-items-center constrain',
)

const LoadMoreContainer = classed('div')('flex justify-center mt-8')
