import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const Grid = ({ empresas, setEmpresas, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    }

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = empresas.filter((empresa) => empresa.id !== id);

                setEmpresas(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    }

    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome Cliente</Th>
                    <Th>Senha</Th>
                    <Th>Nome Empresa</Th>
                    <Th>CNPJ</Th>
                    <Th>CEP</Th>
                    <Th>Endereço</Th>
                    <Th>Número</Th>
                    <Th>Telefone</Th>
                    <Th>Email</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {empresas.map((item, i) => (
                    <Tr key={i}>
                        <Td width="10%">{item.nomeCliente}</Td>
                        <Td width="8%">{item.senha}</Td>
                        <Td width="13%">{item.nomeEmpresa}</Td>
                        <Td width="13%">{item.cnpj}</Td>
                        <Td width="8%">{item.cep}</Td>
                        <Td width="12%">{item.endereco}</Td>
                        <Td width="7%">{item.numero}</Td>
                        <Td width="9%">{item.telefone}</Td>
                        <Td width="15%">{item.email}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)}/>
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)}/>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );

};

export default Grid;