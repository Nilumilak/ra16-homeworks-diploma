import { Link } from 'react-router-dom'
import type { CartItemType } from '../../../redux/slices/cartSlice'

type CartItemProps = {
  index: number
  item: CartItemType
  onItemRemove: () => void
}

function CartItem ({ index, item, onItemRemove }: CartItemProps): JSX.Element {
  return (
        <tr>
            <td scope="row">{index}</td>
            <td>
                <Link to={`${import.meta.env.VITE_BASE_PATH}/catalog/${item.id}`}>{item.title}</Link>
            </td>
            <td>{item.size}</td>
            <td>{item.quantity}</td>
            <td>{item.price} руб.</td>
            <td>{item.price * item.quantity} руб.</td>
            <td>
                <button
                    onClick={onItemRemove}
                    className="btn btn-outline-danger btn-sm">
                    Удалить
                </button>
            </td>
        </tr>
  )
}

export default CartItem
