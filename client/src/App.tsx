import { render }      from '@testing-library/react';
import React           from 'react';
import DonatePage      from './pages/donate';
import HomePage        from './pages/home';
import DonatersPage    from './pages/donaters';
import { BsHeartFill } from 'react-icons/bs';

import {
  BrowserRouter as Router,
  Routes        as Switch,
  Route,
  Link,
} from "react-router-dom";

import './App.scss';


class App extends React.Component
{
  render( ) : JSX.Element
  {
    const TS = <>
      <h3 style={{ color: '#ffde25'         }}> T </h3>
      <h3 style={{ color: 'rgb(1, 97, 207)' }}> S </h3>
    </>;

    return (
      <>
        <Router>
          <div >
            <nav className='main-navbar'>
              <Link to="/"         > Home     </Link>
              <Link to="/donate"   > Donate   </Link>
              <Link to="/donaters" > Donaters </Link>
            </nav>

            <Switch>
              <Route path='/donate'   element={<DonatePage /> } />
              <Route path='/donaters' element={<DonatersPage /> } />
              <Route path='*'         element={<HomePage /> } />
            </Switch>
          </div>
        </Router>
        <div className="reference-footer">
            <span className="reference-footer-link"><h4 className='tslink' > Language: <a href="https://www.typescriptlang.org/"> TS        </a></h4> </span>
            <span className="reference-footer-link"><h4                    > Client:   <a href="https://reactjs.org/"           > React     </a></h4> </span>
            <span className="reference-footer-link"><h4                    > Server:   <a href="https://expressjs.com/"         > Express   </a></h4> </span> 
            <span className="reference-footer-link"><h4                    > ORM:      <a href="https://sequelize.org/"         > Sequelize </a></h4> </span>
            <span className="reference-footer-link"><h4                    > DB:       <a href="https://www.sqlite.org/"        > SQLite    </a></h4> </span>
            
            <span className="reference-footer-link">
              <h4 className='author' >           
                <a href="https://github.com/grdvsng"     > auth<BsHeartFill className="author-logo" onClick={ ( ) => window.open( "https://www.youtube.com/watch?v=SFe-108zQSI" ) }/>r    
                </a>
              </h4> 
            </span>
        </div>
      </>
    );
  }
}

export default App;
