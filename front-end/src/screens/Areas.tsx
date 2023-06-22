import React, { useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
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
  FlatList,
  VStack,
  Spacer,
  Select,
  CheckIcon,
} from "native-base";
import { useGet, usePost, usePut, useDelete } from "../api/axios";

export const Areas = () => {
  const {
    data: areas,
    loading: areasLoading,
    error: areasError,
    refetch: reloadAreas,
  } = useGet("/areas");
  const {
    postData,
    loading: postLoading,
    error: postError,
  } = usePost("/areas");
  const { putData, loading: putLoading, error: putError } = usePut("/areas");
  const { deleteData } = useDelete("/areas");
  const { data: maps } = useGet("/maps");

  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [coordenadas, setCoordenadas] = useState("");
  const [mapId, setMapId] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [descricaoError, setDescricaoError] = useState("");
  const [coordenadasError, setCoordenadasError] = useState("");
  const [mapIdError, setMapIdError] = useState("");

  const validateNome = () => {
    if (!nome) {
      setNomeError("Digite o nome da área");
    } else {
      setNomeError("");
    }
  };

  const validateDescricao = () => {
    if (!descricao) {
      setDescricaoError("Digite a descrição da área");
    } else {
      setDescricaoError("");
    }
  };

  const validateCoordenadas = () => {
    if (!coordenadas) {
      setCoordenadasError("Digite as coordenadas da área");
    } else {
      setCoordenadasError("");
    }
  };

  const validateMapId = () => {
    if (!mapId) {
      setMapIdError("Escolha um serviço para a área");
    } else {
      setMapIdError("");
    }
  };

  const openCreateModal = () => {
    setSelectedArea(null);
    setNome("");
    setDescricao("");
    setCoordenadas("");
    setMapId("");
    setEditMode(false);
    setModalVisible(true);
  };

  const openEditModal = (selected) => {
    setSelectedArea(selected);
    setNome(selected.nome);
    setDescricao(selected.descricao);
    setCoordenadas(selected.coordenadas);
    setMapId(selected.mapId);
    setEditMode(true);
    setModalVisible(true);
  };

  const handleDelete = (selectedId) => {
    Alert.alert("Delete", "Tem certeza de que deseja excluir esta área?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          await deleteData(selectedId);
          reloadAreas();
        },
      },
    ]);
  };

  const handleSave = async () => {
    validateNome();
    validateDescricao();
    validateCoordenadas();
    validateMapId();

    if (nome && descricao && coordenadas && mapId) {
      const areaData = {
        nome: nome,
        descricao: descricao,
        coordenadas: coordenadas,
        map: mapId,
      };

      if (editMode) {
        await putData(selectedArea.id, areaData);
      } else {
        await postData(areaData);
      }
      setModalVisible(false);
      reloadAreas();
    }
  };

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Button onPress={openCreateModal}>Criar Nova Área</Button>
        {areasLoading && <Text>Carregando...</Text>}
        {areasError && <Text>Error: {areasError.message}</Text>}

        <FlatList
          data={areas}
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
                <VStack space={2} my={2}>
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
                <Button colorScheme="red" onPress={() => handleDelete(item.id)}>
                  Deletar
                </Button>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>
              {editMode ? "Editar Área" : "Nova Área"}
            </Modal.Header>
            <Modal.Body>
              <FormControl isInvalid={nomeError}>
                <FormControl.Label>Nome</FormControl.Label>
                <Input
                  value={nome}
                  onChangeText={setNome}
                  onBlur={validateNome}
                />
                <FormControl.ErrorMessage>{nomeError}</FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={descricaoError}>
                <FormControl.Label>Descrição</FormControl.Label>
                <Input
                  value={descricao}
                  onChangeText={setDescricao}
                  onBlur={validateDescricao}
                />
                <FormControl.ErrorMessage>
                  {descricaoError}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={coordenadasError}>
                <FormControl.Label>Coordenadas</FormControl.Label>
                <Input
                  value={coordenadas}
                  onChangeText={setCoordenadas}
                  onBlur={validateCoordenadas}
                />
                <FormControl.ErrorMessage>
                  {coordenadasError}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={mapIdError}>
                <FormControl.Label>Mapa</FormControl.Label>
                <Select
                  selectedValue={mapId}
                  accessibilityLabel="Escolha o mapa"
                  placeholder="Selecione o mapa"
                  onValueChange={(itemValue) => setMapId(itemValue)}
                  _selectedItem={{
                    bg: "teal.100",
                    endIcon: <CheckIcon size="5" />,
                  }}
                >
                  {maps?.map((item) => (
                    <Select.Item
                      key={item.id}
                      label={item.nome}
                      value={item.id}
                    />
                  ))}
                </Select>
                <FormControl.ErrorMessage>
                  {mapIdError}
                </FormControl.ErrorMessage>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  onPress={handleSave}
                  isLoading={postLoading || putLoading}
                >
                  Salvar
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
    </NativeBaseProvider>
  );
};

export default Areas;
