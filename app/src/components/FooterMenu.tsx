import ListMenu from './ListMenu';
const FooterMenu = () => {
    const footerMenu = [
      {
        title: 'О магазине',
        link: '/about'
      },
      {
        title: 'Каталог',
        link: '/catalog'
      },
      {
        title: 'Контакты',
        link: '/contacts'
      }
    ];
  
    return (
      <section>
        <h5>Информация</h5>
        <ListMenu menu={footerMenu} className="nav flex-column" />
      </section>
    );
}

export default FooterMenu;