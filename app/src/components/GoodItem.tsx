import uniqid from 'uniqid';
import PriceFormat from './PriceFormat';

const GoodItem = ({item}) => {
    const detailPagePath = `/products/${item.id}.html`;

    return(
    <div className="col-4" >
        <div className="card" key={uniqid()}>
            <img src={item.images[0]}
                className="card-img-top img-fluid" 
                alt={item.title}/>
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