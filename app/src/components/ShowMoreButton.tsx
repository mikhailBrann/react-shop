import Preloader from "./Preloader";

const ShowMoreButton = ({onClick, disabled=false}) => {
    return(
        <>
            <>{disabled && <Preloader />}</>
            <div className="text-center">
                <button 
                className="btn btn-outline-primary" 
                onClick={onClick} 
                disabled={disabled}
                style={disabled ? {pointerEvents: 'none'} : {}}>
                    Показать ещё
                </button>
            </div>
        </>
    );
}

export default ShowMoreButton;