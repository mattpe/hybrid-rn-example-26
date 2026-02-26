import {Button, Text, View} from 'react-native';
import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user, handleLogout} = useUserContext();

  return (
    <View>
      <Text>{user?.username}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;
