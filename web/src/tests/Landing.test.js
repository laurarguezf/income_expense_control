import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Landing from '../components/Landing';
import { BrowserRouter } from 'react-router-dom';
import { expect } from '@jest/globals';

test('Should render Landing page correctly', () => {
    render(
        <BrowserRouter>
            <Landing />
        </BrowserRouter>
    );

    // Verificamos que el título se renderiza
    expect(screen.getByText('Track smarter,')).toBeInTheDocument();
    expect(screen.getByText('spend better')).toBeInTheDocument();
    
    // Verificamos que el botón está presente y tiene el enlace correcto
    const button = screen.getByRole('link');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/expenseslog');

    // Verificamos que el Header y el Footer se renderizan
    expect(screen.getByText('Master Your Money')).toBeInTheDocument();
    expect(screen.getByText('LRF')).toBeInTheDocument();
});