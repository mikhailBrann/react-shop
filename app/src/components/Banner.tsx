const Banner = ({props}: {props: any}) => {
    return (
      <div className="banner">
        <img src={props?.path} className="img-fluid" alt={props?.alt}/>
        <h2 className="banner-header">{props?.title}</h2>
      </div>
    );
}

export default Banner;