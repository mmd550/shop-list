'use client'

import { styled } from '@mui/material/styles'
import { Card, CardContent, Typography, Rating, Skeleton } from '@mui/material'
import { Shop } from '@/hooks/use-shops-infinite'
import { classed } from '@/utils/classed'
import { AspectRatio } from '@/components/shared/aspect-ratio'
import { ImageWithSkeleton } from '@/components/shared/image-with-skeleton'
import { toLocale } from '@/utils/text'
import { useLocale } from 'next-intl'

interface ShopCardProps {
  shop: Shop
}

interface ShopCardSkeletonProps {
  className?: string
}

export const ShopCard = ({ shop }: ShopCardProps) => {
  const locale = useLocale()
  return (
    <StyledCard>
      <AspectRatio ratio={(300 / 400).toFixed(2)}>
        <ImageWithSkeleton
          imageProps={{
            src: shop.imageUrl,
            alt: shop.imageUrl,
            width: 400,
            height: 300,
            className: 'h-full w-full object-cover',
          }}
          className="h-full w-full"
        />
      </AspectRatio>
      <StyledCardContent>
        <div>
          <Typography variant="h6" className="mb-1 font-semibold">
            {shop.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {shop.category?.name_fa}
          </Typography>
        </div>

        <Typography
          variant="body1"
          color="text.secondary"
          className="line-clamp-2 clamped"
        >
          {shop.description}
        </Typography>

        <RatingContainer className="mt-auto">
          <Rating value={shop.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({toLocale(shop.rating, locale)})
          </Typography>
        </RatingContainer>
      </StyledCardContent>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  height: 100%;
  width: 100%;
  max-width: 420px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`

const StyledCardContent = classed(CardContent)('flex flex-col gap-5 flex-grow')

const RatingContainer = classed('div')(
  'flex dir-ltr justify-start rtl:flex-row-reverse w-full gap-2 mt-2',
)

export const ShopCardSkeleton = ({ className }: ShopCardSkeletonProps) => {
  return (
    <StyledCard className={className}>
      <AspectRatio ratio={(300 / 400).toFixed(2)}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ bgcolor: 'grey.100' }}
        />
      </AspectRatio>
      <StyledCardContent>
        <div>
          <Skeleton
            variant="text"
            className="[&&]:h-[28px] [&&]:w-[70%]"
            animation="wave"
            sx={{ bgcolor: 'grey.100' }}
          />
          <Skeleton
            variant="text"
            className="[&&]:h-[20px] [&&]:w-[30%]"
            animation="wave"
            sx={{ bgcolor: 'grey.100' }}
          />
        </div>

        <Skeleton
          variant="text"
          className="[&&]:h-[20px] [&&]:w-full"
          animation="wave"
          sx={{ bgcolor: 'grey.100' }}
        />
        <Skeleton
          variant="text"
          className="[&&]:h-[20px] [&&]:w-[90%]"
          animation="wave"
          sx={{ bgcolor: 'grey.100' }}
        />

        <RatingContainer className="mt-auto">
          <Skeleton
            variant="rectangular"
            className="[&&]:h-[20px] [&&]:w-[120px]"
            animation="wave"
            sx={{ bgcolor: 'grey.100' }}
          />
          <Skeleton
            variant="text"
            className="[&&]:h-[20px] [&&]:w-[40px]"
            animation="wave"
            sx={{ bgcolor: 'grey.100' }}
          />
        </RatingContainer>
      </StyledCardContent>
    </StyledCard>
  )
}
