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
import CartPage from './components/CartPage.tsx';


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
