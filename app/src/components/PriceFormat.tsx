const PriceFormat = ({price}): string|number => {
    return(
        <>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} руб.</>
    );
}

export default PriceFormat;