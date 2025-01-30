import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import { hitSalesSlice } from "../redux/slices/hitSalesSlice";

import Preloader from "./Preloader";


const HitSale = () => {
    const { 
        hitSalesList, 
        hitSalesLoading, 
        hitSalesError 
    } = useAppSelector((state) => state.hitSales);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hitSalesSlice.actions.fetchHitSales());
    }, []);

  
    return(
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {hitSalesLoading && (<Preloader/>)}
        {hitSalesError && <p>{hitSalesError}</p>}
        {hitSalesList.length > 0 && (
            <div className="row">
                {hitSalesList.map((item) => (
                    <div className="col-4">
                        <div className="card">
                        <img src={item.images[2]}
                            className="card-img-top img-fluid" alt={item.title} />
                        <div className="card-body">
                            <p className="card-text">{item.title}</p>
                            <p className="card-text">{item.price} руб.</p>
                            <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </section>
    );
}

export default HitSale;