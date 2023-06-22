import * as React from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  Select,
  Text,
  CheckIcon,
} from "native-base";
import { useState, useEffect } from "react";
import { useGet, usePost } from "../api/axios";

const Example = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [service, setService] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [coordinatesError, setCoordinatesError] = useState("");
  const [serviceError, setServiceError] = useState("");

  const { data: maps } = useGet("/maps");
  const { postData, loading, error } = usePost("/areas");

  const validateName = () => {
    if (!name) {
      setNameError("Digite o nome da área");
    } else {
      setNameError("");
    }
  };

  const validateDescription = () => {
    if (!description) {
      setDescriptionError("Digite a descrição da área");
    } else {
      setDescriptionError("");
    }
  };

  const validateCoordinates = () => {
    if (!coordinates) {
      setCoordinatesError("Digite as coordenadas da área");
    } else {
      setCoordinatesError("");
    }
  };

  const validateService = () => {
    if (!service) {
      setServiceError("Escolha um serviço para a área");
    } else {
      setServiceError("");
    }
  };

  const handleSignUp = () => {
    validateName();
    validateDescription();
    validateCoordinates();
    validateService();

    if (name && description && coordinates && service) {
      const areaData = {
        name: name,
        description: description,
        coordinates: coordinates,
        service: service,
      };

      postData(areaData);
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
          Cadastrar Área
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
          Cadastre a área para continuar!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={nameError !== ""}>
            <FormControl.Label>Nome</FormControl.Label>
            <Input
              type="text"
              value={name}
              onChangeText={(value) => setName(value)}
              onBlur={validateName}
            />
            <FormControl.ErrorMessage>
              {nameError}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={descriptionError !== ""}>
            <FormControl.Label>Descrição</FormControl.Label>
            <Input
              type="text"
              value={description}
              onChangeText={(value) => setDescription(value)}
              onBlur={validateDescription}
            />
            <FormControl.ErrorMessage>
              {descriptionError}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={coordinatesError !== ""}>
            <FormControl.Label>Coordenadas</FormControl.Label>
            <Input
              type="text"
              value={coordinates}
              onChangeText={(value) => setCoordinates(value)}
              onBlur={validateCoordinates}
            />
            <FormControl.ErrorMessage>
              {coordinatesError}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={serviceError !== ""}>
            <FormControl.Label>Mapa</FormControl.Label>
            <Select
              selectedValue={service}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setService(itemValue)}
            >
              {maps.map((map) => (
                <Select.Item key={map.id} label={map.name} value={map.id} />
              ))}
            </Select>
            <FormControl.ErrorMessage>
              {serviceError}
            </FormControl.ErrorMessage>
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

export const Areas = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
