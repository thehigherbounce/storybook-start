import '../src/index.css';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();
// Configures Storybook to log the actions (onArchiveTask and onPinTask) in the UI
/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
