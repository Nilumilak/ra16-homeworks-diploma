type TopSalesProps = {
    content: JSX.Element
}

function TopSales({ content }: TopSalesProps) {
    return (
        <section className="top-sales">
            {content}
        </section>
    )
}

export default TopSales
