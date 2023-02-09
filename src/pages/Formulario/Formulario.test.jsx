import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";

import Formulario from "./Formulario";

test("Se algum campo estiver vazio, não pode cadastrar", () => {
  render(<Formulario />);
  // encontrar no DOM o card
  const card = screen.getAllByText("Campos");
  // encontrar o botão
  const botao = screen.getByRole("button");
  // garantir que o card esteja no documento
  waitFor(() => expect(card).toBeInTheDocument());
  // garantir que o botão esteja desabilitado
  expect(botao).toBeDisabled();
});

test("Cadastrar, caso exista todos os valores preenchidos corretamente", () => {
  render(<Formulario />);

  // encontrar no DOM os inputs
  const inputNome = screen.getByLabelText(/^Nome/i);
  const inputEnd = screen.getByLabelText(/^Endereço/i);
  const inputTel = screen.getByLabelText(/^Telefone/i);
  const inputEmail = screen.getByLabelText(/^Email/i);
  const inputData = screen.getByLabelText(/^Data de nascimento/i);
  // encontrar o botão
  const botao = screen.getByRole("button");

  // inserir um valor aos inputs
  fireEvent.change(inputNome, {
    target: {
      value: "Mateus Lima",
    },
  });
  fireEvent.change(inputEnd, {
    target: {
      value: "Rua Lima, 23",
    },
  });
  fireEvent.change(inputTel, {
    target: {
      value: "85999999999",
    },
  });
  fireEvent.change(inputEmail, {
    target: {
      value: "mateus@gmail.com",
    },
  });
  fireEvent.change(inputData, {
    target: {
      value: "15/02/1996",
    },
  });

  // clicar no botão de submeter
  fireEvent.click(botao);

  // garantir que os inputs não tenham um valor
  expect(inputNome).toHaveValue();
  expect(inputEnd).toHaveValue();
  expect(inputTel).toHaveValue();
  expect(inputEmail).toHaveValue();
  expect(inputData).toHaveValue();
});

test("Se a data for invalida 30/02/2020, mostrar error", () => {
  render(<Formulario />);

  // encontrar no DOM os inputs
  const inputNome = screen.getByLabelText(/^Nome/i);
  const inputEnd = screen.getByLabelText(/^Endereço/i);
  const inputTel = screen.getByLabelText(/^Telefone/i);
  const inputEmail = screen.getByLabelText(/^Email/i);
  const inputData = screen.getByLabelText(/^Data de nascimento/i);
  // encontrar o botão
  const botao = screen.getByRole("button");

  // inserir um valor aos inputs
  fireEvent.change(inputNome, {
    target: {
      value: "Mateus Lima",
    },
  });
  fireEvent.change(inputEnd, {
    target: {
      value: "Rua Lima, 23",
    },
  });
  fireEvent.change(inputTel, {
    target: {
      value: "85999999999",
    },
  });
  fireEvent.change(inputEmail, {
    target: {
      value: "mateus@gmail.com",
    },
  });
  fireEvent.change(inputData, {
    target: {
      value: "30/02/2020",
    },
  });

  // clicar no botão de submeter
  fireEvent.click(botao);

  //encontrar mensagem no DOM
  waitFor(() =>
    expect(
      screen.getByText(/^Necessário preencher o campo com data válida./i)
    ).toBeInTheDocument()
  );
});

test("Se o nome conter numeros, mostrar error", () => {
  render(<Formulario />);

  // encontrar no DOM os inputs
  const inputNome = screen.getByLabelText(/^Nome/i);
  const inputEnd = screen.getByLabelText(/^Endereço/i);
  const inputTel = screen.getByLabelText(/^Telefone/i);
  const inputEmail = screen.getByLabelText(/^Email/i);
  const inputData = screen.getByLabelText(/^Data de nascimento/i);
  // encontrar o botão
  const botao = screen.getByRole("button");

  // inserir um valor aos inputs
  fireEvent.change(inputNome, {
    target: {
      value: "Mateus Lima 30",
    },
  });
  fireEvent.change(inputEnd, {
    target: {
      value: "Rua Lima, 23",
    },
  });
  fireEvent.change(inputTel, {
    target: {
      value: "85999999999",
    },
  });
  fireEvent.change(inputEmail, {
    target: {
      value: "mateus@gmail.com",
    },
  });
  fireEvent.change(inputData, {
    target: {
      value: "15/02/1996",
    },
  });

  // clicar no botão de submeter
  fireEvent.click(botao);

  //encontrar mensagem no DOM
  waitFor(() =>
    expect(
      screen.getByText(/^Necessário preencher o campo com nome válido./i)
    ).toBeInTheDocument()
  );
});

test("Se o telefone conter letras, mostrar error", () => {
  render(<Formulario />);

  // encontrar no DOM os inputs
  const inputNome = screen.getByLabelText(/^Nome/i);
  const inputEnd = screen.getByLabelText(/^Endereço/i);
  const inputTel = screen.getByLabelText(/^Telefone/i);
  const inputEmail = screen.getByLabelText(/^Email/i);
  const inputData = screen.getByLabelText(/^Data de nascimento/i);
  // encontrar o botão
  const botao = screen.getByRole("button");

  // inserir um valor aos inputs
  fireEvent.change(inputNome, {
    target: {
      value: "Mateus Lima",
    },
  });
  fireEvent.change(inputEnd, {
    target: {
      value: "Rua Lima, 23",
    },
  });
  fireEvent.change(inputTel, {
    target: {
      value: "859999999aa",
    },
  });
  fireEvent.change(inputEmail, {
    target: {
      value: "mateus@gmail.com",
    },
  });
  fireEvent.change(inputData, {
    target: {
      value: "15/02/1996",
    },
  });

  // clicar no botão de submeter
  fireEvent.click(botao);

  //encontrar mensagem no DOM
  waitFor(() =>
    expect(
      screen.getByText(/^Necessário preencher o campo com telefone válido./i)
    ).toBeInTheDocument()
  );
});

test("Se o email não conter o formator certo, mostrar error", () => {
  render(<Formulario />);

  // encontrar no DOM os inputs
  const inputNome = screen.getByLabelText(/^Nome/i);
  const inputEnd = screen.getByLabelText(/^Endereço/i);
  const inputTel = screen.getByLabelText(/^Telefone/i);
  const inputEmail = screen.getByLabelText(/^Email/i);
  const inputData = screen.getByLabelText(/^Data de nascimento/i);
  // encontrar o botão
  const botao = screen.getByRole("button");

  // inserir um valor aos inputs
  fireEvent.change(inputNome, {
    target: {
      value: "Mateus Lima",
    },
  });
  fireEvent.change(inputEnd, {
    target: {
      value: "Rua Lima, 23",
    },
  });
  fireEvent.change(inputTel, {
    target: {
      value: "85999999999",
    },
  });
  fireEvent.change(inputEmail, {
    target: {
      value: "mateusgmail.com",
    },
  });
  fireEvent.change(inputData, {
    target: {
      value: "15/02/1996",
    },
  });

  // clicar no botão de submeter
  fireEvent.click(botao);

  //encontrar mensagem no DOM
  waitFor(() =>
    expect(
      screen.getByText(/^Necessário preencher o campo com e-mail válido./i)
    ).toBeInTheDocument()
  );
});
