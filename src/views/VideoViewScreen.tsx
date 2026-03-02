import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Pressable, View} from 'react-native';
import {useVideoPlayer, VideoView} from 'expo-video';
import Ionicons from '@expo/vector-icons/Ionicons';

const VideoViewScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const {uri} = route.params;

  const videoPlayer = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Pressable
        className="absolute inset-0"
        onPress={() => navigation.goBack()}
      />
      <Pressable
        className="absolute right-4 top-12 z-10 rounded-full bg-black/70 p-2"
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={24} color="white" />
      </Pressable>
      <View className="h-full w-full">
        <VideoView
          style={{flex: 1}}
          player={videoPlayer}
          contentFit="contain"
          nativeControls
        />
      </View>
    </View>
  );
};

export default VideoViewScreen;
