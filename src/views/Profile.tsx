import {View} from 'react-native';
import {useUserContext} from '../hooks/ContextHooks';
import {Text} from '@/components/ui/text';
import {Button} from '@/components/ui/button';

const Profile = () => {
  const {user, handleLogout} = useUserContext();

  return (
    <View>
      <Text>{user?.username}</Text>
      {/* TODO: Add user details = HOMEWORK */}
      <Button onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default Profile;
