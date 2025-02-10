import uniqid from 'uniqid';

const ShowSKU = ({skuTitle, skuValue}) => {
    if (skuTitle && skuValue) {
        return (
            <tr key={uniqid()}>
                <td>{skuTitle}</td>
                <td>{skuValue}</td>
            </tr>
        );
    }
}

export default ShowSKU;