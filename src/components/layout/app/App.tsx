import './App.scss';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import RouterView from '../../../router/RouterView';

const App = () => {
  return (
      <div className="app" data-testid="app">
        <Sidebar />
        <main className="app__main">
          <div className="content">
            <RouterView />
          </div>
        </main>
      </div>
  );
};

export default App;
