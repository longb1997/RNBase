module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@common': './src/common',
          '@features': './src/features',
          '@config': './src/config',
          '@library': './src/library',
          '@components': './src/library/components',
          '@networking': './src/library/networking',
          '@utils': './src/library/utils',
          '@navigations': './src/navigation',
          '@service': './src/service',
          '@store': './src/store',
        },
      },
    ],
  ],
};
