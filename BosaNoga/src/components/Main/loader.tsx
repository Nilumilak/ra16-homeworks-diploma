import { loader as topSalesLoader } from "../TopSales/loader";
import { loader as categoriesLoader } from "../Catalog/Categories/loader";


async function loader() {
    topSalesLoader()
    categoriesLoader()
    return null
}

export { loader }
