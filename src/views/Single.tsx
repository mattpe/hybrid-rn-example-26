import {MediaItemWithOwner} from 'hybrid-types';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Image, Pressable, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {Text} from '../components/ui/text';

const Single = ({
  route,
  navigation,
}: {
  route: any;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const item: MediaItemWithOwner = route.params.item;

  const createdAt = new Date(item.created_at).toLocaleString('fi-FI');
  const fileSizeInMb = (item.filesize / 1024 / 1024).toFixed(2);

  return (
    <View className="m-4">
      <Card className="overflow-hidden py-4 h-full">
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>Owner: {item.username}</CardDescription>
        </CardHeader>

        <CardContent className="gap-2">
          {item.media_type.split('/')[0] === 'video' ? (
            <Pressable
              onPress={() =>
                navigation.navigate('Video View', {uri: item.filename})
              }
            >
              <Image
                className="h-[220px] w-full rounded-lg"
                source={{uri: item.screenshots![0]}}
                resizeMode="cover"
              />
              <View className="absolute inset-0 items-center justify-center">
                <View className="rounded-full bg-black/60 p-3">
                  <Ionicons name="play" size={24} color="white" />
                </View>
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                navigation.navigate('Image Zoom', {uri: item.filename})
              }
            >
              <Image
                className="h-[220px] w-full rounded-lg"
                source={{uri: item.thumbnail}}
                resizeMode="cover"
              />
              <View className="absolute bottom-2 right-2 rounded-md bg-black/70 p-1">
                <Ionicons name="expand" size={16} color="white" />
              </View>
            </Pressable>
          )}
          {item.description ? <Text>{item.description}</Text> : null}
        </CardContent>

        <CardFooter className="flex-col items-start gap-1">
          <Text variant="small">Created at: {createdAt}</Text>
          <Text variant="small">Filesize: {fileSizeInMb} MB</Text>
          <Text variant="small">Mime-type: {item.media_type}</Text>
          <Text variant="small">Owner: {item.username}</Text>
        </CardFooter>
      </Card>
    </View>
  );
};

export default Single;
