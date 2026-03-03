import {useEffect, useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useUserContext} from '../hooks/ContextHooks';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Separator} from '@/components/ui/separator';

const Login = () => {
  const [toggleRegister, setToggleRegister] = useState<boolean>(false);
  const {handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <KeyboardAvoidingView className="flex-1 p-4" behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 grow justify-center">
          {toggleRegister ? <RegisterForm /> : <LoginForm />}
          <Separator className="my-4" />
          <Button
            variant="outline"
            onPress={() => {
              setToggleRegister(!toggleRegister);
            }}
          >
            <Text>Register/Login</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
