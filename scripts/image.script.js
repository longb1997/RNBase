import {readdirSync, writeFileSync} from 'fs';
const imageFileNames = () => {
  const array = readdirSync('src/assets/images')
    .filter(file => {
      return file.endsWith('.png');
    })
    .map(file => {
      return file
        .replace('@2x.png', '')
        .replace('@3x.png', '')
        .replace('.png', '');
    });
  return Array.from(new Set(array));
};
const generate = () => {
  let properties = imageFileNames()
    .map(name => {
      return `${name.replace(/-/g, '_')}: require('../images/${name}.png'),`;
    })
    .join(',\n  ');
  const string = `const images = {
  ${properties}
}
export default images;
`;
  writeFileSync('src/assets/images/index.ts', string, 'utf8');
};
generate();
