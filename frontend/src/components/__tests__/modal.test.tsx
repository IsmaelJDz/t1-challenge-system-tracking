import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../modal';
import userEvent from '@testing-library/user-event';

const mockTrack = jest.fn();
jest.mock('../../hooks/use-tracking', () => ({
  useTracking: () => ({ track: mockTrack }),
}));

describe('Componente Modal', () => {
  beforeEach(() => {
    mockTrack.mockClear();
  });

  it('no renderiza nada si isOpen es false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Contenido secreto</p>
      </Modal>
    );
    expect(screen.queryByText('Contenido secreto')).not.toBeInTheDocument();
  });

  it('renderiza correctamente cuando isOpen es true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title='Mi Modal'>
        <p>Contenido visible</p>
      </Modal>
    );
    expect(screen.getByText('Mi Modal')).toBeInTheDocument();
    expect(screen.getByText('Contenido visible')).toBeInTheDocument();
  });

  it('llama a onClose y trackea al hacer click en la X', async () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title='Test Close'>
        Body
      </Modal>
    );

    const closeButton = screen.getByLabelText(/cerrar modal/i);
    await userEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith({
      component: 'Modal',
      action: 'close',
      metadata: { origin: 'close-button' },
    });
  });

  it('cierra al hacer click fuera del contenido (overlay)', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title='Overlay Test'>
        Body
      </Modal>
    );

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith({
      component: 'Modal',
      action: 'close',
      metadata: { origin: 'overlay' },
    });
  });
});
