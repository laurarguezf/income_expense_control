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

    test('Should handle an empty expenses array', () => {
        const expenses = [];
        const result = calculateTotals(expenses);

        expect(result).toEqual({
            income: 0,
            expenses: 0,
            balance: 0
        })
    });

    test('Should handle an array with just one data', () => {
        const expenses = [ {type_name: "ingreso", amount: 100} ];
        const result = calculateTotals(expenses);

        expect(result).toEqual({
            income: 100,
            expenses: 0,
            balance: 100
        })
    });

    test('Should handle zero amounts', () => {
        const expenses = [
            {type_name: "ingreso", amount: 0},
            {type_name: "gasto", amount: 0}
        ];
        const result = calculateTotals(expenses);

        expect(result).toEqual({
            income: 0,
            expenses: 0,
            balance: 0
        })
    });

    test('Should make the calculations even if there\'s no expenses', () => {
        const expenses = [
            { type_name: "ingreso", amount: 100 },
            { type_name: "ingreso", amount: 500 }
        ];
        const result = calculateTotals(expenses);

        expect(result).toEqual({
            income: 600,
            expenses: 0,
            balance: 600
        })
    });

    test('Should make the calculations even if there\'s no income', () => {
        const expenses = [
            { type_name: "gasto", amount: 10 },
            { type_name: "gasto", amount: 70 }
        ];
        const result = calculateTotals(expenses);

        expect(result).toEqual({
            income: 0,
            expenses: 80,
            balance: -80
        })
    });

    test('Should handle large amounts', () => {
        const expenses = [
            { type_name: "ingreso", amount: 1000000 },
            { type_name: "gasto", amount: 500000 }
        ];
        const result = calculateTotals(expenses);

        expect(result).toEqual({
            income: 1000000,
            expenses: 500000,
            balance: 500000
        })
    });

    test('Should make the calculations even if income is negative', () => {
        const expenses = [
            { type_name: "ingreso", amount: -100 },
            { type_name: "gasto", amount: 500 }
        ];
        const result = calculateTotals(expenses);

        expect(result).toEqual({
            income: -100,
            expenses: 500,
            balance: -600
        })
    });
})