import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import MyHome from './components/Home';
import DettaglioMeteo from './components/DettaglioMeteo';
import ErrorSearch from './components/ErrorSearch';



function App() {

  return (
    <div className='my-bg-home app-height'>
      <BrowserRouter>
        <header>
          <MyNavbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MyHome />} />
            <Route path="/DettaglioMeteo/:city" element={<DettaglioMeteo />} />
            <Route path='*' element={<ErrorSearch  imageUrl="https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-2511608-2133696.png" altText="Testo alternativo" />}      />

          </Routes>
        </main>
        <footer>
          <MyFooter />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;