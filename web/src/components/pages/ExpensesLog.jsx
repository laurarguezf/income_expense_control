import { useState } from "react";
import { CiBadgeDollar } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
import { CiBag1 } from "react-icons/ci";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa6";
import * as IoIcons from "react-icons/io5";
import * as CgIcons from "react-icons/cg";
import * as SiIcons from "react-icons/si";
import capitalizeLetter from '../../services/capitalizeLetter';
import MonthYearSelector from "../utils/MonthYearSelector";
import NewLog from "./NewLog";


function ExpensesLog({expenses}) {
  
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); //Año actual
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); //Mes actual

  // Filtrar los gastos por el mes y año seleccionados
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === selectedMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

    // Ordenar gastos por fecha (más reciente primero)
  const sortedExpenses = filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));


  // Usar Object.groupBy para agrupar los gastos por fecha (una vez filtrados y ordenados)
  const expensesGrouped = Object.groupBy(sortedExpenses, ({ date }) => date);

  const expenseColor = (type) => {
    return type === "ingreso" ? "mediumseagreen" : "lightcoral";
  };

  // Cálculo de gastos e ingresos totales
  const totals = sortedExpenses.reduce((accumulator, expense) => {

    if (expense.type_name === "ingreso") {
      accumulator.income += expense.amount;
    } 
    else {
      accumulator.expenses += expense.amount;
    }
    return accumulator;

  }, { income: 0, expenses: 0 });

  const balance = totals.income - totals.expenses;

  //Modal Newlog
  const [ showNewLog, setShowNewLog ] = useState( false ); //Para controlar la visibilidad del modal NewLog

  // Obtener el componente del icono
  const getIconComponent = (icon) => {
    const IconComponent = 
      MdIcons[icon] || FaIcons[icon] || IoIcons[icon] || CgIcons[icon] || SiIcons[icon];
  
    if (!IconComponent) {
      console.warn(`Icono no encontrado: ${icon}`);
    }
    
    return IconComponent;
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

    {/* Usamos Object.entries para transformar el objeto expensesGrouped en un array de [clave, valor]
    Cada array: primer elemento es la fecha y el segundo es el array de gastos correspondienes a esa fecha */}
    {Object.entries(expensesGrouped).map(([date, expensesByDate]) => ( 
      <div className="expense_item" key={date}>
        <div className="expense_item_header">
          <h3 className="expense_item_date">{date}</h3>
        </div>

        {expensesByDate.map((expense) => {
          const IconCategoryComponent = getIconComponent(expense.icon);  

          return (
            <div className="expense_item_details" key={expense.idexpenses}>
              <IconCategoryComponent className="expense_item_icon"/>
              <div className="expense_item_info">
                <p className="expense_item_desc">{(expense.desc || 'Sin descripción')}</p>
                <p className="expense_item_category">{(expense.category_name)}</p>
              </div>
              <p className="expense_item_amount" style={{color: expenseColor(expense.type_name)}}>{(expense.type_name === "gasto" ? -expense.amount : expense.amount).toFixed(2)}€</p>
          </div>
          )
        })}
      </div> 
    ))}

    <button onClick={() => setShowNewLog(true)} className="new_log_button">+</button>
    {/*Una vez pulsado el botón y con showNewLog = true, renderizamos el modal NewLog*/}
    {showNewLog && <NewLog onClose={() => setShowNewLog(false)} />}

  </>
)}

export default ExpensesLog;