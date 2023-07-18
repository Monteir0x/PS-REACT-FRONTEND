import Conta from "./conta";

export default interface Transferencia {
    id: number;
    dataTransferencia: string;
    valor: number;
    tipo: string;
    nomeOperadorTransacao: string;
    conta: Conta;
}