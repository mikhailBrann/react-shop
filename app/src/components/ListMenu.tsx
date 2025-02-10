import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/defaultHook.tsx';
import {  fetchCatalog, catalogSectionSlice } from "../redux/slices/CatalogSectionSlice";

const ListMenu = ({ menu, className }: { menu: { title: string; link: string }[]; className: string }) => {
    const classSelected = ({isActive}: {isActive: boolean}) => isActive ? 'nav-link active' : 'nav-link';
    const {
        setCatalogListSearchQuery,
    } = catalogSectionSlice.actions;
    const dispatch = useAppDispatch();

    return (
      <ul className={className}>
        {menu.map((item, index) => {
          let rebootCatalogFilter = false;

          if(item.link != '/catalog.html') {
            rebootCatalogFilter = true;
            dispatch(setCatalogListSearchQuery(''));
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