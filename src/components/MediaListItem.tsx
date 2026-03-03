import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {MediaItemWithOwner} from 'hybrid-types';
import {Image, Pressable, Text} from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {useState} from 'react';

const MediaListItem = ({
  item,
  navigation,
}: {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => navigation.navigate('Media File', {item})}
      className={pressed ? 'opacity-80' : 'opacity-100'}
    >
      <Card className=" overflow-hidden py-4">
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>Owner: {item.username}</CardDescription>
        </CardHeader>

        <CardContent className="gap-2">
          <Image
            className="h-[220px] w-full rounded"
            source={{uri: item.thumbnail}}
          />
        </CardContent>

        <CardFooter className="flex-col items-start gap-1">
          <Text>
            Created at: {new Date(item.created_at).toLocaleString('fi-FI')}
          </Text>
          <Text>Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB</Text>
          <Text>Mime-type: {item.media_type}</Text>
        </CardFooter>
      </Card>
    </Pressable>
  );
};

export default MediaListItem;
