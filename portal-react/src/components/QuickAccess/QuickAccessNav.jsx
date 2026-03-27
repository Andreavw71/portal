import { useState } from 'react';
import { quickAccessItems, subMenus } from '../../data/servicesData';
import SecondaryMenu from './SecondaryMenu';

export default function QuickAccessNav() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleToggle = (submenuId, e) => {
    e.preventDefault();
    setActiveSubmenu(activeSubmenu === submenuId ? null : submenuId);
  };

  return (
    <>
      <nav className="quick-access-nav" role="navigation" aria-label="Acesso rápido aos serviços">
        <div className="quick-access-container">
          {quickAccessItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}-options`}
              className={`menu-box main-category ${activeSubmenu === item.submenuId ? 'active' : ''}`}
              onClick={(e) => handleToggle(item.submenuId, e)}
            >
              <span className="material-icons-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
      <div className="secondary-menu-area">
        {Object.entries(subMenus).map(([id, menu]) => (
          <SecondaryMenu
            key={id}
            id={id}
            title={menu.title}
            items={menu.items}
            visible={activeSubmenu === id}
            onClose={() => setActiveSubmenu(null)}
          />
        ))}
      </div>
    </>
  );
}
