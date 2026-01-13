import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home Page', () => {
  it('debería renderizar el título correctamente', () => {
    render(<Home />);

    const heading = screen.getByText(/T1 Component Library/i);
    expect(heading).toBeInTheDocument();
  });
});
