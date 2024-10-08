import '../styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Landing from './Landing';
import ExpensesLog from './pages/ExpensesLog';
import NewLog from './pages/NewLog';
import capitalizeLetter from '../services/capitalizeLetter';

function App() {

  // VARIABLES DE ESTADO

  const [expenses, setExpenses] = useState([]);

  // USEEFFECT

  useEffect(() => {
    fetchExpenses();
  }, []);


    //Fetch gastos/ingresos
  const fetchExpenses = async () => {
    try { 
      const res = await fetch('http://localhost:3000/expenses')
      const data = await (res.json());

    //Aplicamos capitalizeLetter para texto estético de la descripción del gasto
      const capitalizedData = data.map((item) => {
        return { ...item, desc: capitalizeLetter(item.desc)}
      });

      setExpenses(capitalizedData);
      }
      catch(error) {
        console.log('Error', error);
      }
  }

  // EVENTOS

  // FUNCIONES DE RENDERIZADO


  return (
    
    <main className="main">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/expenseslog" element={<ExpensesLog expenses={expenses} fetchExpenses={fetchExpenses} />}/>
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