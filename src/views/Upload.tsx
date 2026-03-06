import {Controller, useForm} from 'react-hook-form';
import {useUpdateContext} from '../hooks/ContextHooks';
import * as ImagePicker from 'expo-image-picker';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Input} from '@/components/ui/input';
import {Text} from '@/components/ui/text';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Separator} from '@/components/ui/separator';
import {useEffect, useState} from 'react';
import {useFile, useMedia, useTag} from '@/hooks/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {File} from 'expo-file-system';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useVideoPlayer, VideoView} from 'expo-video';

type UploadInputs = {
  title: string;
  description: string;
};

const Upload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );
  const {postFile, loading, setLoading} = useFile();
  const {postMedia} = useMedia();
  const videoPlayer = useVideoPlayer(
    image && image.assets && image.assets[0].uri,
    (player) => {
      player.loop = true;
      player.play();
    },
  );
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {triggerUpdate} = useUpdateContext();
  const {postTag} = useTag();
  const appName = 'defrtyhjuiklo';

  const initValues: UploadInputs = {title: '', description: ''};
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: initValues,
  });

  const resetForm = () => {
    reset(initValues);
    setImage(null);
  };

  const doUpload = async (inputs: UploadInputs) => {
    if (!image || !image.assets) {
      return;
    }
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return;
      }
      const file = new File(image.assets[0].uri);
      const fileResponse = await postFile(file, token);
      const mediaResponse = await postMedia(fileResponse, inputs, token);
      await postTag(mediaResponse.media.media_id, appName, token);
      navigation.navigate('Home');
      triggerUpdate();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 0.6,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      resetForm();
    });
    return unsubscribe;
  }, []);

  return (
    <View className="p-4">
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'title is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      <Text>{errors.title?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'description is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Textarea
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            numberOfLines={4}
            className="bg-white"
          />
        )}
        name="description"
      />
      <Text>{errors.description?.message}</Text>
      <Separator className="py-2" />
      <Pressable onPress={pickImage}>
        {image && image.assets && image.assets[0].type === 'video' ? (
          <VideoView player={videoPlayer} style={styles.media} />
        ) : (
          <Image
            source={{uri: image && image.assets ? image.assets[0].uri : ''}}
            className="h-[220px] w-full"
          />
        )}
      </Pressable>

      <Button onPress={handleSubmit(doUpload)} disabled={image ? false : true}>
        {loading ? (
          <ActivityIndicator className=" text-white" />
        ) : (
          <Text>Upload</Text>
        )}
      </Button>
      <Separator className="my-2" />
      <Button onPress={resetForm} variant="outline">
        <Text>Reset</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  media: {
    height: 220,
    width: '100%',
  },
});

export default Upload;
