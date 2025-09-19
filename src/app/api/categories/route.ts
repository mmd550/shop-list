import data from '../data.json'
import { asyncDelay } from '@/utils/async-delay'

export async function GET() {
  try {
    await asyncDelay(500)

    return Response.json({
      data: data.categories,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
