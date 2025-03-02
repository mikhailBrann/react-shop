import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from './Preloader';
import GoodDetailItem from './GoodDetailItem';

const GoodDetailPage = ({children}) => {
    const { id } = useParams();
    const [good, setGood] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const requestPath = `${import.meta.env.VITE_API_URL}/api/items/${id}`;

  
    useEffect(() => {
      fetch(requestPath)
        .then((res) => res.json())
        .then((data) => {
            setGood(data);
        })
        .catch((err) => {
            setError(err);
        }).finally(() => {
          setIsLoading(false);
        });
    }, []);
  
    return(
      <main className="container">
          <div className="row">
              <div className="col">
                {children}
                {isLoading && <Preloader/>}
                {error && (<h2>Ошибка загрузки страницы!</h2>)}
                {!error && Object.keys(good).length > 0 && <GoodDetailItem item={good}/>}
              </div>
          </div>
      </main>
    );
}

export default GoodDetailPage;