import uniqid from 'uniqid';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import { fetchCatalog, catalogSectionSlice } from "../redux/slices/CatalogSectionSlice";

const CatalogCategories = () => {
    const { 
        catalogCategoryList, 
        catalogListCurrentCategory,
        catalogListOffset,
        catalogListSearchQuery 
    } = useAppSelector((state) => state.catalogSection);
    const {
        setCatalogListCurrentCategory,
        setCatalogListOffset,
        setCatalogListSearchQuery
    } = catalogSectionSlice.actions;
    const dispatch = useAppDispatch();
    const getCategories = async () => {
        const request = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
        const response = await request.json();
        dispatch(catalogSectionSlice.actions.setCatalogCategoryList(response));
    }
    const handleCategoryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const categoryId = parseInt(event.currentTarget?.dataset?.id);

        dispatch(setCatalogListCurrentCategory(categoryId));
        dispatch(setCatalogListOffset(0));
        dispatch(fetchCatalog(`offset=0&categoryId=${categoryId}&q=${catalogListSearchQuery}`));
    }

    useEffect(() => {
        getCategories();
    }, []);


    return(
        <>
        {catalogCategoryList?.length > 0 && (
            <ul className="catalog-categories nav justify-content-center">
                <li className="nav-item" key={uniqid()}>
                    <a className={catalogListCurrentCategory === 0 ? "nav-link active" : "nav-link"}  
                        href="#"
                        data-id="0"
                        onClick={handleCategoryClick}>
                        Все
                    </a>
                </li>
                {catalogCategoryList.map((item) => (
                    <li className="nav-item" key={uniqid()}>
                        <a className={catalogListCurrentCategory === item?.id ? "nav-link active" : "nav-link"} 
                            href="#"
                            data-id={item?.id}
                            onClick={handleCategoryClick}>
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        )}
        </>
    );
}


export default CatalogCategories;