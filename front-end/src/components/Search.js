import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import InputMask from "react-input-mask";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Toast, ToastContainer, toast } from "react-toastify";

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

const FomrContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Search = ({onEdit, empresas, setEmpresas, setOnEdit}) => {
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const ref = useRef();

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

    useEffect(() => {
        if(onEdit){
            const empresa = ref.current;
            empresa.cnpj.value = onEdit.cnpj;
        }
    }, [onEdit]);
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cnpj = encodeURIComponent(ref.current.cnpj.value);

        try {
            const response = await axios.get(`http://localhost:8800/search/${cnpj}`);
            if (response.data) {
                setSelectedEmpresa(response.data);
                toast.success("Empresa encontrada.");
            } else {
                setSelectedEmpresa(null);
                toast.error("Empresa não encontrada.");
            }
        } catch (error) {
            console.error(error);
            setSelectedEmpresa(null);
            toast.error("Empresa não encontrada.");
  }
    };

    return(
        <div>
            <FomrContainer ref={ref} onSubmit={handleSubmit} >
                <InputArea>
                    <Label>Pesquisar CNPJ</Label>
                    <InputMask mask="99.999.999/9999-99" maskPlaceholder="" name="cnpj">
                        {(inputProps) => <Input {...inputProps} />}
                    </InputMask>
                </InputArea>

                <Button type="submit">Pesquisar</Button>

                <br />
                
                {selectedEmpresa && (
                <div>
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
                                <Tr>
                                    <Td width="10%">{selectedEmpresa.nomeCliente}</Td>
                                    <Td width="8%">{selectedEmpresa.senha}</Td>
                                    <Td width="13%">{selectedEmpresa.nomeEmpresa}</Td>
                                    <Td width="13%">{selectedEmpresa.cnpj}</Td>
                                    <Td width="8%">{selectedEmpresa.cep}</Td>
                                    <Td width="12%">{selectedEmpresa.endereco}</Td>
                                    <Td width="7%">{selectedEmpresa.numero}</Td>
                                    <Td width="9%">{selectedEmpresa.telefone}</Td>
                                    <Td width="15%">{selectedEmpresa.email}</Td>
                                    <Td alignCenter width="5%">
                                        <FaEdit onClick={() => handleEdit(selectedEmpresa)}/>
                                    </Td>
                                    <Td alignCenter width="5%">
                                        <FaTrash onClick={() => handleDelete(selectedEmpresa.id)}/>
                                    </Td>
                                </Tr>
                        </Tbody>
                    </Table>
                </div>
                )}
            </FomrContainer>
        </div>
    );
};

export default Search;