import { configure, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import 'loaders.css/src/animations/ball-pulse.scss';
import '../src/styles/main.scss';

addDecorator(centered);

// automatically import all files ending in *.stories.tsx
configure(require.context('../stories', true, /\.stories\.tsx?$/), module);
