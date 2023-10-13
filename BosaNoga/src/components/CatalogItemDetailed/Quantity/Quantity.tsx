type QuantityType = {
  quantity: number
  onSetQuantity: (quantity: number) => void
}

function Quantity ({ quantity, onSetQuantity }: QuantityType): JSX.Element {
  return (
        <p>Количество:
            <span className="btn-group btn-group-sm pl-2">
                <button
                    onClick={() => { quantity > 1 && onSetQuantity(--quantity) }}
                    className="btn btn-secondary">
                    -
                </button>
                <span className="btn btn-outline-primary">{quantity}</span>
                <button
                    onClick={() => { quantity < 10 && onSetQuantity(++quantity) }}
                    className="btn btn-secondary">
                    +
                </button>
            </span>
        </p>
  )
}

export default Quantity
