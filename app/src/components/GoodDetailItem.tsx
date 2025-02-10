import uniqid from 'uniqid';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import { useNavigate } from 'react-router-dom';
import Preloader from './Preloader';
import ShowSKU from './ShowSKU';
import { cartSlice } from '../redux/slices/CartSlice';


const GoodDetailItem = ({item}) => {
    const [isLoadingPic, setIsLoadingPic] = useState(true);
    const [imagePath, setimagePath] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [goodCount, setGoodCount] = useState(1);
    const navigate = useNavigate();
    const { 
        cartList,
        cartCount
    } = useAppSelector((state) => state.cart);
    const {
        addItemToCartList,
        removeItemToCartList,
    } = cartSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkAndLoadImage = async () => {
            try {
                const staticPath = item?.images[0].match(/\/img.*/)[0];
                const response = await fetch(staticPath);

                if (!response.ok) {
                    setIsLoadingPic(item.images[0]);
                }

                setimagePath(staticPath);
            } catch (error) {
                setIsLoadingPic(item.images[0]);
            } finally {
                setIsLoadingPic(false);
            }
        };
      
        checkAndLoadImage();
    }, []);

    const handleSizeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newValue = event.currentTarget.dataset.size ?? '';

        if (newValue != selectedSize) {
            setSelectedSize(newValue);
        }
    }
    const handleCountChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        const elem = event.currentTarget;
        const direction = elem.dataset.direction ?? '';

        switch (direction) {
            case 'add':
                if(goodCount >= 10) {
                    break;
                }

                setGoodCount(goodCount + 1);
                break;
            case 'remove':
                if (goodCount <= 1) {
                    break;
                }

                setGoodCount(goodCount - 1);                
                break;
            default:
                break;
        }
    }
    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        const currentElem = event.currentTarget;
        const good = {
            id: item.id,
            title: item.title,
            price: item.price,
            size: selectedSize,
            quantity: goodCount,
        };

        dispatch(addItemToCartList(good));
        navigate(`/cart.html`);
    }

    return (
    <section className="catalog-item" key={uniqid()}>
        <h2 className="text-center">{item.title}</h2>
        <div className="row">
            <div className="col-5">
                {isLoadingPic && <Preloader/>}
                {!isLoadingPic && imagePath && <img src={imagePath} className="img-fluid" alt=""/>}
            </div>
            <div className="col-7">
                <table className="table table-bordered">
                    <tbody>
                        <ShowSKU skuTitle="Артикул" skuValue={item?.sku}/>
                        <ShowSKU skuTitle="Производитель" skuValue={item?.manufacturer}/>
                        <ShowSKU skuTitle="Цвет" skuValue={item?.color}/>
                        <ShowSKU skuTitle="Материалы" skuValue={item?.material}/>
                        <ShowSKU skuTitle="Сезон" skuValue={item?.season}/>
                        <ShowSKU skuTitle="Повод" skuValue={item?.reason}/>
                        <ShowSKU skuTitle="Высота каблука" skuValue={item?.heelSize}/>
                    </tbody>
                </table>
                <div className="text-center">
                    {item?.sizes && item.sizes.length > 0 && (
                        <p>Размеры в наличии: 
                            { item?.sizes.map((sizeObj) => {
                                const {size, available} = sizeObj;
                                 
                                if(available) {
                                    return <span data-size={size}
                                        className={`${(selectedSize ? 'selected' : '')} catalog-item-size`} 
                                        onClick={handleSizeClick}
                                        key={uniqid()}>
                                        {size}
                                    </span>
                                }
                            })}
                        </p>
                    )}

                    <p>Количество: 
                        <span className="btn-group btn-group-sm pl-2">
                            <button className="btn btn-secondary" 
                                data-direction="remove"
                                onClick={handleCountChange}>
                                -
                            </button>
                            <span className="btn btn-outline-primary">{goodCount}</span>
                            <button className="btn btn-secondary" 
                                data-direction="add"
                                onClick={handleCountChange}>
                                +
                            </button>
                        </span>
                    </p>
                </div>
                {selectedSize && <button className="btn btn-danger btn-block btn-lg" onClick={handleAddToCart}>В корзину</button>}
            </div>
        </div>
    </section>
    );
}

export default GoodDetailItem;