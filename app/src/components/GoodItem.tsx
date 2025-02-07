import uniqid from 'uniqid';
import PriceFormat from './PriceFormat';
import Preloader from './Preloader';
import { useState, useEffect } from 'react';

const GoodItem = ({item}) => {
    const detailPagePath = `/products/${item.id}.html`;
    const [isLoadingPic, setIsLoadingPic] = useState(true);
    const [imagePath, setimagePath] = useState('');

    useEffect(() => {
        const checkAndLoadImage = async () => {
            try {
                const staticPath = item?.images[0].match(/\/img.*/)[0];
                const response = await fetch(staticPath);

                if (!response.ok) {
                    // Если локальное изображение не найдено, используем GitHub версию
                    setimagePath(item.images[0]);
                }

                setTimeout(() => {
                    setimagePath(staticPath);
                }, 1000);
        
                
            } catch (error) {
                // В случае ошибки также используем GitHub версию
                setimagePath(item.images[0]);
            } finally {
                setIsLoadingPic(false);
            }
        };
      
        checkAndLoadImage();
    }, []);
    
    return(
        <>
        {!isLoadingPic && (
            <div className="col-4" >
                <div className="card" key={uniqid()}>  
                    {imagePath && <img src={imagePath} className="card-img-top img-fluid" alt={item.title}/>}
                    <div className="card-body">
                        <p className="card-text">{item.title}</p>
                        <p className="card-text"><PriceFormat price={item.price}/></p>
                        <a href={detailPagePath} className="btn btn-outline-primary">Заказать</a>
                    </div>
                </div>
            </div>
        )}
    </> 
    );
}

export default GoodItem;