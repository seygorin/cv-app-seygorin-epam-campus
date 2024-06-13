import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';

test('renders button', () => {
  render(<Button />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
