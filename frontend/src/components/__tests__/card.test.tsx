import { render, screen } from '@testing-library/react';
import { Card } from '../card';
import userEvent from '@testing-library/user-event';

const mockTrack = jest.fn();
jest.mock('../../hooks/use-tracking', () => ({
  useTracking: () => ({ track: mockTrack }),
}));

describe('Componente Card', () => {
  beforeEach(() => {
    mockTrack.mockClear();
  });

  // TEST 1: Renderizado completo (Header, Footer, Imagen)
  it('renderiza imagen, título y footer si se proveen', () => {
    render(
      <Card
        title='Tarjeta Maestra'
        image='/img.jpg'
        footer={<button>Ver más</button>}
      >
        Descripción
      </Card>
    );

    expect(screen.getByText('Tarjeta Maestra')).toBeInTheDocument();
    expect(screen.getByText('Descripción')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/img.jpg');
    expect(
      screen.getByRole('button', { name: /ver más/i })
    ).toBeInTheDocument();
  });

  // TEST 2: Variante de estilo
  it('aplica la clase de variante correcta', () => {
    const { container } = render(<Card variant='bordered'>Contenido</Card>);
    // Buscamos el div principal (el primer hijo del container)
    expect(container.firstChild).toHaveClass('border');
  });

  // TEST 3: Tracking de interacción
  it('ejecuta tracking si tiene onClick y se hace click', async () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick} variant='shadow'>
        Clickme
      </Card>
    );

    await userEvent.click(screen.getByText('Clickme'));

    expect(handleClick).toHaveBeenCalled();
    expect(mockTrack).toHaveBeenCalledWith({
      component: 'Card',
      action: 'click',
      variant: 'shadow',
    });
  });
});
