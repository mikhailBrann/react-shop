import { NavLink } from 'react-router-dom';
const ListMenu = ({ menu, className }: { menu: { title: string; link: string }[]; className: string }) => {
    const classSelected = ({isActive}: {isActive: boolean}) => isActive ? 'nav-link active' : 'nav-link';
  
    return (
      <ul className={className}>
        {menu.map((item, index) => {
          let rebootCatalogFilter = false;

          if(item.link != '/catalog.html') {
            rebootCatalogFilter = true;
          }

          return (
            <li key={index} className="nav-item">
              <NavLink 
                to={item.link}
                state={{ rebootCatalogFilter }} 
                className={classSelected}>
                  {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
};

export default ListMenu;