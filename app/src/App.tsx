import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import AboutPage from './components/AboutPage';
import Page404 from './components/Page404';
import Banner from './components/Banner';
import ContactsPage from './components/ContactsPage';
import Footer from './components/Footer';
import Header from './components/Header';
import HeaderMenu from './components/HeaderMenu';
import FooterMenu from './components/FooterMenu';

import HitSale from './components/HitSale';
import CatalogSection from './components/CatalogSection';
import CatalogCategories from './components/CatalogCategories';


const RouteFish = () => {
  return(
    <div>
      <h1>Fish</h1>
    </div>
  );
}



const IndexPage = ({children}) => {
  return(
    <main className="container">
      <div className="row">
        <div className="col">
          { children }
          <HitSale/>
          <CatalogSection>
            <CatalogCategories/>
          </CatalogSection>
        </div>
      </div>
    </main>
  );
}

const GoodDetail = ({children}) => {
  const { id } = useParams();

  return(
    <main className="container">
        <div className="row">
            <div className="col">
                {children}
                <section className="catalog-item">
                    <h2 className="text-center">Босоножки 'MYER'</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src=".././img/products/sandals_myer.jpg"
                                className="img-fluid" alt=""/>
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>1000046</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>PAUL ANDREW</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>Чёрный</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>Кожа</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>Лето</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>Прогулка</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p>Размеры в наличии: <span className="catalog-item-size selected">18 US</span> <span className="catalog-item-size">20 US</span></p>
                                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                        <button className="btn btn-secondary">-</button>
                                        <span className="btn btn-outline-primary">1</span>
                                        <button className="btn btn-secondary">+</button>
                                    </span>
                                </p>
                            </div>
                            <button className="btn btn-danger btn-block btn-lg">В корзину</button>
                        </div>
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
            <Route path="/catalog.html" element={<RouteFish />} />
            <Route path="/products/:id.html" element={<GoodDetail><DefaultBanner/></GoodDetail>} />
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
