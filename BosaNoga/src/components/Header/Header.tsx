import Navbar from '../Navbar/Navbar';
import * as headerLogo from './img/header-logo.png';
import './Header.css'


function Header() {
    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <a className="navbar-brand" href="/">
                            <img src={headerLogo.default} alt="Bosa Noga" />
                        </a>
                        <div className="collapse navbar-collapse" id="navbarMain">
                            <Navbar />
                            <div>
                                <div className="header-controls-pics">
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                    {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                                    <div className="header-controls-pic header-controls-cart">
                                        <div className="header-controls-cart-full">1</div>
                                        <div className="header-controls-cart-menu"></div>
                                    </div>
                                </div>
                                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                                    <input className="form-control" placeholder="Поиск" />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header