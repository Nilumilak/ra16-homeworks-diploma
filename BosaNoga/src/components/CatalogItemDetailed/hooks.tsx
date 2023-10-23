import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCatalogItemDetailed } from '../../api/services'

type SizeType = {
  size: string
  available: boolean
}

type CatalogItemDetailedType = {
  id: number
  category: number
  title: string
  images: string[]
  sku: string
  manufacturer: string
  color: string
  material: string
  reason: string
  season: string
  heelSize: string
  price: number
  oldPrice: number
  sizes: SizeType[]
}

export default function useFetchCatalogItem (): [CatalogItemDetailedType | null, boolean, boolean, () => void] {
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<CatalogItemDetailedType | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  function fetchCatalogItemDetailed (): void {
    if (id) {
      setLoading(true)
      setError(false)
      void getCatalogItemDetailed(id)
        .then(response => {
          setItem(response)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
          setError(true)
        })
    }
  }

  useEffect(() => {
    fetchCatalogItemDetailed()
  }, [])

  return [item, error, loading, fetchCatalogItemDetailed]
}

export type { CatalogItemDetailedType }
