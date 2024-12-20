import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";


function NewLog({ filterCategoriesByType, onClose, fetchExpenses, postNewExpense }) {

  //Para almacenar los datos del formulario
  const [formData, setFormData] = useState( {
    date: '',
    type_name: '',
    category_name: '',
    desc: '',
    amount: ''
  });

  const [filteredCategories, setFilteredCategories] = useState( [] ); //Almacena las categorías filtradas según tipo de gasto

  //Controlar los cambios en los inputs del formulario
  const handleInputChange = (ev) => {
    const { name, value } = ev.currentTarget;
    setFormData((data) => ({
      ...data, [name]: value
    }));

    //Filtrar categorías según el tipo de gasto seleccionado en el formulario
    if (name === "type_name") {
      const filteredCat = filterCategoriesByType(value)
      setFilteredCategories(filteredCat);
    } 
  };

  // Función submit para enviar formulario
  const handleClickSubmit = async (ev) => {
    ev.preventDefault();
    console.log('Formulario enviado:', formData);

    //Obtener el id de la categoría seleccionada
    const category = filteredCategories.find(cat => cat.category_name === formData.category_name);
    //Obtener el id del tipo de gasto ( 1 para gasto, 2 para ingreso )
    const type = formData.type_name === 'gasto' ? 1 : 2;

    //Objeto con los datos para enviar al servidor
    const newExpense = {
      date: formData.date,
      idcategories: category.idcategories,
      idtypes: type,
      amount: formData.amount,
      desc: formData.desc || null
    };

    await postNewExpense(newExpense); //Enviar los datos al servidor y esperar respuesta
    await fetchExpenses(); //Llama a la función para refrescar la lista de gastos

    handleClickReset(); //Llama a la función que resetea el formulario

    const newExpenseDate = new Date(formData.date); //Nos quedamos con el dato de la fecha del formulario
    onClose(newExpenseDate.getMonth()); //Cerramos modal pasándole el valor del mes introducido en el formulario (del nuevo gasto)
  };

  //Función que resetea el formulario
  const handleClickReset = () => {
    setFormData({
      date: '',
      type_name: '',
      category_name: '',
      desc: '',
      amount: ''
    });
    setFilteredCategories([]); //Limpia las categorías filtradas
  };

  //Función para cerrar el modal y restablecer formulario
  const handleClose = () => {
    handleClickReset(); //Resetea formulario
    onClose(); //Cierra modal
  }


  return (
    <div className="backdrop" onClick={handleClose}>
      <div className="newlog" onClick={(ev) => ev.stopPropagation()}>
        
        <IoMdCloseCircleOutline className="newlog_closing_btn" onClick={handleClose} />

        <section>
          <h3 className="newlog_title">Input your new expense data</h3>
          <form className="newlog_form" onSubmit={handleClickSubmit}>
            <fieldset className="form_group">
              <legend className="form_group_legend">Expense date</legend>
              <input type="date" name="date" id="date" required className="form_group_input" onChange={handleInputChange}/>
            </fieldset>
            <fieldset className="form_group">
              <legend className="form_group_legend">Expense type</legend>
              <select name="type_name" id="type_name" required className="form_group_input" onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="gasto">Expense</option>
                <option value="ingreso">Income</option>
              </select>
            </fieldset>
            <fieldset className="form_group">
            <legend className="form_group_legend">Category name</legend>
              <select name="category_name" id="category_name" required className="form_group_input" onChange={handleInputChange}>
                <option value="">Select</option>
                {filteredCategories.map((category) => (
                  <option key={category.idcategories} value={category.category_name}>{category.category_name}</option>
                ))} {/*Se mapean todas las categorías según el tipo de gasto/ingreso*/}
              </select>
            </fieldset>
            <fieldset className="form_group">
              <legend className="form_group_legend">Description <span className="desc_optional">*optional</span></legend>
              <input type="text" name="desc" id="desc" className="form_group_input" onChange={handleInputChange}/>
            </fieldset>
            <fieldset className="newlog_input_group">
              <legend className="form_group_legend">Amount</legend>
              <input type="number" name="amount" id="amount" step="0.01" min="0" required className="form_group_input" inputMode="numeric" onChange={handleInputChange} />
            </fieldset>

            <div className="form_buttons">
              <button type="submit" className="form_submit_btn">Submit</button>
              <button type="reset" className="form_reset_btn" onClick={handleClickReset}>Reset</button>
            </div>

          </form>
        </section>
      </div>
    </div>
  );
}

export default NewLog;