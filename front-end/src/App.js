import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import Search from "./components/Search.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [empresas, setEmpresas] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getEmpresas = async () => {
    try{
      const res = await axios.get("http://localhost:8800");
      setEmpresas(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch(error){
      toast.error(error);
    }
  };

  useEffect(() => {
    getEmpresas();
  }, [setEmpresas]);

  return (
    <>
      <Container>
          <Title>CRUD de Empresas</Title>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getEmpresas={getEmpresas}/>
          <Search empresas={empresas} onEdit={onEdit} setOnEdit={setOnEdit} getEmpresas={getEmpresas} setEmpresas={setEmpresas}></Search>
          <Grid empresas={empresas} setEmpresas={setEmpresas} setOnEdit={setOnEdit}/>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
