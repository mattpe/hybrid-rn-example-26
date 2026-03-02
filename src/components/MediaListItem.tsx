import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {MediaItemWithOwner} from 'hybrid-types';
import {Image, Pressable} from 'react-native';
import {useState} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {Text} from './ui/text';

const MediaListItem = ({
  item,
  navigation,
}: {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [pressed, setPressed] = useState(false);
  const createdAt = new Date(item.created_at).toLocaleString('fi-FI');
  const fileSizeInMb = (item.filesize / 1024 / 1024).toFixed(2);

  return (
    <Pressable
      className={pressed ? 'opacity-80' : 'opacity-100'}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => {
        navigation.navigate('Media File', {item});
      }}
    >
      <Card className="overflow-hidden py-4">
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>Owner: {item.username}</CardDescription>
        </CardHeader>

        <CardContent className="gap-2">
          <Image
            className="h-[220px] w-full rounded-lg"
            source={{uri: item.thumbnail}}
          />
          {item.description ? <Text>{item.description}</Text> : null}
        </CardContent>

        <CardFooter className="flex-col items-start gap-1">
          <Text variant="small">Created at: {createdAt}</Text>
          <Text variant="small">Filesize: {fileSizeInMb} MB</Text>
          <Text variant="small">Mime-type: {item.media_type}</Text>
        </CardFooter>
      </Card>
    </Pressable>
  );
};

export default MediaListItem;
