import { httpClient } from '../httpClient';
import { IAddImage } from './addCardImage';

export async function addPageImage({ id, file }: IAddImage) {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('file', file);

  try {
    const response = await httpClient.post('/api/v1/recipes/create_page_image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding card image recipe:', error);
  }
}
