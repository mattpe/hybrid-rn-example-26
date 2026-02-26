import {Button, Text, TextInput, View} from 'react-native';
import {RegisterCredentials} from '../types/LocalTypes';
import {Controller, useForm} from 'react-hook-form';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = () => {
  const {postRegister, getUsernameAvailable, getEmailAvailable} = useUser();

  const initValues: {
    username: string;
    password: string;
    email: string;
    confirm_password?: string;
  } = {
    username: '',
    password: '',
    email: '',
    confirm_password: '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: initValues,
  });

  const doRegister = async (inputs: RegisterCredentials) => {
    try {
      const result = await postRegister(inputs);
      console.log('post registration result', result);
    } catch (error) {
      console.log((error as Error).message);
      //setRegisterError((error as Error).message);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'username is required'},
          validate: async (value) => {
            try {
              const {available} = await getUsernameAvailable(value);
              console.log('username available?', value, available);
              return available ? available : 'Username taken';
            } catch (error) {
              console.log((error as Error).message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            // used with RNE Input, does not work with core component TextInput
            //errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />
      <Text>{errors.username?.message}</Text>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'email is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            // used with RNE Input, does not work with core component TextInput
            //errorMessage={errors.username?.message}
          />
        )}
        name="email"
      />
      <Text>{errors.email?.message}</Text>

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'password is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            // used with RNE Input, does not work with core component TextInput
            //errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Text>{errors.password?.message}</Text>

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'password confirmation is required'},
          validate: (value) =>
            getValues().password === value ? true : 'passwords must match',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="confirm password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="confirm_password"
      />
      <Text>{errors.confirm_password?.message}</Text>
      <Button title="Register" onPress={handleSubmit(doRegister)} />
    </View>
  );
};

export default RegisterForm;
