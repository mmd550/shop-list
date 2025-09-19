'use client'

import { Button, Typography, Alert } from '@mui/material'
import { useLocale, useTranslations } from 'next-intl'
import { useShopsInfinite } from '@/hooks/use-shops-infinite'
import { ShopCard, ShopCardSkeleton } from './shop-card'
import { classed } from '@/utils/classed'
import { toLocale } from '@/utils/text'

export const Shops = () => {
  const t = useTranslations('shops')
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useShopsInfinite(10)

  const locale = useLocale()

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
        {Boolean(allShops?.length) && (
          <Typography variant="body1" color="text.secondary">
            {t('shopsCount', { count: toLocale(allShops.length, locale) })}
          </Typography>
        )}
      </Header>

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

const Container = classed('div')('constrain my-8')

const Header = classed('div')('mb-8')

const ShopsGrid = classed('div')(
  'grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8 mb-8 justify-items-center',
)

const LoadMoreContainer = classed('div')('flex justify-center mt-8')
