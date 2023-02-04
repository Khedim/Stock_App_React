import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StockOverview } from './pages/StockOverview';
import { StockDetail } from './pages/StockDetail';
import './App.css';
import { WatchListContextProvider } from './context/WatchListContext';

function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverview />} />
            <Route path="/detail/:symbol" element={<StockDetail />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
