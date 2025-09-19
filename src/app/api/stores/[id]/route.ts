import type { NextRequest } from 'next/server'
import data from '../../data.json'
import { asyncDelay } from '@/utils/async-delay'

export async function GET(
  _: NextRequest,
  ctx: RouteContext<'/api/stores/[id]'>,
) {
  try {
    const { id } = await ctx.params
    await asyncDelay(1000)

    // Find the shop by ID
    const shop = data.stores.find(store => store.id === id)

    if (!shop) {
      return Response.json({ error: 'Shop not found' }, { status: 404 })
    }

    // Find the category for this shop
    const category = data.categories.find(cat => cat.id === shop.category_id)

    // Find all products for this shop
    const products = data.products.filter(product => product.store_id === id)

    // Add category information to the shop
    const shopWithCategory = {
      ...shop,
      category: category
        ? {
            id: category.id,
            name_en: category.name_en,
            name_fa: category.name_fa,
          }
        : null,
    }

    return Response.json({
      data: {
        shop: shopWithCategory,
        products,
        productCount: products.length,
      },
    })
  } catch (error) {
    console.error('Error fetching shop:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
