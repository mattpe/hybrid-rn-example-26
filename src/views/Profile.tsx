import {Button, Text, View} from 'react-native';
import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user, handleLogout} = useUserContext();

  return (
    <View>
      <Text>{user?.username}</Text>
      {/* TODO: Add user details = HOMEWORK */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;
