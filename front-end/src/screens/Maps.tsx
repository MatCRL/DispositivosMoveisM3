import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
  Center,
  NativeBaseProvider,
} from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { usePost } from '../api/axios';

const Example = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemSvg, setImagemSvg] = useState('');
  const [nomeError, setNomeError] = useState('');
  const [descricaoError, setDescricaoError] = useState('');
  const [imagemSvgError, setImagemSvgError] = useState('');

  const { postData, loading, error } = usePost('/maps');

  const validateNome = () => {
    if (!nome) {
      setNomeError('Digite o nome do mapa');
    } else {
      setNomeError('');
    }
  };

  const validateDescricao = () => {
    if (!descricao) {
      setDescricaoError('Digite a descrição do mapa');
    } else {
      setDescricaoError('');
    }
  };

  const validateImagemSvg = () => {
    if (!imagemSvg) {
      setImagemSvgError('Selecione um arquivo SVG');
    } else {
      setImagemSvgError('');
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: 'application/svg+xml' });
      if (res.type === 'success') {
        const fileContent = await FileSystem.readAsStringAsync(res.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setImagemSvg(fileContent);
      }
    } catch (err) {
      // Ocorreu um erro ao selecionar o arquivo
    }
  };

  const handleSignUp = () => {
    validateNome();
    validateDescricao();
    validateImagemSvg();

    if (nome && descricao && imagemSvg) {
      const mapaData = {
        nome: nome,
        descricao: descricao,
        imagemSvg: imagemSvg,
      };

      postData(mapaData);
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
        >
          Cadastrar Mapa
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs"
        >
          Cadastre o mapa para continuar!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={nomeError !== ''}>
            <FormControl.Label>Nome</FormControl.Label>
            <Input
              type="text"
              value={nome}
              onChangeText={(value) => setNome(value)}
              onBlur={validateNome}
            />
            <FormControl.ErrorMessage>
              {nomeError}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={descricaoError !== ''}>
            <FormControl.Label>Descrição</FormControl.Label>
            <Input
              type="text"
              value={descricao}
              onChangeText={(value) => setDescricao(value)}
              onBlur={validateDescricao}
            />
            <FormControl.ErrorMessage>
              {descricaoError}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={imagemSvgError !== ''}>
            <FormControl.Label>Imagem SVG</FormControl.Label>
            <Button mt="2" colorScheme="indigo" onPress={selectFile}>
              Selecionar Imagem SVG
            </Button>
            {imagemSvgError !== '' && (
              <Text color="red.500">{imagemSvgError}</Text>
            )}
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

export const Maps = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
