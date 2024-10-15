import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";


function ExpenseDetail({filterCategoriesByType, showDetailedExpense, deleteExpense, updateExpense}) {

  const params = useParams(); //Obtiene los parámetros de la url (el id del gasto/ingreso)
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); //Para controlar si el formulario de edición se está usando
  const [expense, setExpense] = useState(); //Para almacenar los detalles del gasto/ingreso
  const [filteredCategories, setFilteredCategories] = useState([]); //Para almacenar las categorías filtradas

  const detailedExpenseInfo = showDetailedExpense( params.id ); //Obtiene la información detallada del gasto/ingreso usando su id

  useEffect(() => {
    if (detailedExpenseInfo) {
      setExpense(detailedExpenseInfo);
      //Filtrar categorías por tipo de gasto
      const filtered = filterCategoriesByType(detailedExpenseInfo.type_name);
      setFilteredCategories(filtered);
    }
  }, [detailedExpenseInfo, filterCategoriesByType]);


  //Manejar el cambio del tipo de gasto (gasto/ingreso) al cambiar su valor en el formulario de edición
  const handleTypeChange = (ev) => {
    const newType = ev.currentTarget.value;
    setExpense({...expense, type_name: newType});
    const filtered = filterCategoriesByType(newType); //Aquí llama a la función que filtra categorías por tipo de gasto
    setFilteredCategories(filtered);
  };
 
  //Manejar la eliminación de un gasto/ingreso
  const handleDelete = async () => {
    await deleteExpense(params.id); //Llamar a la función para eliminar
    navigate('/expenseslog'); //Volvemos a la pagina de gastos/ingresos una vez eliminado
  };
  
  //Manejar la actualización de un gasto/ingreso
  const handleUpdate = async () => {
    const formattedDate = new Date(expense.date).toLocaleDateString('en-CA').split('T')[0]; // Formatear fecha a YYYY-MM-DD
    
    //Obtener el id de la categoría seleccionada
    const category = filteredCategories.find(cat => cat.category_name === expense.category_name);
    //Obtener el id del tipo de gasto ( 1 para gasto, 2 para ingreso )
    const type = expense.type_name === 'gasto' ? 1 : 2;
    
    //Objeto con los datos actualizados (si no se tocan coge los que tiene ya anteriormente)
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

    await updateExpense(params.id, updatedExpense); //Llamar a la función para actualizar
    setIsEditing(false); //Dejar de editar
    navigate('/expenseslog'); //Volvemos a la pagina de gastos/ingresos una vez actualizado
  };
  
  
  return (
    <>
    {/*Comprobamos es si exite información del gasto/ingreso seleccionado*/}
    {detailedExpenseInfo ? (
      <>
        <div className="buttons_detailed_container">
          <Link to="/expenseslog" className="return_link">Return to main page</Link>
          <MdDeleteForever className="btn_delete" onClick={handleDelete}/> {/*Botón para borrar gasto/ingreso*/}
        </div>
        
        {/*Cuando si hay datos, mostramos la información de gasto/ingreso*/}
        <div className="expense_detail">
          {/*Comprobamos si estamos en modo edición. En modo edición se muestra formulario para cambiar datos. En modo no edición se muestra información del gasto*/}
          {isEditing ? ( 
            
            <div className="expense_edit_form">
              <input  type="date" value={new Date(expense.date).toLocaleDateString('en-CA').split('T')[0]}required className="expense_edit_input" onChange={(ev) => setExpense({ ...expense, date: ev.target.value })} />
              <select required value={expense.type_name} className="expense_edit_input" onChange={handleTypeChange} >
                <option value="gasto">Expense</option>
                <option value="ingreso">Income</option> 
              </select>
              <select required value={expense.category_name} className="expense_edit_input" onChange={(ev) => setExpense({ ...expense, category_name: ev.target.value })} >
                <option>Select</option>
                {filteredCategories.map((category) => (
                  <option key={category.idcategories} value={category.category_name}>{category.category_name}</option>
                ))} {/*Se mapean todas las categorías según el tipo de gasto/ingreso*/}
              </select>
              <input type="text" value={expense.desc || ''} className="expense_edit_input" placeholder="Description" onChange={(ev) => setExpense({ ...expense, desc: ev.target.value })} />
              <input type="number" value={expense.amount} className="expense_edit_input" onChange={(ev) => setExpense({ ...expense, amount: parseFloat(ev.target.value) })} />
                
              <div className="edit_save_buttons">
                <button className="btn_save" onClick={handleUpdate}>Save</button> {/* Botón para guardar y actualizar los cambios */}
                <button className="btn_cancel" onClick={() => setIsEditing(!isEditing)}>Cancel</button>
              </div>
            </div> 

          ) : (

            <div className="expense_detailed">
              <div className="expense_detailed_header">
                <h3 className="expense_detailed_date">
                  {new Date(detailedExpenseInfo.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </h3>
              </div>
              <table className="expense_item_detailed">
                <tr>
                  <th className="expense_item_detailed_label">Description:</th>
                  <td className="expense_item_detailed_value">{detailedExpenseInfo.desc || 'Sin descripción'}</td>
                </tr>
                <tr>
                  <th className="expense_item_detailed_label">Category:</th>
                  <td className="expense_item_detailed_value">{detailedExpenseInfo.category_name}</td>
                </tr>
                <tr>
                  <th className="expense_item_detailed_label">Amount:</th>
                  <td className="expense_item_detailed_value">
                    {(detailedExpenseInfo.type_name === "gasto" ? -detailedExpenseInfo.amount : detailedExpenseInfo.amount).toFixed(2)}€
                  </td>
                </tr>
              </table>
            </div>
          )}
          {!isEditing && (
            <button className="btn_edit" onClick={() => setIsEditing(true)}>Edit</button> 
          )}
        </div>      
      </>
    ) : (
      <div>
        {/*Cuando no se encuentra el gasto/ingreso*/}
        <p>No expense found</p>
        <Link to="/expenseslog" className="return_link">Return to main page</Link>
      </div>
    )}
    </>
  );
}

export default ExpenseDetail;