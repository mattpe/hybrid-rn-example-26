import {useEffect, useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useUserContext} from '../hooks/ContextHooks';
import {Button} from 'react-native';


const Login = () => {
  const [toggleRegister, setToggleRegister] = useState<boolean>(false);
  const {handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <>
    {toggleRegister ? <RegisterForm /> : <LoginForm />}
    <Button title="Register/Login" onPress={() => {setToggleRegister(!toggleRegister)}} />
    </>
  );
};

export default Login;
