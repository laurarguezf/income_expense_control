import { useState } from "react";

function MonthYearSelector() {

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); //Año actual
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); //Mes actual
  const [showCalendar, setShowCalendar] = useState(false); //Para controlar la visibilidad del calendario
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  
  //Función para cambiar el año
  const changeYear = (amount) => {
    setCurrentYear(currentYear + amount);
  };
  
  //Función para alternar la visibilidad del calendario
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  
  return (
    <section className="month_selector">
      <button className="selected_month_btn" onClick={toggleCalendar}>
        {months[selectedMonth]}, {currentYear} {/* Muestra el mes y el año seleccionados */}
      </button>
  
      {showCalendar && (
        <div className="calendar">
          <div className="calendar_header">
            <button className="calendar_header_btn" onClick={() => changeYear(-1)}>◀</button>
            <h2 className="calendar_header_year">{currentYear}</h2>
            <button className="calendar_header_btn" onClick={() => changeYear(1)}>▶</button>
          </div>
          <div className="calendar_months">
            {months.map((month, index) => (
              <div 
                key={index} 
                className={`calendar_month ${selectedMonth === index ? 'selected' : ''}`} 
                onClick={() => {
                  setSelectedMonth(index); //Selecciona el mes
                  toggleCalendar(); //Cierra el calendario al seleccionar
                }}
                >{month}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MonthYearSelector;