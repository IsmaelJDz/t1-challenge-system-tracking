import { render, screen } from '@testing-library/react';
import { Input } from '../input';
import userEvent from '@testing-library/user-event';

// Mock del Tracking (igual que con el Button)
const mockTrack = jest.fn();
jest.mock('../../hooks/use-tracking', () => ({
  useTracking: () => ({ track: mockTrack }),
}));

describe('Componente Input', () => {
  beforeEach(() => {
    mockTrack.mockClear();
  });

  // TEST 1: Renderizado básico con Label
  it('renderiza correctamente con label y placeholder', () => {
    render(<Input label='Correo' placeholder='user@mail.com' />);

    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/user@mail.com/i)).toBeInTheDocument();
  });

  // TEST 2: Estado de Error
  it('muestra el borde rojo y mensaje cuando hay error', () => {
    render(<Input label='Password' error='Contraseña incorrecta' />);

    const input = screen.getByLabelText(/password/i);
    const errorMessage = screen.getByText(/contraseña incorrecta/i);

    expect(input).toHaveClass('border-danger'); // Clase de Tailwind
    expect(errorMessage).toBeInTheDocument();
  });

  // TEST 3: Tracking al hacer Blur (salir del input)
  it('ejecuta tracking al perder el foco (onBlur)', async () => {
    render(<Input label='Nombre' name='firstname' />);

    const input = screen.getByLabelText(/nombre/i);

    // Usuario escribe y se sale
    await userEvent.type(input, 'Juan');
    await userEvent.tab(); // Esto dispara el onBlur

    expect(mockTrack).toHaveBeenCalledWith({
      component: 'Input',
      variant: 'text',
      action: 'blur',
      metadata: { name: 'firstname' },
    });
  });

  // TEST 4: Estado de Success
  it('muestra el borde verde y el icono cuando success es true', () => {
    render(<Input label='Email' success={true} />);

    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveClass('border-success');
  });
});
