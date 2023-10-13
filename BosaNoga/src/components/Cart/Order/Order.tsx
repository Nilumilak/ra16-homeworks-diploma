import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { clearCart } from '../../../redux/slices/cartSlice'
import Preloader from '../../Preloader/Preloader'
import type { FormEvent, ChangeEvent } from 'react'
import { postOrder } from '../../../api/services'

type OrderOwnerType = {
  phone: string
  address: string
}

type OrderItemType = {
  id: number
  price: number
  count: number
}

type OrderType = {
  owner: OrderOwnerType
  items: OrderItemType[]
}

function Order (): JSX.Element {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.items)
  const [phone, setPhone] = useState<string>('+7')
  const [address, setAddress] = useState<string>('')
  const [isRulesChecked, setIsRulesChecked] = useState<boolean>(false)
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true)
  const [isAddressEmpty, setIsAddressEmpty] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [successOrder, setSuccessOrder] = useState<boolean>(false)

  const phoneIsValid: (phoneNumber: string) => boolean = (phoneNumber) => /^\+7\d{10}$/.test(phoneNumber)

  function handleSubmit (e: FormEvent): void {
    e.preventDefault()
    if (phoneIsValid(phone) && address.length > 0) {
      const owner: OrderOwnerType = { address, phone }
      const items: OrderItemType[] = cartItems.map(item => ({ id: item.id, price: item.price, count: item.quantity }))
      const requestBody: OrderType = { owner, items }

      setLoading(true)
      void postOrder(requestBody)
        .then(() => {
          setSuccessOrder(true)
          dispatch(clearCart())
        })
    } else {
      !phoneIsValid(phone) && setIsPhoneValid(false)
      !(address.length > 0) && setIsAddressEmpty(true)
    }
  }

  function handlePhoneChange (e: ChangeEvent<HTMLInputElement>): void {
    let phoneNumber = e.target.value

    phoneNumber = phoneNumber.length < 3 ? '+7' : phoneNumber
    phoneIsValid(phoneNumber) && setIsPhoneValid(true)
    !phoneIsValid(phoneNumber) && phoneNumber.length > 2 && setIsPhoneValid(false)
    setPhone(phoneNumber)
  }

  function handleAddressChange (e: ChangeEvent<HTMLInputElement>): void {
    const addressText = e.target.value
    isAddressEmpty && addressText.length > 0 && setIsAddressEmpty(false)
    setAddress(addressText)
  }

  return (
        <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }} >
                <form onSubmit={handleSubmit} className="card-body">
                    {successOrder
                      ? <div className="alert alert-success" role="alert">Заказ успешно оформлен</div>
                      : <>
                            <div className="form-group">
                                <label htmlFor="phone">Телефон</label>
                                <input value={phone} onChange={handlePhoneChange} className={`form-control ${!isPhoneValid && 'is-invalid'}`} id="phone" placeholder="Ваш телефон" />
                                <div className="invalid-feedback">Введите правильный номер телефона</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Адрес доставки</label>
                                <input value={address} onChange={handleAddressChange} className={`form-control ${isAddressEmpty && 'is-invalid'}`} id="address" placeholder="Адрес доставки" />
                                <div className="invalid-feedback">Поле не может быть пустым</div>
                            </div>
                            <div className="form-group form-check">
                                <input onChange={() => { setIsRulesChecked(!isRulesChecked) }} type="checkbox" className="form-check-input" id="agreement" />
                                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                            </div>
                            {loading ? <Preloader /> : <button disabled={!isRulesChecked || cartItems.length === 0} type="submit" className="btn btn-outline-secondary">Оформить</button>}
                        </>}
                </form>
            </div>
        </section>
  )
}

export default Order
export type { OrderType }
