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
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Separator} from '@/components/ui/separator';

const Login = () => {
  const [toggleRegister, setToggleRegister] = useState<boolean>(false);
  const {handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, [handleAutoLogin]);

  return (
    <KeyboardAvoidingView
      className="flex-1 p-4"
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 64}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingBottom: Platform.OS === 'android' ? 100 : 20,
          }}
          automaticallyAdjustKeyboardInsets={true}
          keyboardShouldPersistTaps="handled"
        >
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
