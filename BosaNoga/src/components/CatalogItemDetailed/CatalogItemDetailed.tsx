import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemTable from './ItemTable/ItemTable'
import Size from './Size/Size'
import Quantity from './Quantity/Quantity'
import Preloader from '../Preloader/Preloader'
import { useAppDispatch } from '../../redux/hooks'
import { addCartItem } from '../../redux/slices/cartSlice'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import useFetchCatalogItem from './hooks'

function CatalogItemDetailed (): JSX.Element {
  const [item, error, loading, fetchCatalogItemDetailed] = useFetchCatalogItem()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)

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
    navigate(`${import.meta.env.VITE_BASE_PATH}/cart`)
  }

  return (
    <section className="catalog-item">
      {loading
        ? <Preloader />
        : error
          ? <ErrorHandler handleReload={() => { fetchCatalogItemDetailed() }} />
          : <>
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
      }
    </section>
  )
}

export default CatalogItemDetailed
