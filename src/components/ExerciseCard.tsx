import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity>
      <HStack
        bg={"gray.500"}
        alignItems={"center"}
        p={2}
        pr={4}
        rounded={"md"}
        mb={3}
      >
        <Image
          source={{
            uri: "https://cdn.fisiculturismo.com.br/monthly_2018_01/serrote-final-media.jpg.7a9094b494516a5c703b0a43b87dcd7e.jpg",
          }}
          alt="Imagem do exercicio"
          w={16}
          h={16}
          rounded={"md"}
          mr={4}
          resizeMode={"center"}
        />
        <VStack flex={1}>
          <Heading color="white" fontSize={"lg"}>
            Remada unilateral
          </Heading>
          <Text fontSize={"sm"} color="gray.200" mt={1} numberOfLines={2}>
            3 series x 12 repeticoes
          </Text>
        </VStack>
        <Icon
          as={Entypo}
          name={"chevron-thin-right"}
          color={"gray.300"}
          size={6}
        />
      </HStack>
    </TouchableOpacity>
  );
}
