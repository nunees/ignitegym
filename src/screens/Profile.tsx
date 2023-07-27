import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  Toast,
  useToast,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FileInfo } from "expo-file-system";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("https://github.com/nunees.png");

  const toast = useToast();

  async function handleUserPhotoSelect() {
    try {
      const photoSelect = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelect.canceled) {
        return;
      }

      if (photoSelect.assets[0].uri) {
        const photoInfo = (await FileSystem.getInfoAsync(
          photoSelect.assets[0].uri
        )) as FileInfo;

        if (photoInfo?.size && photoInfo.size / 1024 / 1024 > 5) {
          toast.show({
            title: "Imagem muito grande. Escolha uma imagem de até 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }

        setUserPhoto(photoSelect.assets[0].uri);
        toast.show({
          title: "Imagem salva",
          placement: "top-right",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }
  return (
    <VStack>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={"full"}
              startColor={"gray.500"}
              endColor={"gray.400"}
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuario"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg={"gray.600"} />
          <Input placeholder="Email" bg={"gray.600"} isDisabled />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar Senha
          </Heading>

          <Input placeholder="Senha atual" bg={"gray.600"} secureTextEntry />
          <Input placeholder="Nova senha" bg={"gray.600"} secureTextEntry />
          <Input
            placeholder="Confirmar senha"
            bg={"gray.600"}
            secureTextEntry
          />

          <Button title="Atualizar senha" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
