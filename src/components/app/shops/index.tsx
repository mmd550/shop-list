'use client'

import { useState } from 'react'
import { Button, Typography, Alert } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useInfiniteStores } from '@/services/store/use-stores'
import { ShopCard, ShopCardSkeleton } from './shop-card'
import { FiltersBar } from './filters-bar'
import { classed } from '@/utils/classed'
import { SortBy } from '@/services/store/types'
import { Category } from '@/services/categories/get-categories'

interface ShopsProps {
  categories: Category[]
}

export const Shops = ({ categories }: ShopsProps) => {
  const t = useTranslations('shops')

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

  return (
    <Container>
      <Header>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('title')}
        </Typography>
      </Header>

      <FiltersBar categories={categories} onFiltersChange={setFilters} />

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

const Header = classed('div')('constrain')

const ShopsGrid = classed('div')(
  'grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8 mb-8 justify-items-center constrain',
)

const LoadMoreContainer = classed('div')('flex justify-center mt-8')
