import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


function ExpenseDetail({showDetailedExpense, deleteExpense, updateExpense}) {

  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [expense, setExpense] = useState();
  const detailedExpenseInfo = showDetailedExpense( params.id );
 console.log(detailedExpenseInfo);

  useEffect(() => {
    if (detailedExpenseInfo) {
      setExpense(detailedExpenseInfo);
    }
  }, [detailedExpenseInfo]);
 
  if (!detailedExpenseInfo) {
    return ( 
      <div>
        <p>No expense found</p>
        <Link to="/expenseslog" className="return_link">Return to main page</Link>
      </div>
      )
  }

  const handleDelete = async () => {
    await deleteExpense(params.id); // Llamar a la función para eliminar
    Navigate('expenses');
  };
  
  const handleUpdate = async () => {
    await updateExpense(params.id, expense); // Llamar a la función para actualizar
    setIsEditing(false); // Dejar de editar
  };
  
  
  return (
    <>
      <div className="expense_detail">
        {isEditing ? (
          <div>
            {/* Formulario de edición */}
            <input type="text" value={expense.desc || ''} onChange={(e) => setExpense({ ...expense, desc: e.target.value })}/>
            <input type="number" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: parseFloat(e.target.value) })}/>
            <button onClick={handleUpdate}>Save</button>
          </div>
        ) : (
          <div>
            {/* Información del gasto */}
            <h2>{detailedExpenseInfo.desc}</h2>
            <p>{detailedExpenseInfo.amount}€</p>
            <p>{detailedExpenseInfo.category_name}</p>
          </div>
        )}
        
        <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    

    </>
  );
}

export default ExpenseDetail;