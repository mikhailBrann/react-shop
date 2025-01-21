import ListMenu from './ListMenu';
const FooterMenu = () => {
    const footerMenu = [
      {
        title: 'О магазине',
        link: '/about.html'
      },
      {
        title: 'Каталог',
        link: '/catalog.html'
      },
      {
        title: 'Контакты',
        link: '/contacts.html'
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