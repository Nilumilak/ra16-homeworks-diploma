import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { removeCartItem } from '../../redux/slices/cartSlice'
import CartItem from './CartItem/CartItem'
import Order from './Order/Order'

function Cart (): JSX.Element {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.cart)

  return (
        <>
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Кол-во</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Итого</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.items.map((cartItem, index) =>
                            <CartItem
                                key={cartItem.id}
                                index={++index}
                                item={cartItem}
                                onItemRemove={() => dispatch(removeCartItem({ item: cartItem }))}
                            />)}
                        <tr>
                            <td colSpan={5} className="text-right">Общая стоимость</td>
                            <td>{state.fullPrice} руб.</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <Order />
        </>
  )
}

export default Cart
