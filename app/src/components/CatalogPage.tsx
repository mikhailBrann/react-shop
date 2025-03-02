import { useState } from 'react';
import { fetchCatalog, catalogSectionSlice } from "../redux/slices/CatalogSectionSlice";
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import CatalogSection from './CatalogSection';
import CatalogCategories from './CatalogCategories';

const CatalogSearch = () => {
    const [timeoutId, setTimeoutId] = useState(null|Number);
    const { 
        catalogListOffset,
        catalogListCurrentCategory,
        catalogListSearchQuery
    } = useAppSelector((state) => state.catalogSection);
    const {
        setCatalogListCurrentCategory,
        setCatalogListSearchQuery,
    } = catalogSectionSlice.actions;
    const dispatch = useAppDispatch();

    const handleSearch = (event: React.InputHTMLAttributes<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;

        if(timeoutId) {
            clearTimeout(timeoutId);
        }

        setTimeoutId(setTimeout(() => {
            dispatch(setCatalogListCurrentCategory(catalogListCurrentCategory));
            dispatch(fetchCatalog(`offset=${catalogListOffset}&categoryId=${catalogListCurrentCategory}&q=${newValue}`));
            dispatch(setCatalogListSearchQuery(newValue));
        }, 1000));
    }

    return (
        <form className="catalog-search-form form-inline">
            <input className="form-control" 
                placeholder="Поиск"
                onInput={handleSearch}
                defaultValue={catalogListSearchQuery}
                />
        </form>
    );
}

const CatalogPage = ({children}) => {
    return (
        <main className="container">
        <div className="row">
            <div className="col">
            {children}
            <CatalogSection>
                <CatalogSearch/>
                <CatalogCategories/>
            </CatalogSection>
            </div>
        </div>
        </main>
    );
}

export default CatalogPage;