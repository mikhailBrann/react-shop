import { useAppSelector, useAppDispatch } from '../hooks/defaultHook.tsx';
import { useState } from 'react';
import CartList from './CartList.tsx';
import { clearCartList } from '../redux/slices/CartSlice.tsx';
import Preloader from './Preloader.tsx';

const CartPage = ({children}) => {
    const [isAgree, setIsAgree] = useState(true);
    const [formSendLoading, setFormSendLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [formSucess, setFormSucess] = useState('');
    const { 
        cartList
    } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const handleSendOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const phone = form.elements.namedItem('phone')?.value;
        const address = form.elements.namedItem('address')?.value;
        const orderUrl = import.meta.env.VITE_API_URL + "/api/order";
        const items = cartList.map(item => {
            return {
                id: item.id,
                size: item.size,
                price: item.price,
                count: item.quantity
            }
        });
        const data = {
            owner: {
                phone,
                address,
            },
            items
        }

        try {
            setFormSendLoading(true);
            setFormError('');

            const response = await fetch(orderUrl, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response;
            
            if (response.ok) {
                setFormSucess("Заказ успешно отправлен!");
                dispatch(clearCartList());
                setIsAgree(true);
            } else {
                const errorMessage = result.error || result.message || 'Неизвестная ошибка';
                setFormError(errorMessage);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ошибка соединения с сервером'
            setFormError(errorMessage);
        } finally {
            setFormSendLoading(false);
        }
    }

    const handleAgrree = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.currentTarget.checked ? setIsAgree(false) : setIsAgree(true);
    }

    return(
    <main className="container">
        <div className="row">
            <div className="col">
                {children}
                <CartList goodsList={cartList}/>
                <section className="order">
                    <h2 className="text-center">Оформить заказ</h2>
                    <div className="card" style={{"maxWidth": "30rem", "margin": "0 auto"}}>
                        {formSendLoading && <Preloader/>}
                        {!formSendLoading && (
                            <form className="card-body" onSubmit={handleSendOrder}>
                                <h3 style={{color: "red"}}>{formError}</h3>
                                <h3 style={{color: "green"}}>{formSucess}</h3>
                                <div className="form-group">
                                    <label htmlFor="phone">Телефон</label>
                                    <input className="form-control" id="phone" placeholder="Ваш телефон" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Адрес доставки</label>
                                    <input className="form-control" id="address" placeholder="Адрес доставки" required/>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="agreement" onChange={handleAgrree}/>
                                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                                </div>
                                <button type="submit" className="btn btn-outline-secondary" disabled={isAgree}>Оформить</button>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </div>
    </main>
    );
}

export default CartPage;