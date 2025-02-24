import { removeItemToCartList } from '../redux/slices/CartSlice';
import { useAppDispatch } from '../hooks/defaultHook.tsx';
import uniqid from 'uniqid';
import PriceFormat from './PriceFormat.tsx';

const CartList = ({goodsList}) => {
    const dispatch = useAppDispatch();
  
    const goodsListSumm = goodsList.reduce((sum, good) => {
      return sum + (good.price * good.quantity);
    }, 0);
  
    const handleRemoveToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
      const curentElem = event.currentTarget;
      const goodId = curentElem.dataset.goodId;
      const good = goodsList.filter(item => item.id == goodId);
  
      if(good.length !== 0) {
        dispatch(removeItemToCartList(good[0]))
      }
    }
  
    return(
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {goodsList && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {goodsList.map(good => {
                const goodUrl = `/products/${good.id}`;
                const goodSum = good.price * good.quantity;
  
                return (<tr key={uniqid()}>
                  <td scope="row">1</td>
                  <td><a href={goodUrl}>{good.title}</a></td>
                  <td>{good.size}</td>
                  <td>{good.quantity}</td>
                  <td><PriceFormat price={good.price}/></td>
                  <td><PriceFormat price={goodSum}/></td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm"
                      data-good-id={good.id}
                      onClick={handleRemoveToCart}>
                      Удалить
                    </button>
                  </td>
                </tr>);
              })}
              
              <tr>
                <td colSpan="5" className="text-right">Общая стоимость</td>
                <td><PriceFormat price={goodsListSumm}/></td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
    );
}

export default CartList;