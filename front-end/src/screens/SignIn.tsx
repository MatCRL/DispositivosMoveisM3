import * as React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";
import { useState } from "react";
import { usePost } from "../api/axios";

const Example = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { postData, loading, error } = usePost("/auth/email/login");

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

  const handleSignIn = () => {
    validateEmail();
    validatePassword();

    if (email && password) {
      const data = { email, password };
      postData(data);
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Bem-vindo
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Entre para continuar!
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
            <FormControl.ErrorMessage>
              {emailError}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={passwordError !== ""}>
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              onBlur={validatePassword}
            />
            <FormControl.ErrorMessage>
              {passwordError}
            </FormControl.ErrorMessage>
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            ></Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleSignIn} isLoading={loading}>
            Entrar
          </Button>
          {error && <Text color="red.500">Erro: {error.message}</Text>}
          <HStack mt="1" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            ></Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
            ></Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export const SignIn = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
