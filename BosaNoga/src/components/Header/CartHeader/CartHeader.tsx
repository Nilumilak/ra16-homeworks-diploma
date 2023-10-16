import { useNavigate } from 'react-router-dom'

type CartHeaderProps = {
  quantity: number
}

function CartHeader ({ quantity }: CartHeaderProps): JSX.Element {
  const navigate = useNavigate()

  return (
        <div onClick={() => { navigate(`${import.meta.env.VITE_BASE_PATH}/cart`) }} className="header-controls-pic header-controls-cart">
            {quantity !== 0 && <div className="header-controls-cart-full">{quantity}</div>}
            <div className="header-controls-cart-menu"></div>
        </div>
  )
}

export default CartHeader
