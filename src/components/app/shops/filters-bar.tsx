'use client'

import { useState, useEffect } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  styled,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { classed } from '@/utils/classed'
import { SortBy } from '@/services/store/types'

interface Category {
  id: number
  name_en: string
  name_fa: string
}

interface FiltersBarProps {
  categories: Category[]
  onFiltersChange: (filters: {
    name: string
    categoryId: number | null
    sortBy: SortBy
    sortOrder: string
  }) => void
}

const sortByOptions: Record<string, SortBy> = {
  default: {
    property: 'default',
    order: 'desc',
  },
  ratingAsc: {
    property: 'rating',
    order: 'asc',
  },
  ratingDesc: {
    property: 'rating',
    order: 'desc',
  },
}

export const FiltersBar = ({
  categories,
  onFiltersChange,
}: FiltersBarProps) => {
  const t = useTranslations('shops.filters')
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<keyof typeof sortByOptions>('default')
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    onFiltersChange({
      name,
      categoryId,
      sortBy: sortByOptions[sortBy]!,
      sortOrder,
    })
  }, [name, categoryId, sortBy, sortOrder, onFiltersChange])

  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value
    setCategoryId(value === 0 ? null : (value as number))
  }

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value as keyof typeof sortByOptions)
  }

  return (
    <StickyContainer>
      <FiltersContent>
        <SearchField
          placeholder={t('searchPlaceholder')}
          value={name}
          onChange={e => setName(e.target.value)}
          variant="outlined"
          size="small"
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>{t('category')}</InputLabel>
          <Select
            value={categoryId || 0}
            label={t('category')}
            onChange={handleCategoryChange}
          >
            <MenuItem value={0}>{t('allCategories')}</MenuItem>
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name_fa}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>{t('sortBy')}</InputLabel>
          <Select
            value={sortBy}
            label={t('sortBy')}
            onChange={handleSortChange}
          >
            <MenuItem value="default">{t('default')}</MenuItem>
            <MenuItem value="ratingAsc">{t('ratingAsc')}</MenuItem>
            <MenuItem value="ratingDesc">{t('ratingDesc')}</MenuItem>
          </Select>
        </FormControl>
      </FiltersContent>
    </StickyContainer>
  )
}

const StickyContainer = styled('div')`
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  padding: 16px 0;
  margin-bottom: 24px;
`

const FiltersContent = classed('div')(
  'constrain flex flex-col tablet:flex-row gap-4 items-center',
)

const SearchField = styled(TextField)`
  flex: 1;
  min-width: 200px;
`
