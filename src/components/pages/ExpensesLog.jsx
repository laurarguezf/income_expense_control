import { useState } from "react";
import { CiBadgeDollar } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
import { CiBag1 } from "react-icons/ci";
import { MdFastfood } from "react-icons/md";
import capitalizeLetter from '../../services/capitalizeLetter';
import MonthYearSelector from "../utils/MonthYearSelector";
import NewLog from "./NewLog";


function ExpensesLog({expenses}) {

  // Usar Object.groupBy para agrupar los gastos por fecha
  const expensesGrouped = Object.groupBy(expenses, ({ date }) => date);

  const expenseColor = (type) => {
    return type === "ingreso" ? "mediumseagreen" : "lightcoral";
  };

  // Cálculo de gastos e ingresos totales
  const totals = expenses.reduce((accumulator, expense) => {

    if (expense.type === "ingreso") {
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


  return (
  <>
    <MonthYearSelector />
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

        {expensesByDate.map((expense) => 
          <div className="expense_item_details" key={expense.id}>
            <MdFastfood className="expense_item_icon"/>
            <div className="expense_item_info">
              <p className="expense_item_desc">{capitalizeLetter(expense.desc || 'Sin descripción')}</p>
              <p className="expense_item_category">{capitalizeLetter(expense.category)}</p>
            </div>
            <p className="expense_item_amount" style={{color: expenseColor(expense.type)}}>{(expense.type === "gasto" ? -expense.amount : expense.amount).toFixed(2)}€</p>
          </div>
        )}
      </div> 
    ))}

    <button onClick={() => setShowNewLog(true)} className="new_log_button">+</button>
    {/*Una vez pulsado el botón y con showNewLog = true, renderizamos el modal NewLog*/}
    {showNewLog &&
    <NewLog onClose={() => setShowNewLog(false)} />}

  </>
)}

export default ExpensesLog;