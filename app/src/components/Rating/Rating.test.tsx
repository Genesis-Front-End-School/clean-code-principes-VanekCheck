import { render, screen } from '@testing-library/react';
import Rating from './Rating';

describe('Rating Component', () => {
  it('renders rating text', () => {
    render(<Rating rating={3.5} />);
    expect(screen.getByText('3.5')).toBeInTheDocument();

    render(<Rating rating={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
