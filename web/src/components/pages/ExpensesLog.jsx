import { useState } from "react";
import { Link } from "react-router-dom";
import { CiBadgeDollar } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
import { CiBag1 } from "react-icons/ci";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa6";
import * as IoIcons from "react-icons/io5";
import * as CgIcons from "react-icons/cg";
import * as SiIcons from "react-icons/si";
import * as HiIcons from "react-icons/hi2";
import MonthYearSelector from "../utils/MonthYearSelector";
import NewLog from "./NewLog";
import getCategoryColor from '../../services/categoryColor';


function ExpensesLog({expenses, fetchExpenses, categories, filterCategoriesByType}) {
  
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); //Para almacenar año actual
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); //Para almacenar mes actual
  const [showNewLog, setShowNewLog] = useState(false); //Para controlar la visibilidad del modal NewLog

  //Filtrar los gastos por el mes y año seleccionados
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === selectedMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  //Ordenar gastos por fecha (más reciente primero)
  const sortedExpenses = filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

  //Usar Object.groupBy para agrupar los gastos por fecha (una vez filtrados y ordenados)
  const expensesGrouped = Object.groupBy(sortedExpenses, ({ date }) => date);

  //Darle estilo de color según el tipo de gasto
  const expenseColor = (type) => {
    return type === "ingreso" ? "mediumseagreen" : "lightcoral";
  };

  //Cálculo de gastos e ingresos totales
  const totals = sortedExpenses.reduce((accumulator, expense) => {

    if (expense.type_name === "ingreso") {
      accumulator.income += expense.amount;
    } 
    else {
      accumulator.expenses += expense.amount;
    }
    return accumulator;

  }, { income: 0, expenses: 0 }); //Datos iniciales para el acumulador

  const balance = totals.income - totals.expenses; //Cálculo del balance

  //Función para obtener el componente del icono
  const getIconComponent = (icon) => {
    const IconComponent = 
      MdIcons[icon] || FaIcons[icon] || IoIcons[icon] || CgIcons[icon] || SiIcons[icon] || HiIcons[icon];
  
    if (!IconComponent) {
      console.log(`Icono no encontrado: ${icon}`);
    }
    
    return IconComponent;
  };

  //Función para cerrar el modal y actualizar el mes
  const handleCloseNewLog = (month) => {
    setShowNewLog(false); //Cerrar el modal
    if (month !== undefined) {
      setSelectedMonth(month); //Actualizar el mes seleccionado
    }
  };
  
  return (
  <>
    <MonthYearSelector 
      currentYear={currentYear} 
      setCurrentYear={setCurrentYear}
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}/>

    <section className="expense_summary">
      <div className="expense_summary_section">
        <CiBank className="expense_summary_icon"/>
        <p className="expense_summary_amount">{totals.income.toFixed(2)}</p>
        <p className="expense_summary_category">Income</p>
      </div>
      <div className="expense_summary_section">
        <CiBag1 className="expense_summary_icon"/>
        <p className="expense_summary_amount" style={balance > 0 ? {color: 'mediumseagreen'} : {color: 'lightcoral'}}>{balance.toFixed(2)}</p>
        <p className="expense_summary_category">Balance</p>
      </div>
      <div className="expense_summary_section">
        <CiBadgeDollar className="expense_summary_icon"/>
        <p className="expense_summary_amount" style={{color: 'lightcoral'}}>-{totals.expenses.toFixed(2)}</p>
        <p className="expense_summary_category">Expenses</p>
      </div>
    </section>

    {/* Se usa Object.entries para transformar el objeto expensesGrouped en un array de [clave, valor]
    Cada array: primer elemento es la fecha y el segundo es el array de gastos correspondienes a esa fecha */}
    {Object.entries(expensesGrouped).map(([date, expensesByDate]) => {
      const formattedDate = new Date(date).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}); //Formateamos fecha DD/MM/YYYY
      
      return ( 
        <div className="expense_item" key={date}>
          <div className="expense_item_header">
            <h3 className="expense_item_date">{formattedDate}</h3>
          </div>

          {expensesByDate.map((expense) => { //Mapeamos los gastos
            const IconCategoryComponent = getIconComponent(expense.icon);
            const backgroundColor = getCategoryColor(expense.category_name);  
            
            return (
              <Link to={`/details/${expense.idexpenses}`} className="expense_item_details" key={expense.idexpenses}>
                <IconCategoryComponent className="expense_item_icon" style={{backgroundColor: backgroundColor}}/>
                <div className="expense_item_info">
                  <p className="expense_item_desc">{expense.desc}</p>
                  <p className="expense_item_category">{(expense.category_name)}</p>
                </div>
                <p className="expense_item_amount" style={{color: expenseColor(expense.type_name)}}>{(expense.type_name === "gasto" ? -expense.amount : expense.amount).toFixed(2)}€</p>
              </Link>
            );
          })}
        </div> 
      );
    })}

    <button onClick={() => setShowNewLog(true)} className="new_log_button">+</button>
    {/*Una vez pulsado el botón y con showNewLog = true, renderizamos el modal NewLog*/}
    {showNewLog && <NewLog onClose={handleCloseNewLog} fetchExpenses={fetchExpenses} categories={categories} filterCategoriesByType={filterCategoriesByType}/>}

  </>
)}

export default ExpensesLog;