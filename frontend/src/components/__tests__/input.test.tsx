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

  // TEST 5: Estado de Warning
  it('muestra el borde naranja y mensaje de advertencia', () => {
    render(
      <Input label='Usuario' warning helperText='Se recomienda minúsculas' />
    );

    const input = screen.getByLabelText(/usuario/i);
    const helperText = screen.getByText(/se recomienda minúsculas/i);

    expect(input).toHaveClass('border-warning');
    expect(helperText).toBeInTheDocument();
  });

  // TEST 6: Tipo Password con toggle de visibilidad
  it('alterna entre mostrar y ocultar contraseña en tipo password', async () => {
    render(<Input label='Contraseña' type='password' />);

    const input = screen.getByLabelText(/contraseña/i) as HTMLInputElement;
    const toggleButton = screen.getByRole('button');

    expect(input.type).toBe('password');

    await userEvent.click(toggleButton);
    expect(input.type).toBe('text');

    await userEvent.click(toggleButton);
    expect(input.type).toBe('password');
  });

  // TEST 7: Tipo Email con icono
  it('renderiza icono de mail cuando type es email', () => {
    const { container } = render(<Input label='Correo' type='email' />);

    const mailIcon = container.querySelector('svg');
    expect(mailIcon).toBeInTheDocument();
  });

  // TEST 8: Tamaños diferentes
  it('aplica las clases correctas según el tamaño', () => {
    const { rerender } = render(<Input label='Small' size='sm' />);
    let input = screen.getByLabelText(/small/i);
    expect(input).toHaveClass('px-3', 'py-1.5', 'text-sm');

    rerender(<Input label='Large' size='lg' />);
    input = screen.getByLabelText(/large/i);
    expect(input).toHaveClass('px-5', 'py-3', 'text-lg');
  });

  // TEST 9: Helper text sin error
  it('muestra helper text cuando no hay error', () => {
    render(<Input label='Campo' helperText='Texto de ayuda' />);

    const helperText = screen.getByText(/texto de ayuda/i);
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass('text-gray-500');
  });

  // TEST 10: Error tiene prioridad sobre helper text
  it('muestra error en lugar de helper text cuando ambos están presentes', () => {
    render(<Input label='Campo' error='Error crítico' helperText='Ayuda' />);

    expect(screen.getByText(/error crítico/i)).toBeInTheDocument();
    expect(screen.queryByText(/ayuda/i)).not.toBeInTheDocument();
  });

  // TEST 11: Input deshabilitado
  it('muestra input deshabilitado cuando disabled es true', () => {
    render(<Input label='Campo' disabled />);

    const input = screen.getByLabelText(/campo/i);
    expect(input).toBeDisabled();
  });
});
