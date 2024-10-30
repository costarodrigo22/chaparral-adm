import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FileUploader from '..';

const createQueryClient = () => new QueryClient();
const queryClient = createQueryClient();

const MockProps = {
  height: 340,
  width: 190,
  title: 'Papel de parede',
  endpoint: 'teste',
  suggestedHeight: 1440,
  suggestedWidth: 800,
  onFileSelect: vi.fn(),
};

describe('FileUploader Component', () => {
  it('should render the FileUploader component with specified props', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <FileUploader {...MockProps} />
      </QueryClientProvider>,
    );

    expect(getByText(MockProps.title)).toBeInTheDocument();
    expect(
      getByText(`Largura: ${MockProps.suggestedWidth} px`),
    ).toBeInTheDocument();
    expect(
      getByText(`Altura: ${MockProps.suggestedHeight} px`),
    ).toBeInTheDocument();
  });

  it('should render static svg and text in the component', () => {
    const { getByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <FileUploader {...MockProps} />
      </QueryClientProvider>,
    );

    // Verifica se o ícone e o texto "Adicionar imagem" estão presentes
    expect(getByTestId('imageIcon')).toBeInTheDocument();
    expect(getByText('Adicionar imagem')).toBeInTheDocument();
  });

  it('should show delete icon when an image is displayed', () => {
    const handleFileSelectMock = vi.fn();
    const { getByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <FileUploader
          {...MockProps}
          onFileSelect={handleFileSelectMock}
          actualImage="test.jpg"
        />
      </QueryClientProvider>,
    );

    // Verifica se a imagem atual é exibida
    expect(getByText('Papel de parede')).toBeInTheDocument();
    expect(getByTestId('trashIcon')).toBeInTheDocument();
  });

  it('should call handleDeleteImage when delete icon is clicked', () => {
    const handleFileSelectMock = vi.fn();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <FileUploader
          {...MockProps}
          onFileSelect={handleFileSelectMock}
          actualImage="test.jpg"
        />
      </QueryClientProvider>,
    );

    // Simula o clique no ícone de exclusão
    fireEvent.click(getByTestId('trashIcon'));
    expect(handleFileSelectMock).toHaveBeenCalledWith(null, null);
  });
});
