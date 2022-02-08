import './sidebar.scss';
import Nav from '../nav/Nav';

const Sidebar = () => {
  return (
      <aside className="sidebar">
        <header className="sidebar__header">
          <div className="sidebar__company-name">Example MVP</div>
          <div className="sidebar__subtitle">ACME Inc.</div>
        </header>
        <Nav />
      </aside>
  );
};

export default Sidebar;