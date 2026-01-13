import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import userEvent from '@testing-library/user-event';

// --- MOCK DEL TRACKING ---
// Esto es vital: No queremos llamar al backend real en los tests.
// Simulamos (mock) el hook useTracking.
const mockTrack = jest.fn();

jest.mock('../../hooks/use-tracking', () => ({
  useTracking: () => ({
    track: mockTrack,
  }),
}));

describe('Componente Button', () => {
  // Limpiar el mock antes de cada test
  beforeEach(() => {
    mockTrack.mockClear();
  });

  // TEST 1: Renderizado básico y variantes
  it('renderiza correctamente con la variante danger', () => {
    render(<Button variant='danger'>Eliminar</Button>);

    const button = screen.getByRole('button', { name: /eliminar/i });
    expect(button).toBeInTheDocument();
    // Verificamos que tenga la clase de color rojo (danger)
    expect(button).toHaveClass('bg-danger');
  });

  // TEST 2: Estado de Loading
  it('muestra el spinner y deshabilita cuando está cargando', () => {
    render(<Button isLoading>Guardando</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // Loader2 de lucide suele renderizar un SVG, verificamos si hay algo "animado"
    // O buscamos clases específicas si es necesario, pero disabled es clave.
  });

  // TEST 3: Interacción y Tracking (El más importante)
  it('ejecuta onClick y llama al tracking automáticmente', async () => {
    const handleClick = jest.fn();
    render(
      <Button variant='primary' onClick={handleClick}>
        Click Me
      </Button>
    );

    const button = screen.getByRole('button', { name: /click me/i });

    // Simulamos click
    await userEvent.click(button);

    // Verificamos que se llamó a la función del usuario
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Verificamos que el sistema de tracking se disparó en segundo plano
    expect(mockTrack).toHaveBeenCalledWith({
      component: 'Button',
      variant: 'primary',
      action: 'click',
    });
  });

  // TEST 4: Renderiza con icono izquierdo
  it('muestra el icono izquierdo cuando se proporciona leftIcon', () => {
    const icon = <span data-testid='test-icon'>★</span>;
    render(<Button leftIcon={icon}>Con Icono</Button>);

    const iconElement = screen.getByTestId('test-icon');
    expect(iconElement).toBeInTheDocument();
  });
});
