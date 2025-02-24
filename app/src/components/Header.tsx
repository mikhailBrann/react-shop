import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/defaultHook.tsx';

const Header = ({children}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const { cartCount } = useAppSelector((state) => state.cart);

    const setSearchQueryHandler = () => {
        setShowForm(true);

        if(!searchQuery && showForm) {
          setShowForm(false);
        }

        if(searchQuery) {
          setShowForm(false);
          setSearchQuery('');
          navigate(`/catalog?searchQuery=${searchQuery}`);
        }
    }

    const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setSearchQueryHandler();
    }

    const handlePressKey = (event: React.KeyboardEvent) => {
      if (event.key !== 'Enter') {
        return;
      }

      event.preventDefault();
      setSearchQueryHandler();
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const newValue = event.currentTarget.value;

        setSearchQuery(newValue);
    }

    return (
      <header className="container" onKeyPress={handlePressKey}>
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <a className="navbar-brand" href="/">
                <img src="/img/header-logo.png" alt="Bosa Noga"/>
              </a>
              <div className="collapse navbar-collapse" id="navbarMain">
                {children}
                <div>
                  <div className="header-controls-pics">
                    <div data-id="search-expander" 
                      className="header-controls-pic header-controls-search"
                      onClick={handleSearchClick}>
                    </div>
                    <div className="header-controls-pic header-controls-cart">
                      { cartCount > 0 && (<div className="header-controls-cart-full">{cartCount}</div>)}
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </div>
                  <form data-id="search-form" 
                    className={(showForm ? "" : "invisible ") + "header-controls-search-form form-inline"}>
                    <input className="form-control" 
                      placeholder="Поиск"
                      onChange={handleSearchChange}/>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    )
}

export default Header;