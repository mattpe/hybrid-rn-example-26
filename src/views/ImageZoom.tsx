import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Image, Pressable, useWindowDimensions, View} from 'react-native';
import {
  fitContainer,
  ResumableZoom,
  useImageResolution,
} from 'react-native-zoom-toolkit';
import Ionicons from '@expo/vector-icons/Ionicons';

const ImageZoom = ({
  route,
  navigation,
}: {
  route: any;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const {uri} = route.params;
  const {width, height} = useWindowDimensions();
  const {isFetching, resolution} = useImageResolution({uri});

  if (isFetching || !resolution) {
    return <View className="flex-1 bg-black" />;
  }

  const size = fitContainer(resolution.width / resolution.height, {
    width,
    height,
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
      <ResumableZoom maxScale={resolution} minScale={1} extendGestures>
        <Image source={{uri}} resizeMode="contain" style={size} />
      </ResumableZoom>
    </View>
  );
};

export default ImageZoom;
