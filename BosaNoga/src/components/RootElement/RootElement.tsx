import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Banner from "../Banner/Banner"
import { Outlet } from "react-router-dom"

function RootElement() {
    return (
        <>
            <Header />
            <main className="container">
                <div className="row">
                    <div className="col">
                        <Banner />
                        <Outlet />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default RootElement