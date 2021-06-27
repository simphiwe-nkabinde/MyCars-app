import CarGroup from "./components/CarGroup";
import CarNew from './components/CarNew';
import Login from "./components/Login";
import About from "./components/About";
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <header className="bg-danger text-center shadow-sm py-2">
        <a href='/' className='text-decoration-none'><h1 className="display-2 text-light "><span className="btn-outline-light bg-danger">My Cars App</span></h1></a>
        <p className="lead text-light">Build a collection of your favourite cars</p>
      </header>

      <div className="d-sm-flex justify-content-between">
        {/* alert component. displays success and error messages for user */}
        <div className="alert alert-primary alert-dismissible fade m-2 shadow-sm" id="alertMessage" role="alert">
          <span></span>
          <button 
            className="btn-close" 
            onClick={()=> {document.getElementById('alertMessage').classList.remove('show')}}>
          </button>
        </div>
        <Login/>        
      </div>

      <BrowserRouter>
        <div className="container">
          <Route path='/' exact={true} component={CarGroup}/>
          <Route exact={true} path='/create' component={CarNew}/>
          <Route path='/about' component={About}/>
        </div>      
      </BrowserRouter>

      <footer className="bg-secondary text-center py-2">
        <a href="/about" className="text-decoration-none text-light fs-3 fw-light">About</a>        
      </footer>
    </div>
  );
}

export default App;
