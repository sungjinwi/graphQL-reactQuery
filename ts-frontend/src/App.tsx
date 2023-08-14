import './App.css';

import {Route, Routes} from 'react-router-dom'
import { Main, MovieDetail } from './components';




function App() {


  return (
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/movie/:id' element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
