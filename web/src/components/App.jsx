import '../styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Landing from './Landing';
import ExpensesLog from './pages/ExpensesLog';
import NewLog from './pages/NewLog';
import ExpenseDetail from './pages/ExpenseDetail';
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

  const showDetailedExpense = (id) => {
    const detailedExpense = expenses.find(expense => expense.idexpenses === parseFloat(id));
    return detailedExpense; 
  }

  const deleteExpense = async (id) => {
    try {
      await fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'DELETE',
      });
      fetchExpenses(); // Refrescar la lista de gastos
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      await fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      });
      fetchExpenses(); // Refrescar la lista de gastos
    } catch (error) {
      console.error('Error al actualizar el gasto:', error);
    }
  };


  return (
    
    <main className="main">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/expenseslog" element={<ExpensesLog expenses={expenses} fetchExpenses={fetchExpenses} />}/>
        <Route path="/details/:id" element={<ExpenseDetail showDetailedExpense={showDetailedExpense} deleteExpense={deleteExpense} updateExpense={updateExpense}/>} />
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