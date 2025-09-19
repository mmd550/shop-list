import type { NextRequest } from 'next/server'
import data from '../data.json'
import { asyncDelay } from '@/utils/async-delay'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    await asyncDelay(2000)

    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const categoryId = searchParams.get('category_id')
    const name = searchParams.get('name')
    const sortBy = searchParams.get('sort_by') || 'default'
    const sortOrder = searchParams.get('sort_order') || 'desc'

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return Response.json(
        {
          error:
            'Invalid pagination parameters. Page must be >= 1, limit must be between 1 and 100.',
        },
        { status: 400 },
      )
    }

    // Filter shops by category if category_id is provided
    let filteredShops = data.stores

    if (categoryId) {
      const categoryIdNum = parseInt(categoryId)
      if (isNaN(categoryIdNum)) {
        return Response.json(
          { error: 'Invalid category_id. Must be a number.' },
          { status: 400 },
        )
      }

      filteredShops = filteredShops.filter(
        shop => shop.category_id === categoryIdNum,
      )
    }

    // Filter shops by name if name is provided
    if (name) {
      filteredShops = filteredShops.filter(shop =>
        shop.name.toLowerCase().includes(name.toLowerCase()),
      )
    }

    // Sort shops
    if (sortBy === 'rating') {
      if (sortOrder === 'asc') {
        filteredShops = filteredShops.sort((a, b) => a.rating - b.rating)
      } else {
        filteredShops = filteredShops.sort((a, b) => b.rating - a.rating)
      }
    }

    // Calculate pagination
    const totalShops = filteredShops.length
    const totalPages = Math.ceil(totalShops / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    // Get paginated shops
    const paginatedShops = filteredShops.slice(startIndex, endIndex)

    // Add category information to each shop
    const shopsWithCategory = paginatedShops.map(shop => {
      const category = data.categories.find(cat => cat.id === shop.category_id)
      return {
        ...shop,
        category: category
          ? {
              id: category.id,
              name_en: category.name_en,
              name_fa: category.name_fa,
            }
          : null,
      }
    })

    return Response.json({
      data: shopsWithCategory,
      pagination: {
        page,
        limit,
        total: totalShops,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error('Error fetching shops:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
