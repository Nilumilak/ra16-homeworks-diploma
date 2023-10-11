import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import SearchForm from './SearchForm/SearchForm'
import * as headerLogo from './img/header-logo.png'
import './Header.css'

function Header (): JSX.Element {
  const [activeSearchField, setActiveSearchField] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClick (): void {
    setActiveSearchField(!activeSearchField)
  }

  useEffect(() => {
    if (activeSearchField) {
      inputRef.current?.focus()
    }
  }, [activeSearchField])

  return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <Link className="navbar-brand" to="/">
                            <img src={headerLogo.default} alt="Bosa Noga" />
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarMain">
                            <Navbar />
                            <div>
                                <div className="header-controls-pics">
                                    <div onClick={handleClick} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                    {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                                    <div className="header-controls-pic header-controls-cart">
                                        <div className="header-controls-cart-full">1</div>
                                        <div className="header-controls-cart-menu"></div>
                                    </div>
                                </div>
                                {activeSearchField && <SearchForm inputRef={inputRef} setSelfActive={setActiveSearchField} />}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
  )
}

export default Header
