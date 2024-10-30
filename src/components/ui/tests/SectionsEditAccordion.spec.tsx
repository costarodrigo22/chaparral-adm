import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SectionsEditAccordion from '../SectionsEditAccordion';

const createQueryClient = () => new QueryClient();
const queryClient = createQueryClient();

const mockProps = {
  title: 'Mocked Title',
  children: <div>Mocked Child Component</div>,
};

describe('Edit Accordion section component', () => {
  it('should render the edit acordion section component with especified props', () => {
    const { getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <SectionsEditAccordion {...mockProps} />
      </QueryClientProvider>,
    );
    expect(getByText('Mocked Title')).toBeInTheDocument();
    expect(queryByText('Mocked Child Component')).not.toBeInTheDocument();
  });
  it('should click in accordion title and render the children interface', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <SectionsEditAccordion {...mockProps} />
      </QueryClientProvider>,
    );
    fireEvent.click(getByText('Mocked Title'));

    expect(getByText('Mocked Child Component')).toBeInTheDocument();
  });
});
