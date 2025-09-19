'use client'

import axios from 'axios'
import { useEffect } from 'react'

export function Shops() {
  const getShops = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/shops')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getShops()
  }, [])
  return <div>Shops</div>
}
