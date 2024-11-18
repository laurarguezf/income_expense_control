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

  const [expenses, setExpenses] = useState([]); //Almacena la lista de gastos
  const [categories, setCategories] = useState( [] ); //Almacena las categorías 
  
  // USEEFFECT

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);


  //Fetch gastos/ingresos desde la API
  const fetchExpenses = async () => {
    try { 
      const server = import.meta.env.DEV ? 'http://localhost:3000/expenses' : '/expenses';
      const res = await fetch(server)
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

  //Fetch categories desde la API
  const fetchCategories = async () => {
    try {
      const server = import.meta.env.DEV ? 'http://localhost:3000/categories' : '/categories';
      const res = await fetch(server)
      const data = await res.json();
      setCategories(data);
    }
    catch(error) {
      console.log('Error', error);
    }
  }


  // EVENTOS

  // FUNCIONES DE RENDERIZADO

  //Filtrar categorías por tipo de gasto
  const filterCategoriesByType = (type_name) => {
    return categories.filter(category => category.type_name === type_name)
  };

  //Buscar un gasto/ingreso mediante su id
  const showDetailedExpense = (id) => {
    const detailedExpense = expenses.find(expense => expense.idexpenses === parseFloat(id));
    return detailedExpense; 
  };

  //Función para crear un gasto/ingreso
  const postNewExpense = async (data = {}) => {
    try {
      const server = import.meta.env.DEV ? 'http://localhost:3000/expenses' : '/expenses'
      const res = await fetch(server, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      return responseData;
    }
    catch(error) {
      console.log('Error en la solicitud POST:', error);
    }
  }

  //Función para eliminar un gasto/ingreso
  const deleteExpense = async (id) => {
    try {
      const server = import.meta.env.DEV ? `http://localhost:3000/expenses/${id}` : `/expenses/${id}`;
      await fetch(server, {
        method: 'DELETE',
      });
      fetchExpenses(); // Refrescar la lista de gastos
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
    }
  };

  //Función para actualizar un gasto/ingreso
  const updateExpense = async (id, updatedExpense) => {
    try {
      const server = import.meta.env.DEV ? `http://localhost:3000/expenses/${id}` : `/expenses/${id}`;
      await fetch(server, {
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
        <Route path="/expenseslog" element={<ExpensesLog 
          expenses={expenses}
          filterCategoriesByType={filterCategoriesByType} 
          fetchExpenses={fetchExpenses}
          postNewExpense={postNewExpense}
          />}/>
        <Route path="/newlog" element={<NewLog 
          fetchExpenses={fetchExpenses}
          filterCategoriesByType={filterCategoriesByType}/>}
          postNewExpense={postNewExpense} />
        <Route path="/details/:id" element={
          <ExpenseDetail 
            filterCategoriesByType={filterCategoriesByType} 
            showDetailedExpense={showDetailedExpense} 
            deleteExpense={deleteExpense} 
            updateExpense={updateExpense}
          />} 
        />
      </Routes>
    </main>
      
  );
}

export default App;