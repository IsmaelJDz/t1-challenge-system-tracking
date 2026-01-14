import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import userEvent from '@testing-library/user-event';

const mockTrack = jest.fn();

jest.mock('../../hooks/use-tracking', () => ({
  useTracking: () => ({
    track: mockTrack,
  }),
}));

describe('Componente Button', () => {
  beforeEach(() => {
    mockTrack.mockClear();
  });

  it('renderiza correctamente con la variante danger', () => {
    render(<Button variant='danger'>Eliminar</Button>);

    const button = screen.getByRole('button', { name: /eliminar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-danger');
  });

  it('muestra el spinner y deshabilita cuando está cargando', () => {
    render(<Button isLoading>Guardando</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('ejecuta onClick y llama al tracking automáticmente', async () => {
    const handleClick = jest.fn();
    render(
      <Button variant='primary' onClick={handleClick}>
        Click Me
      </Button>
    );

    const button = screen.getByRole('button', { name: /click me/i });

    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);

    expect(mockTrack).toHaveBeenCalledWith({
      component: 'Button',
      variant: 'primary',
      action: 'click',
    });
  });

  it('muestra el icono izquierdo cuando se proporciona leftIcon', () => {
    const icon = <span data-testid='test-icon'>★</span>;
    render(<Button leftIcon={icon}>Con Icono</Button>);

    const iconElement = screen.getByTestId('test-icon');
    expect(iconElement).toBeInTheDocument();
  });
});
