import * as React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
} from "native-base";
import { useState } from "react";
import { usePost } from "../api/axios"; // Importe o hook usePost

const Example = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const { postData, loading, error } = usePost("/auth/email/register"); // Use o hook usePost

  const validateEmail = () => {
    if (!email) {
      setEmailError("Digite um email válido");
    } else {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        setEmailError("Email inválido");
      } else {
        setEmailError("");
      }
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Digite a senha");
    } else {
      setPasswordError("");
    }
  };

  const validateName = () => {
    if (!name) {
      setNameError("Digite o nome");
    } else {
      setNameError("");
    }
  };

  const validateLastName = () => {
    if (!lastName) {
      setLastNameError("Digite o sobrenome");
    } else {
      setLastNameError("");
    }
  };

  const handleSignUp = () => {
    validateEmail();
    validatePassword();
    validateName();
    validateLastName();

    if (email && password && name && lastName) {
      const userData = {
        email: email,
        password: password,
        name: name,
        lastName: lastName,
      };

      postData(userData); // Use a função postData do hook usePost
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Bem-vindo
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Cadastre-se para continuar!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={emailError !== ""}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="text"
              value={email}
              onChangeText={(value) => setEmail(value)}
              onBlur={validateEmail}
            />
            <FormControl.ErrorMessage>{emailError}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={passwordError !== ""}>
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              onBlur={validatePassword}
            />
            <FormControl.ErrorMessage>{passwordError}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={nameError !== ""}>
            <FormControl.Label>Nome</FormControl.Label>
            <Input
              type="text"
              value={name}
              onChangeText={(value) => setName(value)}
              onBlur={validateName}
            />
            <FormControl.ErrorMessage>{nameError}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={lastNameError !== ""}>
            <FormControl.Label>Sobrenome</FormControl.Label>
            <Input
              type="text"
              value={lastName}
              onChangeText={(value) => setLastName(value)}
              onBlur={validateLastName}
            />
            <FormControl.ErrorMessage>{lastNameError}</FormControl.ErrorMessage>
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            isLoading={loading}
            onPress={handleSignUp}
          >
            Cadastrar
          </Button>
          {error && <Text>Error: {error.message}</Text>}
        </VStack>
      </Box>
    </Center>
  );
};

export const SignUp = () => {
  return (
    <NativeBaseProvider>
      <Example />
    </NativeBaseProvider>
  );
};
