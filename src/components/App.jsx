import '../styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import ExpensesLog from './pages/ExpensesLog';
import { useEffect, useState } from 'react';
import expensesJson from '../services/api.json'

function App() {

  // VARIABLES DE ESTADO

  const [ expenses, setExpenses ] = useState(expensesJson);

  // USEEFFECT
  
  // EVENTOS

  // FUNCIONES DE RENDERIZADO


  return (
    <div>
      
      
      <main className="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/expenseslog" element={<ExpensesLog expenses={expenses}/>}/>
        </Routes>
      </main>
      
    </div>
  );
}

export default App;