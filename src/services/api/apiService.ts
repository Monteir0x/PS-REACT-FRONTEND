import api from './api'

import Transferencia from '../../interfaces/transferencia'
import { ApiException } from './ApiException';

export const fetchDataFromApi = async(params: string): Promise<Transferencia[] | ApiException> => {
  try {
    const { data } = await api.get<Transferencia[]>(`/transferencias/${params}`);
    return data;
  } catch(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return new ApiException(error.message || "Erro ao buscar as transferências") 
  }
}
