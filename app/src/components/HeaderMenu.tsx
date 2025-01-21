import ListMenu from "./ListMenu";
const HeaderMenu = () => {
    const headerMenu = [
      {
        title: 'Главная',
        link: '/'
      },
      {
        title: 'Каталог',
        link: '/catalog.html'
      },
      {
        title: 'О магазине',
        link: '/about.html'
      },
      {
        title: 'Контакты',
        link: '/contacts.html'
      }
    ];
  
  
    return(
      <ListMenu menu={headerMenu} className="navbar-nav mr-auto" />
    );
}

export default HeaderMenu;