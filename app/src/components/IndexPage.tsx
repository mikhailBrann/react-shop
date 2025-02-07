import HitSale from "./HitSale";
import CatalogSection from './CatalogSection';
import CatalogCategories from './CatalogCategories';

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

export default IndexPage;