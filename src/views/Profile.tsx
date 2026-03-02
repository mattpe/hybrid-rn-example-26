import {useUserContext} from '../hooks/ContextHooks';
import {View, Image} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Card, CardContent, CardFooter, CardTitle} from '../components/ui/card';
import {Text} from '../components/ui/text';
import {Button} from '../components/ui/button';
import {Separator} from '@/components/ui/separator';
import {useAssets} from 'expo-asset';

const Profile = () => {
  const {user, handleLogout} = useUserContext();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [assets] = useAssets([require('../../assets/icon.png')]);

  if (!user) {
    return (
      <View>
        <Text>No user logged in</Text>
      </View>
    );
  }

  const createdAt = new Date(user.created_at).toLocaleString('fi-FI');

  return (
    <View className="m-8">
      <Card className="overflow-hidden py-0">
        {assets && assets.length > 0 ? (
          <Image
            className="h-36 w-full"
            source={{uri: assets[0].localUri || undefined}}
          />
        ) : (
          <View className="h-36 w-full bg-muted" />
        )}

        <CardContent>
          <CardTitle className="text-lg">{user.username}</CardTitle>
          <Text className="text-muted-foreground text-sm">{user.email}</Text>
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-3 px-6 pb-6 pt-4">
          <Text variant="small" className="text-muted-foreground">
            Created at: {createdAt}
          </Text>
          <Separator className="my-2" />
          <Button
            variant="outline"
            onPress={() => {
              navigation.navigate('My Files');
            }}
            className="w-full"
          >
            <Text>My Files</Text>
          </Button>
          <Button onPress={handleLogout} className="w-full">
            <Text>Logout</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
};

export default Profile;
