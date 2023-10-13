type SizeProps = {
  size: string
  selectedSize: string
  onChangeSelectedSize: (size: string) => void
}

function Size ({ size, selectedSize, onChangeSelectedSize }: SizeProps): JSX.Element {
  return (
        <span
            onClick={() => { onChangeSelectedSize(size) }}
            className={`catalog-item-size ${size === selectedSize && 'selected'}`}>
            {size}
        </span>
  )
}

export default Size
