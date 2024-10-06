export default function getCategoryColor(categoryName) {
  switch(categoryName) {
    case 'Alimentación':
      return 'lightblue';
    case 'Transporte':
      return 'lightpink';
    case 'Vivienda':
      return 'orange';
    case 'Salud':
      return 'darkKhaki';
    case 'Ocio':
      return 'plum';
    case 'Ropa':
      return 'darkseagreen';
    case 'Educación':
      return 'navajowhite';
    case 'Cuidado personal':
      return 'brown';
    case 'Otros':
      return 'rosybrown';
    case 'Salario':
      return 'moccasin';
    case 'Reembolsos':
      return 'coral';
    case 'Ventas':
      return 'mediumaquamarine';
    case 'Otros ingresos':
      return 'thistle';
    case 'Gastos':
      return 'lightgoldenrodyellow';
    default:
      return 'lightgray';
  }  
}