import { useEffect, useState } from 'react'
import { getCatalogItemDetailed } from '../../api/services'
import { useParams, useNavigate } from 'react-router-dom'
import ItemTable from './ItemTable/ItemTable'
import Size from './Size/Size'
import Quantity from './Quantity/Quantity'
import Preloader from '../Preloader/Preloader'
import { useAppDispatch } from '../../redux/hooks'
import { addCartItem } from '../../redux/slices/cartSlice'

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

function CatalogItemDetailed (): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<CatalogItemDetailedType | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)

  useEffect(() => {
    if (id) {
      void getCatalogItemDetailed(id)
        .then(response => { setItem(response) })
    }
  }, [])

  function handleClick (): void {
    item && dispatch(addCartItem(
      {
        item: {
          id: item.id,
          title: item.title,
          price: item.price,
          size: selectedSize,
          quantity
        }
      }
    ))
    navigate('/cart')
  }

  return (
    <section className="catalog-item">
      {item
        ? <>
          <h2 className="text-center">{item?.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={item?.images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <ItemTable item={item} />
              <div className="text-center">
                <p>
                  Размеры в наличии: {item?.sizes.map((item, index) => item.available &&
                    <Size
                      key={index}
                      size={item.size}
                      selectedSize={selectedSize}
                      onChangeSelectedSize={setSelectedSize}
                    />)}
                </p>
                <Quantity quantity={quantity} onSetQuantity={setQuantity} />
              </div>
              <button
                onClick={handleClick}
                className="btn btn-danger btn-block btn-lg"
                disabled={selectedSize === ''}>
                В корзину
              </button>
            </div>
          </div>
        </>
        : <Preloader />}
    </section>
  )
}

export default CatalogItemDetailed
export type { CatalogItemDetailedType }
