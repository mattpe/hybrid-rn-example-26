import {Image, ScrollView, View} from 'react-native';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {Text} from '@/components/ui/text';
import {useUserContext} from '../hooks/ContextHooks';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const Profile = () => {
  const {user, handleLogout} = useUserContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const username = user?.username ?? 'Profile';
  const email = user?.email ?? 'Sign in to view your account details.';
  const summary = user
    ? `Signed in as ${user.username}. You can review your account details here and end your session when you are done.`
    : 'This view will show your profile details once you are signed in.';

  return (
    <View className="flex-1 bg-muted/30 px-4 py-8">
      <ScrollView className="w-full max-w-sm self-center">
        <Card>
          <Image
            source={require('../../assets/icon.png')}
            className="w-full bg-muted h-[220px]"
            resizeMode="cover"
          />

          <CardHeader className="gap-3 py-6">
            <CardTitle className="text-3xl leading-tight">{username}</CardTitle>
            <CardDescription className="text-base leading-8">
              {email}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-6">
            <Text className="text-muted-foreground text-base leading-8">
              {summary}
            </Text>
          </CardContent>

          <Separator />

          <CardFooter className="py-6 flex-col">
            <Button
              className="w-full rounded-xl"
              size="lg"
              onPress={() => navigation.navigate('My Files')}
            >
              <Text>My Files</Text>
            </Button>

            <Separator className="my-4" />

            <Button
              className="w-full rounded-xl"
              size="lg"
              onPress={handleLogout}
              disabled={!user}
            >
              <Text>Logout</Text>
            </Button>
          </CardFooter>
        </Card>
      </ScrollView>
    </View>
  );
};

export default Profile;
