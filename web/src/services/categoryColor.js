export default function getCategoryColor(categoryName) {
  const categoryColors = {
    'Alimentación': 'lightblue',
    'Transporte': 'lightpink',
    'Vivienda': 'orange',
    'Salud': 'darkKhaki',
    'Ocio': 'plum',
    'Ropa': 'darkseagreen',
    'Educación': 'navajowhite',
    'Cuidado personal': 'brown',
    'Otros': 'rosybrown',
    'Salario': 'moccasin',
    'Reembolsos': 'coral',
    'Ventas': 'mediumaquamarine',
    'Otros ingresos': 'thistle',
    'Gastos': 'lightgoldenrodyellow',
  };

  return categoryColors[categoryName] || 'lightgray'; // Retorna 'lightgray' si la categoría no está definida
}