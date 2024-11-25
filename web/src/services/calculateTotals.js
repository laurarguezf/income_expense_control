export default function calculateTotals(expenses) {
    //Cálculo de gastos e ingresos totales
    const totals = expenses.reduce((accumulator, expense) => {

        if (expense.type_name === "ingreso") {
        accumulator.income += expense.amount;
        } 
        else {
        accumulator.expenses += expense.amount;
        }
        return accumulator;

    }, { income: 0, expenses: 0 }); //Datos iniciales para el acumulador

    const balance = totals.income - totals.expenses; //Cálculo del balance

    return { ...totals, balance };
};