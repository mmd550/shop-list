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
  Button,
  Popover,
  IconButton,
  Typography,
} from '@mui/material'
import { FilterList, Close } from '@mui/icons-material'
import { useTranslations } from 'next-intl'
import { classed } from '@/utils/classed'
import { SortBy } from '@/services/store/types'
import { useIsTabletOrAboveSize } from '@/hooks/use-is-desktop-size'

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
  const isTabletOrAbove = useIsTabletOrAboveSize()
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<keyof typeof sortByOptions>('default')
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const open = Boolean(anchorEl)

  useEffect(() => {
    onFiltersChange({
      name,
      categoryId,
      sortBy: sortByOptions[sortBy]!,
      sortOrder: 'desc',
    })
  }, [name, categoryId, sortBy, onFiltersChange])

  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value
    setCategoryId(value === 0 ? null : (value as number))
  }

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value as keyof typeof sortByOptions)
  }

  const handleFilterButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handleFilterMenuClose = () => {
    setAnchorEl(null)
  }

  const renderFilters = () => (
    <>
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
        <Select value={sortBy} label={t('sortBy')} onChange={handleSortChange}>
          <MenuItem value="default">{t('default')}</MenuItem>
          <MenuItem value="ratingAsc">{t('ratingAsc')}</MenuItem>
          <MenuItem value="ratingDesc">{t('ratingDesc')}</MenuItem>
        </Select>
      </FormControl>
    </>
  )

  return (
    <StickyContainer>
      <FiltersContent>
        {isTabletOrAbove ? (
          renderFilters()
        ) : (
          <>
            <SearchField
              placeholder={t('searchPlaceholder')}
              value={name}
              onChange={e => setName(e.target.value)}
              variant="outlined"
              size="small"
            />
            <IconButton size="small" onClick={handleFilterButtonClick}>
              <FilterList />
            </IconButton>
          </>
        )}
      </FiltersContent>

      <FilterPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleFilterMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <FilterMenuHeader>
          <IconButton size="small" onClick={handleFilterMenuClose}>
            <Close />
          </IconButton>
        </FilterMenuHeader>
        <FilterMenuContent>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
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

          <FormControl fullWidth size="small">
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
        </FilterMenuContent>
      </FilterPopover>
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

const FiltersContent = classed('div')('constrain flex gap-4 items-center')

const SearchField = styled(TextField)`
  flex: 1;
  min-width: 200px;
`

const FilterPopover = styled(Popover)`
  .MuiPopover-paper {
    min-width: 280px;
    max-width: 90vw;
  }
`

const FilterMenuHeader = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 16px 8px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`

const FilterMenuContent = styled('div')`
  padding: 16px;
`
