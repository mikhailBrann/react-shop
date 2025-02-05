import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
