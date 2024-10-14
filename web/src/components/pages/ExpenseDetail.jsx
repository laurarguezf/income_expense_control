import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


function ExpenseDetail({filterCategoriesByType, showDetailedExpense, deleteExpense, updateExpense}) {

  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [expense, setExpense] = useState();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const detailedExpenseInfo = showDetailedExpense( params.id );

  console.log(expense);
  

  useEffect(() => {
    if (detailedExpenseInfo) {
      setExpense(detailedExpenseInfo);
      //Filtrar categorías por tipo de gasto
      const filtered = filterCategoriesByType(detailedExpenseInfo.type_name);
      setFilteredCategories(filtered);
    }
  }, [detailedExpenseInfo, filterCategoriesByType]);

  const handleTypeChange = (ev) => {
    const newType = ev.currentTarget.value;
    setExpense({...expense, type_name: newType});
    const filtered = filterCategoriesByType(newType);
    setFilteredCategories(filtered);
  };
 
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
    const formattedDate = new Date(expense.date).toLocaleDateString('en-CA').split('T')[0]; // Formatear fecha a YYYY-MM-DD
    
    // Obtener el id de la categoría seleccionada
    const category = filteredCategories.find(cat => cat.category_name === expense.category_name);
    // Obtener el id del tipo de gasto ( 1 para gasto, 2 para ingreso )
    const type = expense.type_name === 'gasto' ? 1 : 2;
    
    const updatedExpense = {
      ...expense, 
      date: formattedDate, 
      type_name: expense.type_name, 
      category_name: expense.category_name, 
      idcategories: category.idcategories, 
      idtypes: type, 
      desc: expense.desc || null, 
      amount: expense.amount
    };

    await updateExpense(params.id, updatedExpense); // Llamar a la función para actualizar
    setIsEditing(false); // Dejar de editar
  };
  
  
  return (
    <>
      <div className="expense_detail">
        {isEditing ? (
          <div>
            {/* Formulario de edición */}
            <input type="date" value={new Date(expense.date).toLocaleDateString('en-CA').split('T')[0]} required onChange={(e) => setExpense({ ...expense, date: e.target.value })}/>
            <select required value={expense.type_name} className="form_group_input" onChange={handleTypeChange}>
              <option value="gasto">Expense</option>
              <option value="ingreso">Income</option>
            </select>
            <select required value={expense.category_name} className="form_group_input" onChange={(e) => setExpense({ ...expense, category_name: e.target.value })}>
              <option>Select</option>
              {filteredCategories.map((category) => (
                <option key={category.idcategories} value={category.category_name}>{category.category_name}</option>
              ))}
            </select>
            <input type="text" value={expense.desc || ''} onChange={(e) => setExpense({ ...expense, desc: e.target.value })}/>
            <input type="number" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: parseFloat(e.target.value) })}/>
            
            <button onClick={handleUpdate}>Save</button>
          </div>
        ) : (
          <div>
            {/* Información del gasto */}
            <div className="expense_item">
              <div className="expense_item_header">
                <h3 className="expense_item_date">{new Date(detailedExpenseInfo.date).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'})}</h3>
              </div>
              <div className="expense_item_details">
                <p className="expense_item_desc">{detailedExpenseInfo.desc}</p>
                <p className="expense_item_category">{(detailedExpenseInfo.category_name)}</p>
                <p className="expense_item_amount">{(detailedExpenseInfo.type_name === "gasto" ? -detailedExpenseInfo.amount : detailedExpenseInfo.amount).toFixed(2)}€</p>
              </div>
            </div>
          </div>
        )}
      </div> 

      <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</button>
      <button onClick={handleDelete}>Delete</button>
  
    </>
  );
}

export default ExpenseDetail;