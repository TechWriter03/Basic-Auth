import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Data from './pages/Data'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>
        <Route path='/upload' element={ <Upload/> }/>
        <Route path='/excel-data' element={ <Data/> }/>
      </Routes>
    </Router>
  )
}

export default App;
