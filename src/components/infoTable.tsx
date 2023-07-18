import { DatePicker } from "@mui/x-date-pickers";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  ExtendTable,
  FlexContainer,
  MoneyInfo,
  PesquisarButton
} from "./styles"
import React, { useState, useEffect } from "react";
import Transferencia from "../interfaces/transferencia";
import { fetchDataFromApi } from "../services/api/apiService"
import { ApiException } from "../services/api/ApiException";
import { DateUtil } from "../util/dateUtil"

export function InfoTable() {

  const [dataFromApi, setDataFromApi] = useState<Transferencia[] | ApiException>([]);

  const [nomeOperadorTransacao, setnomeOperadorTransacao] = useState<string>("");
  const [dataInicial, setdataInicial] = useState<string | null>(null);
  const [dataFinal, setdataFinal] = useState<string | null>(null);

  const handlenomeOperadorTransacaoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setnomeOperadorTransacao(event.target.value);
  };


  const handleDataInicial = (date: string | null) => {
    setdataInicial(date);
  };

  const handleDataFinal = (date: string | null) => {
    setdataFinal(date);
  };

  async function fetchData(params: string) {
    const result = await fetchDataFromApi(params);
    if (result instanceof ApiException) return;
    setDataFromApi(result);
  }
  const handleQuery = () => {
    const params = [];

    if (nomeOperadorTransacao) {
      params.push(`nomeOperadorTransacao=${nomeOperadorTransacao}`)
    }

    if (dataInicial) {
      params.push(`dataInicial=${DateUtil.parseStringDateToLocalDate(dataInicial)}`)
    }

    if (dataFinal) {
      params.push(`dataFinal=${DateUtil.parseStringDateToLocalDate(dataFinal)}`)
    }

    if (params.length > 0) {
      return `?${params.join("&")}`;
    }
    return "";
  }

  const handleClearFields = () => {
    if (nomeOperadorTransacao) {
      setnomeOperadorTransacao("");
    }

    if (dataInicial) {
      setdataInicial(null);
    }

    if (dataFinal) {
      setdataFinal(null);
    }
  }
  
  const handleClick = () => {

    void fetchData(handleQuery());
    handleClearFields();
  };

  useEffect(() => {
    void fetchData("");
  }, []);

  return (
    <>
      <form>
        <FlexContainer>
          <DatePicker
            value={dataInicial}
            onChange={handleDataInicial}
            label="Data de início"
          />
          <DatePicker
            label="Data de fim"
            value={dataFinal}
            onChange={handleDataFinal}
          />
          <TextField
            value={nomeOperadorTransacao}
            onChange={handlenomeOperadorTransacaoChange}
            label="Nome operador transacionado"
          />
        </FlexContainer>
        <PesquisarButton>
          <Button onClick={handleClick} variant="outlined">
            Pesquisar
          </Button>
        </PesquisarButton>
      </form>
      <FlexContainer>
        <Box width="100%">
          <ExtendTable>
            <MoneyInfo>
              <Typography fontSize={20} m={1}>
                Valor Total: {!(dataFromApi instanceof ApiException) && dataFromApi.length > 0 ? dataFromApi.map((item) => item.valor).reduce((a : number,b : number) => a + b).toFixed(2) : 0}
              </Typography>
            </MoneyInfo>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dados</TableCell>
                    <TableCell>Valentia</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Nome operador transacionado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!(dataFromApi instanceof ApiException) && dataFromApi.map((transferencia) => (
                    <TableRow key={transferencia.id}>
                      <TableCell>
                        {DateUtil.formatDateToLocalDate(transferencia.dataTransferencia)}
                      </TableCell>
                      <TableCell>{transferencia.valor}</TableCell>
                      <TableCell>{transferencia.tipo}</TableCell>
                      <TableCell>
                        {transferencia.nomeOperadorTransacao}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExtendTable>
        </Box>
      </FlexContainer>
    </>
  );
}
