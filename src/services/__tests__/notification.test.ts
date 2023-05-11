import { NotifyService } from '../notification';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Notification service', () => {
  it('calls toast.success with the provided text for success', () => {
    const text = 'Test Success Message';
    NotifyService.success(text);
    expect(toast.success).toHaveBeenCalledWith(text);
  });

  it('calls toast.info with the provided text for info', () => {
    const text = 'Test Info Message';
    NotifyService.info(text);
    expect(toast.info).toHaveBeenCalledWith(text);
  });

  it('calls toast.warn with the provided text for warn', () => {
    const text = 'Test Warning Message';
    NotifyService.warn(text);
    expect(toast.warn).toHaveBeenCalledWith(text);
  });

  it('calls toast.error with the provided text for error', () => {
    const text = 'Test Error Message';
    NotifyService.error(text);
    expect(toast.error).toHaveBeenCalledWith(text);
  });
});
