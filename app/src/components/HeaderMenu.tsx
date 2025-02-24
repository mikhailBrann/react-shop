import ListMenu from "./ListMenu";
const HeaderMenu = () => {
    const headerMenu = [
      {
        title: 'Главная',
        link: '/'
      },
      {
        title: 'Каталог',
        link: '/catalog'
      },
      {
        title: 'О магазине',
        link: '/about'
      },
      {
        title: 'Контакты',
        link: '/contacts'
      }
    ];
  
    return(
      <ListMenu menu={headerMenu} className="navbar-nav mr-auto" />
    );
}

export default HeaderMenu;