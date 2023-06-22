import React, { useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
import base64 from "react-native-base64";
import { SvgXml } from "react-native-svg";
import {
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  Text,
  HStack,
  Modal,
  NativeBaseProvider,
  Avatar,
  FlatList,
  VStack,
  Spacer,
} from "native-base";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useGet, usePost, usePut, useDelete } from "../api/axios";
import { fileContent } from "../assets/svg-example";

export const Maps = () => {
  const {
    data: maps,
    loading: mapsLoading,
    error: mapsError,
    refetch: reloadMaps,
  } = useGet("/maps");
  const { postData, loading: postLoading, error: postError } = usePost("/maps");
  const { putData, loading: putLoading, error: putError } = usePut("/maps");
  const { deleteData } = useDelete("/maps");

  const [selectedMap, setSelectedMap] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemSvg, setImagemSvg] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [descricaoError, setDescricaoError] = useState("");
  const [imagemSvgError, setImagemSvgError] = useState("");

  const validateNome = () => {
    if (!nome) {
      setNomeError("Digite o nome do mapa");
    } else {
      setNomeError("");
    }
  };

  const validateDescricao = () => {
    if (!descricao) {
      setDescricaoError("Digite a descrição do mapa");
    } else {
      setDescricaoError("");
    }
  };

  const validateImagemSvg = () => {
    if (!imagemSvg) {
      setImagemSvgError("Selecione um arquivo SVG");
    } else {
      setImagemSvgError("");
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
      });
      console.log(res);
      if (res.type === "success") {
        console.log("format");
        try {
          // esta com problema
          // const fileContent = await FileSystem.readAsStringAsync(res.uri, {
          //   encoding: FileSystem.EncodingType.Base64,
          // });
          // console.log(fileContent);

          setImagemSvg(fileContent);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (err) {
      // Ocorreu um erro ao selecionar o arquivo
    }
  };

  const openCreateModal = () => {
    setSelectedMap(null);
    setNome("");
    setDescricao("");
    setImagemSvg(fileContent);
    setEditMode(false);
    setModalVisible(true);
  };

  const openEditModal = (selected) => {
    setSelectedMap(selected);
    setNome(selected.nome);
    setDescricao(selected.descricao);
    setImagemSvg(selected.imagemSvg);
    setEditMode(true);
    setModalVisible(true);
  };

  const handleDelete = (selectedId) => {
    Alert.alert("Delete", "Tem certeza de que deseja excluir este mapa?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          await deleteData(selectedId);
          reloadMaps();
        },
      },
    ]);
  };

  const handleSave = async () => {
    validateNome();
    validateDescricao();
    validateImagemSvg();

    if (nome && descricao && imagemSvg) {
      const mapaData: any = {
        nome: nome,
        descricao: descricao,
        imagemSvg: imagemSvg,
      };

      if (editMode) {
        await putData(selectedMap.id, mapaData);
      } else {
        await postData(mapaData);
      }

      reloadMaps();
      setModalVisible(false);
    }
  };

  const handleSelectMap = (map) => {
    setSelectedMap(map);
  };

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Button onPress={openCreateModal}>Criar Mapa</Button>
        <Box>
          {mapsLoading && <Text>Carregando...</Text>}
          {mapsError && <Text>Error: {mapsError.message}</Text>}
          <FlatList
            data={maps}
            renderItem={({ item }: any) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "muted.50",
                }}
                borderColor="muted.800"
                pl={["0", "4"]}
                pr={["0", "5"]}
                py="2"
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <SvgXml
                    xml={base64.decode(item.imagemSvg.split("base64,")[1])}
                    width={60}
                    height={60}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.nome}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.descricao}
                    </Text>
                  </VStack>

                  <Spacer />
                  <Button
                    colorScheme="indigo"
                    onPress={() => openEditModal(item)}
                  >
                    Editar
                  </Button>
                  <Button
                    colorScheme="red"
                    onPress={() => handleDelete(item.id)}
                  >
                    Deletar
                  </Button>
                </HStack>
              </Box>
            )}
            keyExtractor={(item: any) => item.id}
          />
        </Box>
      </Box>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{editMode ? "Editar Mapa" : "Novo Mapa"}</Modal.Header>
          <Modal.Body>
            <Heading size="lg" color="coolGray.800" fontWeight="semibold">
              Cadastrar Mapa
            </Heading>
            <FormControl isInvalid={nomeError !== ""}>
              <FormControl.Label>Nome</FormControl.Label>
              <Input
                w="100%"
                type="text"
                value={nome}
                onChangeText={(value) => setNome(value)}
                onBlur={validateNome}
              />
              <FormControl.ErrorMessage>{nomeError}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={descricaoError !== ""}>
              <FormControl.Label>Descrição</FormControl.Label>
              <Input
                w="100%"
                type="text"
                value={descricao}
                onChangeText={(value) => setDescricao(value)}
                onBlur={validateDescricao}
              />
              <FormControl.ErrorMessage>
                {descricaoError}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={imagemSvgError !== ""}>
              <FormControl.Label>Imagem SVG</FormControl.Label>
              <Button mt="2" onPress={selectFile}>
                Selecionar Imagem SVG
              </Button>
              {imagemSvgError !== "" && (
                <Text color="red.500">{imagemSvgError}</Text>
              )}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                isLoading={postLoading || putLoading}
                onPress={handleSave}
              >
                {editMode ? "Salvar" : "Cadastrar"}
              </Button>
              {(postError || putError) && (
                <Text>Error: {(postError || putError).message}</Text>
              )}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
};
