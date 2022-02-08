import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import routes from './routes';

import Tags from '../components/views/examples/Examples';

const RouterView = () => {
  return (<Routes>
    <Route path={routes.examples.path} element={<Tags />} />
  </Routes>);
};

export default RouterView;
