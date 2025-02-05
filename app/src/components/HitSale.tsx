import uniqid from 'uniqid';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import { hitSalesSlice, fetchHitSales } from "../redux/slices/hitSalesSlice";

import Preloader from "./Preloader";
import GoodItem from "./GoodItem";

const HitSale = () => {
    const { 
        hitSalesList, 
        hitSalesLoading, 
        hitSalesError 
    } = useAppSelector((state) => state.hitSales);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchHitSales());
    }, []);

    return(
      <section className="top-sales">
        {hitSalesLoading && (<><h2 className="text-center">Хиты продаж!</h2><Preloader/></>)}
        {hitSalesError && <p>{hitSalesError}</p>}
        {hitSalesList.length > 0 && (
            <>
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
                {hitSalesList.map((item) => (
                    <GoodItem item={item} key={uniqid()}/>
                ))}
            </div>
            </>
        )}
      </section>
    );
}
export default HitSale;