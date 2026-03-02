module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // This preset allows NativeWind to intercept the JSX and handle classNames
      ['babel-preset-expo', {jsxImportSource: 'nativewind'}],
      'nativewind/babel',
    ],
    plugins: [
      // Required for Reanimated (which NativeWind uses for some transitions)
      'react-native-reanimated/plugin',
    ],
  };
};
