import { render, screen } from '@testing-library/react';
import Home from '../app/page'; // Importamos la página Home

describe('Home Page', () => {
  it('debería renderizar el título correctamente', () => {
    render(<Home />);

    // Buscamos un elemento que tenga el texto "T1 Component Library"
    const heading = screen.getByText(/T1 Component Library/i);

    // Aserción: El elemento debe estar en el documento
    expect(heading).toBeInTheDocument();
  });
});
