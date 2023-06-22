import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { usePut, useGet, useDelete, usePatch } from "../api/axios";
import { Alert } from "react-native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setIdUser] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const { putData, loading, error } = usePut("/perfil");
  const { data: getData } = useGet("auth/me");
  const { deleteData } = useDelete("/users");
  const { patchData: updateUser } = usePatch("/auth/me");

  useEffect(() => {
    const fetchUser = async () => {
      if (getData) {
        setIdUser(getData.id);
        setName(getData.firstName);
        setLastName(getData.lastName);
        setEmail(getData.email);
      } else {
        setIdUser("");
        setName("");
        setLastName("");
        setEmail("");
      }
    };

    fetchUser();
  }, []);

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

  const handleSave = async () => {
    validateEmail();
    validatePassword();
    validateName();
    validateLastName();

    if (email && name && lastName) {
      const userData: any = {
        email: email,
        firstName: name,
        lastName: lastName,
      };
      if (password) {
        userData.password = password;
      }
      await updateUser(userData);
      Alert.alert("Dados atualizados!");
      navigation.goBack();
    }
  };

  const handleDelete = async () => {
    try {
      Alert.alert("Delete", "Tem certeza de que deseja excluir sua conta?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            await deleteData(userId);
            AsyncStorage.removeItem("userToken");
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Altere seus dados
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
          {/* <FormControl isInvalid={passwordError !== ''}>
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
          </FormControl> */}
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
            onPress={handleSave}
          >
            Salvar
          </Button>
          <Button mt="2" colorScheme="red" onPress={handleDelete}>
            Excluir Conta
          </Button>
          {error && <Text>Error: {error.message}</Text>}
        </VStack>
      </Box>
    </Center>
  );
};

export const Profile = () => {
  return (
    <NativeBaseProvider>
      <ProfileScreen />
    </NativeBaseProvider>
  );
};
