import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IndexPage from './components/IndexPage';
import CatalogPage from './components/CatalogPage';
import GoodDetailPage from './components/GoodDetailPage';
import AboutPage from './components/AboutPage';
import Page404 from './components/Page404';
import Banner from './components/Banner';
import ContactsPage from './components/ContactsPage';
import Footer from './components/Footer';
import Header from './components/Header';
import HeaderMenu from './components/HeaderMenu';
import FooterMenu from './components/FooterMenu';

import cartSlice from './redux/slices/CartSlice';
import { addItemToCartList, removeItemToCartList } from './redux/slices/CartSlice';
import { useAppDispatch, useAppSelector } from './hooks/defaultHook.tsx';
import uniqid from 'uniqid';
import PriceFormat from './components/PriceFormat.tsx';

const CartList = ({goodsList}) => {
  const dispatch = useAppDispatch();

  const goodsListSumm = goodsList.reduce((sum, good) => {
    return sum + (good.price * good.quantity);
  }, 0);

  const handleRemoveToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const curentElem = event.currentTarget;
    const goodId = curentElem.dataset.goodId;
    const good = goodsList.filter(item => item.id == goodId);

    if(good.length !== 0) {
      dispatch(removeItemToCartList(good[0]))
    }
  }

  return(
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      {goodsList && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {goodsList.map(good => {
              const goodUrl = `/products/${good.id}.html`;
              const goodSum = good.price * good.quantity;

              return (<tr key={uniqid()}>
                <td scope="row">1</td>
                <td><a href={goodUrl}>{good.title}</a></td>
                <td>{good.size}</td>
                <td>{good.quantity}</td>
                <td><PriceFormat price={good.price}/></td>
                <td><PriceFormat price={goodSum}/></td>
                <td>
                  <button className="btn btn-outline-danger btn-sm"
                    data-good-id={good.id}
                    onClick={handleRemoveToCart}>
                    Удалить
                  </button>
                </td>
              </tr>);
            })}
            
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td><PriceFormat price={goodsListSumm}/></td>
            </tr>
          </tbody>
        </table>
      )}
      

    </section>
  );
}

const CartPage = ({children}) => {
  const { 
      cartList,
      cartCount
  } = useAppSelector((state) => state.cart);

  return(
    <main className="container">
      <div className="row">
        <div className="col">
          {children}
          <CartList goodsList={cartList}/>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{"maxWidth": "30rem", "margin": "0 auto"}}>
              <form className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" id="phone" placeholder="Ваш телефон"/>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" id="address" placeholder="Адрес доставки"/>
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="agreement"/>
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Оформить</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}




function App() {
  const DefaultBanner = () => <Banner props={{path: '/img/banner.jpg', alt: 'К весне готовы!', title: 'К весне готовы!'}}/>;

  return (
    <>
    <Router>
      <Header>
        <HeaderMenu/>
      </Header>
      <Routes>
            <Route path="/" exact element={<IndexPage ><DefaultBanner/></IndexPage >} />
            <Route path="/catalog.html" element={<CatalogPage><DefaultBanner/></CatalogPage>} />
            <Route path="/products/:id.html" element={<GoodDetailPage><DefaultBanner/></GoodDetailPage>} />
            <Route path="/cart.html" element={<CartPage/>} />
            <Route path="/about.html" element={<AboutPage><DefaultBanner/></AboutPage>} />
            <Route path="/contacts.html" element={<ContactsPage><DefaultBanner/></ContactsPage>} />
            <Route path='*' exact={true} element={<Page404><DefaultBanner/></Page404>} />
      </Routes>
      <Footer>
        <FooterMenu/>
      </Footer>
    </Router>   
    </>
  )
}

export default App
