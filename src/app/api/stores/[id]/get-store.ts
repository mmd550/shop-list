import data from '../../data.json'

export async function getStore(id: string) {
  try {
    // Find the shop by ID
    const shop = data.stores.find(store => store.id === id)

    if (!shop) {
      return undefined
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

    return {
      shop: shopWithCategory,
      products,
      productCount: products.length,
    }
  } catch (error) {
    throw new Error('INTERNAL_SERVER_ERROR')
  }
}
