import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import Navbar from './Navbar/Navbar'
import SearchForm from './SearchForm/SearchForm'
import CartHeader from './CartHeader/CartHeader'
import * as headerLogo from './img/header-logo.png'
import './Header.css'

function Header (): JSX.Element {
  const state = useAppSelector(state => state.cart)
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
                                    <CartHeader quantity={state.items.length} />
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
