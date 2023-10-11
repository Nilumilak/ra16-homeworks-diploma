import type { TopSaleType } from '../../redux/slices/topSalesSlice'

type CardProps = {
  item: TopSaleType
  isCatalogItem: boolean
}

function Card ({ item, isCatalogItem }: CardProps): JSX.Element {
  return (
        <div className="col-4">
            <div className={isCatalogItem ? 'card catalog-item-card' : 'card'}>
                <img src={item.images[0]}
                    className="card-img-top img-fluid" alt={item.title} />
                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{item.price} руб.</p>
                    <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                </div>
            </div>
        </div>
  )
}

Card.defaultProps = {
  isCatalogItem: false
}

export default Card
