import CatalogSection from './CatalogSection';
import CatalogCategories from './CatalogCategories';

const CatalogPage = ({children}) => {
    return (
        <main className="container">
        <div className="row">
            <div className="col">
            {children}
            <CatalogSection>
                <form className="catalog-search-form form-inline">
                <input className="form-control" placeholder="Поиск"/>
                </form>
                <CatalogCategories/>
            </CatalogSection>
            </div>
        </div>
        </main>
    );
}

export default CatalogPage;