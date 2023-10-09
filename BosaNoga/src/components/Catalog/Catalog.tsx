import Categories from "./Categories/Categories"
import CatalogItems from "./CatalogItems/CatalogItems"
import LoadMoreItems from "./LoadMoreItems/LoadMoreItems"
import { useAppSelector } from "../../redux/hooks"

function Catalog() {
  const state = useAppSelector(state => state.catalogItems)

  const hasMoreItems = state.catalogItems.length % 6 === 0

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <Categories />
      <CatalogItems items={state.catalogItems}/>
      {hasMoreItems ? <LoadMoreItems /> : null}
    </section>
  )
}

export default Catalog