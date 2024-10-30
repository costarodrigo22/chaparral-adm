import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SectionsEditWrapper from '../SectionsEditWrapper';

const createQueryClient = () => new QueryClient();
const queryClient = createQueryClient();

const mockProps = {
  title: 'Mocked Title',
  children: <div>Mocked Child Component</div>,
};

describe('Edit wrapper section component', () => {
  it('should render the edit wrapper section component with especified props', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <SectionsEditWrapper {...mockProps} />
      </QueryClientProvider>,
    );

    expect(getByText('Mocked Title')).toBeInTheDocument();

    expect(getByText('Mocked Child Component')).toBeInTheDocument();
  });
});
