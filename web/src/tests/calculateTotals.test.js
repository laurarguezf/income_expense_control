import calculateTotals from '../services/calculateTotals';

describe('calculateTotals', () => {
    test('Should calculate income, expenses and balance', () => {
        const expenses = [
            {type_name: "ingreso", amount: 100},
            {type_name: "ingreso", amount: 50},
            {type_name: "gasto", amount: 30}
        ];

        const result = calculateTotals(expenses);

        expect(result).toEqual({
            income: 150,
            expenses: 30,
            balance: 120
        });
    });
})