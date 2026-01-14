import { render, screen } from '@testing-library/react';
import { Input } from '../input';
import userEvent from '@testing-library/user-event';

const mockTrack = jest.fn();
jest.mock('../../hooks/use-tracking', () => ({
  useTracking: () => ({ track: mockTrack }),
}));

describe('Componente Input', () => {
  beforeEach(() => {
    mockTrack.mockClear();
  });

  it('renderiza correctamente con label y placeholder', () => {
    render(<Input label='Correo' placeholder='user@mail.com' />);

    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/user@mail.com/i)).toBeInTheDocument();
  });

  it('muestra el borde rojo y mensaje cuando hay error', () => {
    render(<Input label='Password' error='Contraseña incorrecta' />);

    const input = screen.getByLabelText(/password/i);
    const errorMessage = screen.getByText(/contraseña incorrecta/i);

    expect(input).toHaveClass('border-danger');
    expect(errorMessage).toBeInTheDocument();
  });

  it('ejecuta tracking al perder el foco (onBlur)', async () => {
    render(<Input label='Nombre' name='firstname' />);

    const input = screen.getByLabelText(/nombre/i);

    await userEvent.type(input, 'Juan');
    await userEvent.tab();

    expect(mockTrack).toHaveBeenCalledWith({
      component: 'Input',
      variant: 'text',
      action: 'blur',
      metadata: { name: 'firstname' },
    });
  });

  it('muestra el borde verde y el icono cuando success es true', () => {
    render(<Input label='Email' success={true} />);

    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveClass('border-success');
  });

  it('muestra el borde naranja y mensaje de advertencia', () => {
    render(
      <Input label='Usuario' warning helperText='Se recomienda minúsculas' />
    );

    const input = screen.getByLabelText(/usuario/i);
    const helperText = screen.getByText(/se recomienda minúsculas/i);

    expect(input).toHaveClass('border-warning');
    expect(helperText).toBeInTheDocument();
  });

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

  it('renderiza icono de mail cuando type es email', () => {
    const { container } = render(<Input label='Correo' type='email' />);

    const mailIcon = container.querySelector('svg');
    expect(mailIcon).toBeInTheDocument();
  });

  it('aplica las clases correctas según el tamaño', () => {
    const { rerender } = render(<Input label='Small' size='sm' />);
    let input = screen.getByLabelText(/small/i);
    expect(input).toHaveClass('px-3', 'py-1.5', 'text-sm');

    rerender(<Input label='Large' size='lg' />);
    input = screen.getByLabelText(/large/i);
    expect(input).toHaveClass('px-5', 'py-3', 'text-lg');
  });

  it('muestra helper text cuando no hay error', () => {
    render(<Input label='Campo' helperText='Texto de ayuda' />);

    const helperText = screen.getByText(/texto de ayuda/i);
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass('text-gray-500');
  });

  it('muestra error en lugar de helper text cuando ambos están presentes', () => {
    render(<Input label='Campo' error='Error crítico' helperText='Ayuda' />);

    expect(screen.getByText(/error crítico/i)).toBeInTheDocument();
    expect(screen.queryByText(/ayuda/i)).not.toBeInTheDocument();
  });

  it('muestra input deshabilitado cuando disabled es true', () => {
    render(<Input label='Campo' disabled />);

    const input = screen.getByLabelText(/campo/i);
    expect(input).toBeDisabled();
  });
});
