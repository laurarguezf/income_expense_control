import { CiBadgeDollar } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
import { CiBag1 } from "react-icons/ci";

function ExpensesLog({expenses}) {
  return (
  <>
    <section className="expense_date">
      <p className="expense_date_link">Sept, 2024</p>
    </section>
    <section className="expense_summary">
      <div className="expense_summary_section">
        <CiBank className="expense_summary_icon"/>
        <p className="expense_summary_amount">2000</p>
        <p>Income</p>
      </div>
      <div className="expense_summary_section">
        <CiBag1 className="expense_summary_icon"/>
        <p className="expense_summary_amount">1500</p>
        <p>Balance</p>
      </div>
      <div className="expense_summary_section">
        <CiBadgeDollar className="expense_summary_icon"/>
        <p className="expense_summary_amount">-500</p>
        <p>Expenses</p>
      </div>
    </section>

  
    {expenses.map((expense) => ( 
      <>
        <section>
          <p>Date</p>
          <div>
            <img src="" alt="" />
            <div>
              <p>Description</p>
              <p>Category</p>
            </div>
            <p>Amount</p>
          </div>
        </section>

        <div className="expense_item">
          <div className="expense_header">
            <h3 className="expense_type">{expense.type}</h3>
            <span className="expense_datee">{expense.date}</span>
          </div>

        <div className="expense_details">
          <p className="expense_category"><strong>Category:</strong> {expense.category}</p>
          <p className="expense_desc"><strong>Description:</strong> {expense.desc}</p>
          <p className="expense_amount"><strong>Amount:</strong> €{expense.amount.toFixed(2)}</p>
        </div>
        </div>
      </>))}
  </>
)}

export default ExpensesLog;