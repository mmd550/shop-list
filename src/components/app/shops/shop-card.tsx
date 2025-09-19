import { styled } from '@mui/material/styles'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Rating,
} from '@mui/material'
import { Shop } from '@/hooks/use-shops-infinite'

const StyledCard = styled(Card)`
  height: 100%;
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

const StyledCardMedia = styled(CardMedia)`
  height: 200px;
  object-fit: cover;
`

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ShopName = styled(Typography)`
  font-weight: 600;
  margin-bottom: 4px;
`

const Description = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
`

const Address = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.875rem;
`

const Phone = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.875rem;
`

const RatingContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

interface ShopCardProps {
  shop: Shop
}

export const ShopCard = ({ shop }: ShopCardProps) => {
  return (
    <StyledCard>
      <StyledCardMedia image={shop.imageUrl} title={shop.name} />
      <StyledCardContent>
        <ShopName variant="h6">{shop.name}</ShopName>

        {shop.category && (
          <Chip
            label={shop.category.name_fa}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}

        <Description variant="body2">{shop.description}</Description>

        <Address variant="body2">📍 {shop.address}</Address>

        <Phone variant="body2">📞 {shop.phone}</Phone>

        <RatingContainer>
          <Rating value={shop.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({shop.rating})
          </Typography>
        </RatingContainer>
      </StyledCardContent>
    </StyledCard>
  )
}
