'use client'

import { Button, CircularProgress, Typography, Alert } from '@mui/material'
import { useShopsInfinite } from '@/hooks/use-shops-infinite'
import { ShopCard } from './shop-card'
import { classed } from '@/utils/classed'

export const Shops = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useShopsInfinite(10)

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    )
  }

  if (isError) {
    return (
      <Container>
        <Alert severity="error">
          خطا در بارگذاری فروشگاه‌ها: {error?.message}
        </Alert>
      </Container>
    )
  }

  const allShops = data?.pages.flatMap(page => page.data) || []

  return (
    <Container>
      <Header>
        <Typography variant="h4" component="h1" gutterBottom>
          فروشگاه‌ها
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {allShops.length} فروشگاه موجود است
        </Typography>
      </Header>

      <ShopsGrid>
        {allShops.map(shop => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </ShopsGrid>

      {hasNextPage && (
        <LoadMoreContainer>
          <Button
            variant="contained"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            startIcon={
              isFetchingNextPage ? <CircularProgress size={20} /> : null
            }
          >
            {isFetchingNextPage ? 'در حال بارگذاری...' : 'بارگذاری بیشتر'}
          </Button>
        </LoadMoreContainer>
      )}
    </Container>
  )
}

const Container = classed('div')('constrain')

const Header = classed('div')('mb-8 text-center')

const ShopsGrid = classed('div')(
  'grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8 mb-8',
)

const LoadMoreContainer = classed('div')('flex justify-center mt-8')

const LoadingContainer = classed('div')('flex justify-center items-center p-8')
