import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import {  fetchCatalog, catalogSectionSlice } from "../redux/slices/CatalogSectionSlice";
import GoodItem from "./GoodItem";
import uniqid from 'uniqid';
import Preloader from "./Preloader";
import ShowMoreButton from './ShowMoreButton';

const CatalogSection = ({children}) => {
    const { 
        catalogList, 
        catalogListLoading, 
        catalogListError,
        catalogListOffset,
        catalogListCurrentCategory,
        catalogListMoreGoods
    } = useAppSelector((state) => state.catalogSection);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCatalog(`offset=${catalogListOffset}&categoryId=${catalogListCurrentCategory}`));
    }, []);

    const handleShowMore = () => {
        const newValue = catalogListOffset + parseInt(import.meta.env.VITE_DEFAULT_GOODS_COUNT);
        dispatch(fetchCatalog(`offset=${newValue}&categoryId=${catalogListCurrentCategory}`));
        dispatch(catalogSectionSlice.actions.setCatalogListOffset(newValue));
    }

    return(
        <section className="top-catalog">
            {catalogListLoading && (<><h2 className="text-center">Каталог</h2><Preloader/></>)}
            {catalogListError && <p>{catalogListError}</p>}
            {catalogList.length > 0 && (
                <>
                <h2 className="text-center">Каталог</h2>
                {children}
                <div className="row">
                    {catalogList.map((item) => (
                        <GoodItem item={item} key={uniqid()}/>     
                    ))}
                </div>
                    {catalogListMoreGoods && 
                    <ShowMoreButton onClick={handleShowMore} disabled={catalogListLoading}/>}
                </>
            )}
        </section>
    );
}

export default CatalogSection;