import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import {  fetchCatalog, catalogSectionSlice } from "../redux/slices/CatalogSectionSlice";
import GoodItem from "./GoodItem";
import uniqid from 'uniqid';
import Preloader from "./Preloader";
import ShowMoreButton from './ShowMoreButton';

const CatalogSection = ({children}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { 
        catalogList, 
        catalogListLoading, 
        catalogListError,
        catalogListOffset,
        catalogListCurrentCategory,
        catalogListMoreGoods,
        catalogListSearchQuery
    } = useAppSelector((state) => state.catalogSection);
    const {
        setCatalogListOffset,
        setCatalogListSearchQuery,
        setCatalogListCurrentCategory,
    } = catalogSectionSlice.actions;
    const dispatch = useAppDispatch();
    const location = useLocation();
    const rebootCatalogFilter = location.state?.rebootCatalogFilter;
    const queryParams = new URLSearchParams(location.search);
    const headerSearchQuery = queryParams.get('searchQuery');

    const handleShowMore = () => {
        const newValue = catalogListOffset + parseInt(import.meta.env.VITE_DEFAULT_GOODS_COUNT);

        dispatch(fetchCatalog(`offset=${newValue}&categoryId=${catalogListCurrentCategory}&q=${catalogListSearchQuery}`));
        dispatch(setCatalogListOffset(newValue));
    }

    const checkQueryParams = (queryValue: string) => {
        dispatch(setCatalogListSearchQuery(queryValue));
        dispatch(setCatalogListOffset(0));
        dispatch(setCatalogListCurrentCategory(catalogListCurrentCategory));
        dispatch(fetchCatalog(`offset=${catalogListOffset}&categoryId=${catalogListCurrentCategory}&q=${queryValue}`));
        setSearchParams({});
    }

    const setRebootCatalogFilter = (
            catalogListCurrentCategory, 
            catalogListSearchQuery, 
            catalogListOffset
        ) => {
        dispatch(setCatalogListSearchQuery(""));
        dispatch(setCatalogListOffset(0));
        dispatch(setCatalogListCurrentCategory(catalogListCurrentCategory));
        dispatch(fetchCatalog(`offset=${catalogListOffset}&categoryId=${catalogListCurrentCategory}&q=${catalogListSearchQuery}`));
    }

    useEffect(() => {
        if (rebootCatalogFilter) {
            setRebootCatalogFilter(catalogListCurrentCategory, catalogListSearchQuery, catalogListOffset);
        } else if (headerSearchQuery) {
            checkQueryParams(headerSearchQuery);
        } else {
            dispatch(fetchCatalog(`offset=${catalogListOffset}&categoryId=${catalogListCurrentCategory}`));
        }
    }, []);


    return(
        <section className="top-catalog">
            <h2 className="text-center">Каталог</h2>
            {children}
            {catalogListError && <><h2>{catalogListError}</h2></>}
            {catalogList.length > 0 && (
                <>
                <div className="row">
                    {catalogList.map((item) => (
                        <GoodItem item={item} key={uniqid()}/>     
                    ))}
                </div>
                    {(catalogListMoreGoods && !catalogListLoading) &&
                    <ShowMoreButton onClick={handleShowMore} disabled={catalogListLoading}/>}
                </>
            )}
            {(catalogList.length <= 0 && !catalogListLoading && !catalogListError) && (
                <>
                <h2>Товаров не найдено</h2>
                </>
            )}
            {catalogListLoading && (<Preloader/>)}
        </section>
    );
}

export default CatalogSection;