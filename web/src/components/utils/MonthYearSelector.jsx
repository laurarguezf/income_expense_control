import { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";


function MonthYearSelector({ currentYear, setCurrentYear, selectedMonth, setSelectedMonth }) {

  const [showCalendar, setShowCalendar] = useState(false); //Para controlar la visibilidad del calendario
  const [calendarYear, setCalendarYear ] = useState(currentYear); //Año en el calendario (mientras se navega por los años)
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  
  //Función para cambiar el año del calendario
  const changeYear = (amount) => {
    setCalendarYear(calendarYear + amount);
  };
  
  //Función para alternar la visibilidad del calendario
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    setCalendarYear(currentYear); //año calendario = año actual
  };
  
  return (
    <section className="month_selector">
      <button className="selected_month_btn" onClick={toggleCalendar}>
        {months[selectedMonth]}, {currentYear} {/* Muestra el mes y el año seleccionados */}
        <IoIosArrowDown /> 
      </button>
  
      {showCalendar && (
        <div className="calendar">
          <div className="calendar_header">
            <IoArrowBackCircle className="calendar_header_btn_icon" onClick={() => changeYear(-1)}/>
            <h2 className="calendar_header_year">{calendarYear}</h2>
            <IoArrowForwardCircle className="calendar_header_btn_icon" onClick={() => changeYear(1)}/>
          </div>
          <div className="calendar_months">
            {months.map((month, index) => (
              <div 
                key={index} 
                className={`calendar_month ${selectedMonth === index ? 'month_selected' : ''}`} 
                onClick={() => {
                  setSelectedMonth(index); //Selecciona el mes
                  setCurrentYear(calendarYear); //Actualiza el año que se muestra en el botón
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