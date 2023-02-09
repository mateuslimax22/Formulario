import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";
import TopBar from "../../components/TopBar/TopBar";
import InputMask from "react-input-mask";
import parse from "date-fns/parse";

const Formulario = () => {
  const [user, setUser] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    email: "",
    dataNasc: "",
  });

  const [status, setStatus] = useState({
    mensagem: "",
  });

  //Receber os dados do formulário
  const value = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  //Validação
  const validate = async () => {
    let schema = yup.object().shape({
      nome: yup
        .string()
        .matches(
          /^[A-Za-z ]*$/,
          "Necessário preencher o campo com nome válido."
        )
        .max(40)
        .required("Nome obrigatório."),
      endereco: yup.string().required("Endereço obrigatório."),
      telefone: yup
        .string()
        .required("Telefone obrigatório.")
        .typeError("Necessário preencher o campo com telefone válido.")
        .min(8, "Telefone precisa ter no mínimo 9 caracteres"),
      email: yup
        .string()
        .required()
        .email("Necessário preencher o campo com e-mail válido."),
      dataNasc: yup
        .date()
        .transform(function (value, originalValue) {
          if (this.isType(value)) {
            return value;
          }
          const result = parse(originalValue, "dd/MM/yyyy", new Date());
          return result;
        })
        .required("Data de nascimento obrigatória.")
        .typeError("Necessário preencher o campo com data válida.")
        .min(
          "01/01/1900",
          "Você não é imortal! Necessário preencher o campo com data válida."
        ),
    });
    try {
      await schema.validate(user);
      return true;
    } catch (err) {
      setStatus({
        mensagem: err.errors,
      });
      return false;
    }
  };

  //Enviar os dados
  const add = async (e) => {
    e.preventDefault();
    //Faz a validação dos campos
    if (!(await validate())) return;

    //Passou da validação
    const salvar = true;
    if (salvar) {
      setUser({
        nome: "",
        endereco: "",
        telefone: "",
        email: "",
        dataNasc: "",
      });
      setStatus({
        mensagem: "",
      });
    }
  };

  return (
    <>
      <TopBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 5,
        }}
      >
        <Card>
          <CardContent
            component="form"
            onSubmit={add}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: "500px",
              p: 0,
              px: 3,
              width: {
                xs: 300,
                sm: 450,
                md: 600,
                lg: 700,
                xl: 800,
              },
            }}
          >
            <Typography variant="h5">Campos</Typography>
            <Typography variant="subtitle2" color="error">
              {status.mensagem}
            </Typography>
            <TextField
              required
              name="nome"
              label="Nome"
              onChange={value}
              value={user.nome}
            />
            <TextField
              required
              label="Endereço"
              name="endereco"
              onChange={value}
              value={user.endereco}
            />
            <InputMask
              mask="(99)9 9999-9999"
              onChange={value}
              value={user.telefone}
            >
              {() => <TextField required name="telefone" label="Telefone" />}
            </InputMask>
            <TextField
              required
              name="email"
              label="Email"
              onChange={value}
              value={user.email}
            />

            <InputMask mask="99/99/9999" onChange={value} value={user.dataNasc}>
              {() => (
                <TextField
                  required
                  label="Data de nascimento"
                  name="dataNasc"
                />
              )}
            </InputMask>
            <Button
              disabled={
                !user.nome ||
                !user.telefone ||
                !user.dataNasc ||
                !user.email ||
                !user.endereco
              }
              sx={{ width: 150 }}
              variant="contained"
              type="submit"
            >
              Cadastrar
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Formulario;
