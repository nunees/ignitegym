import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BackgroundImg from "@assets/background.png";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

type FormDateProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signupSchema = yup.object().shape({
  name: yup.string().required("Informe o nome"),
  email: yup.string().email("E-mail inválido").required("Informe o e-mail"),
  password: yup.string().required("Informe a senha").min(6, "Mínimo 6 dígitos"),
  confirmPassword: yup
    .string()
    .required("Confirme a senha")
    .min(6, "Mínimo 6 dígitos")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDateProps>({
    resolver: yupResolver(signupSchema),
  });
  // {
  //   defaultValues: {
  //     name: "Felipe",
  //   }
  // }

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignup({
    name,
    confirmPassword,
    email,
    password,
  }: FormDateProps) {
    console.log({ name, confirmPassword, email, password });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            color={"gray.100"}
            fontSize="xl"
            mb={6}
            fontFamily={"heading"}
          >
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignup)}
                returnKeyType="send"
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            title="Criar e acesssar"
            onPress={handleSubmit(handleSignup)}
          />

          <Button
            title="Voltar para o login"
            variant="outline"
            mt={24}
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
