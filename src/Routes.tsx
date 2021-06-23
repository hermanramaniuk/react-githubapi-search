  
import { BrowserRouter, Route } from 'react-router-dom';
import { Bookmarks, RepoDetail, SearchList, UserDetail } from './pages/index';

const Routes: React.FC = () => {

  return (
    <BrowserRouter>
      <Route exact path="/" component={SearchList} />
      <Route exact path="/bookmarks" component={Bookmarks} />
      <Route exact path="/repo/:owner/:name" component={RepoDetail} />
      <Route exact path="/user/:name" component={UserDetail} />
    </BrowserRouter>
  );
};

export default Routes;