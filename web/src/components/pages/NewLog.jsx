import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";


function NewLog({ onClose }) {

  const [ formData, setFormData ] = useState( {
    date: '',
    type_name: '',
    category_name: '',
    desc: '',
    amount: ''
  });

  const handleInputChange = (ev) => {
    const { name, value } = ev.currentTarget;
    setFormData((data) => ({
      ...data, [name]: value
    }))
  };

  //console.log(formData);

  const handleClickSubmit = (ev) => {
    ev.preventDefault();
    console.log('Formulario enviado:', formData);
    //Aquí haré una petición de tipo POST

    handleClickReset(); //Restablecemos el formulario
    onClose(); //Cerramos modal
  }

  const handleClickReset = () => {
    setFormData({
      date: '',
      type_name: '',
      category_name: '',
      desc: '',
      amount: ''
    })
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="newlog" onClick={(ev) => ev.stopPropagation()}>
        
        <IoMdCloseCircleOutline className="newlog_closing_btn" onClick={onClose} />

        <section>
          <h3 className="newlog_title">Input your new expense data</h3>
          <form className="newlog_form" onSubmit={handleClickSubmit}>
            <fieldset className="form_group">
              <legend className="form_group_legend">Expense date</legend>
              <input type="date" name="date" id="date" required className="form_group_input"
                onChange={handleInputChange}
              />
            </fieldset>
            <fieldset className="form_group">
              <legend className="form_group_legend">Expense type</legend>
              <select name="type" id="type" required className="form_group_input"
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </fieldset>
            <fieldset className="form_group">
            <legend className="form_group_legend">Category name</legend>
              <select name="category" id="category" required className="form_group_input"
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="food">Food</option>
                <option value="house">House</option>
              </select>
            </fieldset>
            <fieldset className="form_group">
              <legend className="form_group_legend">Description <span className="desc_optional">*optional</span></legend>
              <input type="text" name="desc" id="desc" className="form_group_input"
                onChange={handleInputChange}
              />
            </fieldset>
            <fieldset className="newlog_input_group">
              <legend className="form_group_legend">Amount</legend>
              <input type="number" name="amount" id="amount" step="0.01" min="0" required className="form_group_input" inputMode="numeric"
                onChange={handleInputChange} 
              />
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