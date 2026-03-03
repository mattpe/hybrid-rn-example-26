import {MediaItemWithOwner} from 'hybrid-types';
import {Image, Text, View} from 'react-native';
import {useVideoPlayer, VideoView} from 'expo-video';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params.item;

  const videoPlayer = useVideoPlayer(item.filename, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View className="flex-1 px-4 py-4">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>Owner: {item.username}</CardDescription>
        </CardHeader>

        <CardContent className="gap-4">
          <View className="rounded-2xl overflow-hidden bg-black">
            {item.media_type.split('/')[0] === 'video' ? (
              <VideoView className="h-[320px] w-full" player={videoPlayer} />
            ) : (
              <Image
                className="h-[320px] w-full"
                source={{uri: item.filename}}
              />
            )}
          </View>
          <Text className="text-base text-muted-foreground">
            {item.description}
          </Text>
        </CardContent>

        <CardFooter className="flex-col items-start gap-1">
          <Text className="text-sm text-muted-foreground">
            Created at: {new Date(item.created_at).toLocaleString('fi-FI')}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB
          </Text>
          <Text className="text-sm text-muted-foreground">
            Mime-type: {item.media_type}
          </Text>
        </CardFooter>
      </Card>
    </View>
  );
};

export default Single;
