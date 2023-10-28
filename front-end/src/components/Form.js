import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Toast, ToastContainer, toast } from "react-toastify";

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

const Form = ({ getEmpresas, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit){
            const empresa = ref.current;

            empresa.nomeCliente.value = onEdit.nomeCliente;
            empresa.senha.value = onEdit.senha;
            empresa.nomeEmpresa.value = onEdit.nomeEmpresa;
            empresa.cnpj.value = onEdit.cnpj;
            empresa.cep.value = onEdit.cep;
            empresa.endereco.value = onEdit.endereco;
            empresa.numero.value = onEdit.numero;
            empresa.telefone.value = onEdit.telefone;
            empresa.email.value = onEdit.email;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const empresa = ref.current;

        if(
            !empresa.nomeCliente.value ||
            !empresa.senha.value ||
            !empresa.nomeEmpresa.value ||
            !empresa.cnpj.value ||
            !empresa.cep.value ||
            !empresa.endereco.value ||
            !empresa.numero.value ||
            !empresa.telefone.value ||
            !empresa.email.value
        ){
            return toast.warn("Preencha todos os campos!");
        }

        if(onEdit){
            await axios
                .put("http://localhost:8800/"+onEdit.id, {
                    nomeCliente: empresa.nomeCliente.value,
                    senha: empresa.senha.value,
                    nomeEmpresa: empresa.nomeEmpresa.value,
                    cnpj: empresa.cnpj.value,
                    cep: empresa.cep.value,
                    endereco: empresa.endereco.value,
                    numero: empresa.numero.value,
                    telefone: empresa.telefone.value,
                    email: empresa.email.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else{
            await axios
                .post("http://localhost:8800", {
                    nomeCliente: empresa.nomeCliente.value,
                    senha: empresa.senha.value,
                    nomeEmpresa: empresa.nomeEmpresa.value,
                    cnpj: empresa.cnpj.value,
                    cep: empresa.cep.value,
                    endereco: empresa.endereco.value,
                    numero: empresa.numero.value,
                    telefone: empresa.telefone.value,
                    email: empresa.email.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        empresa.nomeCliente.value = "";
        empresa.senha.value = "";
        empresa.nomeEmpresa.value = "";
        empresa.cnpj.value = "";
        empresa.cep.value = "";
        empresa.endereco.value = "";
        empresa.numero.value = "";
        empresa.telefone.value = "";
        empresa.email.value = "";

        setOnEdit(null);
        getEmpresas();
    };

    return(
        <FomrContainer ref={ref} onSubmit={handleSubmit} >
            <InputArea>
                <Label>Nome Cliente</Label>
                <Input name="nomeCliente" />
            </InputArea>
            <InputArea>
                <Label>Senha</Label>
                <Input name="senha" type="password"/>
            </InputArea>
            <InputArea>
                <Label>Nome Empresa</Label>
                <Input name="nomeEmpresa" />
            </InputArea>
            <InputArea>
                <Label>CNPJ</Label>
                <Input name="cnpj" />
            </InputArea>
            <InputArea>
                <Label>CEP</Label>
                <Input name="cep" />
            </InputArea>
            <InputArea>
                <Label>Endereço</Label>
                <Input name="endereco" />
            </InputArea>
            <InputArea>
                <Label>Número</Label>
                <Input name="numero" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="telefone" />
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name="email" type="email" />
            </InputArea>

            <Button type="submit">Salvar</Button>
        </FomrContainer>
    );
};

export default Form;