import '../styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import imgMoney from '../images/money.png'


function App() {
  return (
    <div>
      
      <header className="header">
        <img src={imgMoney} />
        <h1>Master Your Money</h1>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/expenseslog"/>
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy;2024 LRF</p>
      </footer>
    </div>
  );
}

export default App;