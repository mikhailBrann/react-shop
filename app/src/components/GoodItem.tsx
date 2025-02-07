import uniqid from 'uniqid';
import PriceFormat from './PriceFormat';
import Preloader from './Preloader';
import { useState, useEffect } from 'react';

const GoodItem = ({item}) => {
    const detailPagePath = `/products/${item.id}.html`;
    const [isLoadingPic, setIsLoadingPic] = useState(true);
    const [imagePath, setimagePath] = useState('');

    useEffect(() => {
        const img = new Image();

        img.src = item.images[0];
        img.onload = () => {
            setimagePath(item.images[0]);
            setIsLoadingPic(false);
        };
    }, []);
    
    return(
    <div className="col-4" >
        <div className="card" key={uniqid()}>
            {isLoadingPic && <Preloader/>}
            {!isLoadingPic && imagePath && <img src={imagePath} className="card-img-top img-fluid" alt={item.title}/>}
            <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text"><PriceFormat price={item.price}/></p>
                <a href={detailPagePath} className="btn btn-outline-primary">Заказать</a>
            </div>
        </div>
    </div>
    );
}

export default GoodItem;