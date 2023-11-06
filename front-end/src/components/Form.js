import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import InputMask from "react-input-mask";
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

    function isCnpjValid(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
      
        if (cnpj.length !== 14) {
          return false;
        }
      
        if (
          cnpj === '00000000000000' ||
          cnpj === '11111111111111' ||
          cnpj === '22222222222222' ||
          cnpj === '33333333333333' ||
          cnpj === '44444444444444' ||
          cnpj === '55555555555555' ||
          cnpj === '66666666666666' ||
          cnpj === '77777777777777' ||
          cnpj === '88888888888888' ||
          cnpj === '99999999999999'
        ) {
          return false;
        }
      
        let size = cnpj.length - 2;
        let numbers = cnpj.substring(0, size);
        const digits = cnpj.substring(size);
        let sum = 0;
        let pos = size - 7;
      
        for (let i = size; i >= 1; i--) {
          sum += numbers.charAt(size - i) * pos--;
          if (pos < 2) {
            pos = 9;
          }
        }
      
        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      
        if (result !== Number(digits.charAt(0))) {
          return false;
        }
      
        size = size + 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;
      
        for (let i = size; i >= 1; i--) {
          sum += numbers.charAt(size - i) * pos--;
          if (pos < 2) {
            pos = 9;
          }
        }
      
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      
        if (result !== Number(digits.charAt(1))) {
          return false;
        }
      
        return true;
    }

    const [enderecoInfo, setEndereco] = useState({
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
    });

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
    
    const buscarEndereco = async (cep) => {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          const data = response.data;
      
          if (!data.erro) {
            setEndereco({
              logradouro: data.logradouro,
              bairro: data.bairro,
              localidade: data.localidade,
              uf: data.uf,
            });
          } else {
            toast.error("CEP não encontrado");
          }
        } catch (error) {
          toast.error("Erro ao buscar o CEP");
        }
    };
      

    const handleSubmit = async (e) => {
        e.preventDefault();

        const empresa = ref.current;

        if (
            !empresa.nomeCliente.value ||
            !empresa.senha.value ||
            !empresa.nomeEmpresa.value ||
            !empresa.cnpj.value ||
            !empresa.cep.value ||
            !empresa.endereco.value ||
            !empresa.numero.value ||
            !empresa.telefone.value ||
            !empresa.email.value
        ) {
            return toast.warn("Preencha todos os campos corretamente!");
        }

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
        
        if (!isCnpjValid(empresa.cnpj.value)) {
            return toast.warn("CNPJ inválido");
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
                <InputMask mask="99.999.999/9999-99" maskPlaceholder="" name="cnpj">
                    {(inputProps) => <Input {...inputProps} />}
                </InputMask>
            </InputArea>
            <InputArea>
            <Label>CEP</Label>
                <InputMask mask="99999-999" maskPlaceholder="" name="cep" onBlur={(e) => buscarEndereco(e.target.value.replace("-", ""))}>
                    {(inputProps) => <Input {...inputProps} />}
                </InputMask>
            </InputArea>
            <InputArea>
                <Label>Endereço</Label>
                <Input 
                    name="endereco"
                    value={`${enderecoInfo.logradouro}, ${enderecoInfo.bairro}, ${enderecoInfo.localidade} - ${enderecoInfo.uf}`}
                    onChange={() => {}}
                />
            </InputArea>
            <InputArea>
                <Label>Número</Label>
                <Input name="numero" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <InputMask mask="+55 (99) 99999-9999" maskPlaceholder="" name="telefone">
                    {(inputProps) => <Input {...inputProps} />}
                </InputMask>
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