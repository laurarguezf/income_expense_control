import '../styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import ExpensesLog from './pages/ExpensesLog';
import { useEffect, useState } from 'react';
import expensesJson from '../services/api.json'
import NewLog from './pages/NewLog';

function App() {

  // VARIABLES DE ESTADO

  const [ expenses, setExpenses ] = useState(expensesJson);

  // USEEFFECT
  
  // EVENTOS

  // FUNCIONES DE RENDERIZADO


  return (
    
    <main className="main">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/expenseslog" element={<ExpensesLog expenses={expenses}/>}/>
        <Route path="*" element={<></>}></Route>
      </Routes>
      <Routes>
        <Route path="/newlog" element={<NewLog />}/>
        <Route path="*" element={<></>}></Route>
      </Routes>
    </main>
      
  );
}

export default App;