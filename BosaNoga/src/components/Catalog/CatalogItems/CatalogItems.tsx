import Card from "../../Card/Card"
import type { CatalogItemType } from "../../../redux/slices/catalogItemsSlice"

type CatalogItemsProps = {
  items: CatalogItemType[]
}

function CatalogItems({ items }: CatalogItemsProps) {
  const catalogItemsElements = items.map(item => <Card key={item.id} item={item} isCatalogItem />)

  return (
    <div className="row">
      {catalogItemsElements}
    </div>
  )
}

export default CatalogItems