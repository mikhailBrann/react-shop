import uniqid from 'uniqid';
import PriceFormat from './PriceFormat';

const GoodItem = ({item}) => {
    return(
    <div className="col-4" >
        <div className="card" key={uniqid()}>
            <img src={item.images[0]}
                className="card-img-top img-fluid" 
                alt={item.title}/>
            <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text"><PriceFormat price={item.price}/></p>
                <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
            </div>
        </div>
    </div>
    );
}

export default GoodItem;