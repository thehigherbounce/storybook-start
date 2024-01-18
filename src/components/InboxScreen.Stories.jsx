import InboxScreen from "./InboxScreen";
import store from "../lib/store";
import { rest } from "msw";
import { MockedState } from "./TaskList.stories";
import { Provider } from "react-redux";

import {
  fireEvent,
  waitFor,
  within,
  waitForElementToBeRemoved
} from "@storybook/test";

export default {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs'],
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        rest.get(
          'https://jsonplaceholder.typicode.com/todos?userId=1',
          (req, res, ctx) => {
            return res(ctx.json(MockedState));
          }
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
    await waitFor(async () => {
      await fireEvent.click(canvas.getBy)
    });
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        'https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, ctx) => {
          return res(ctx.status(403));
        }
      ],
    },
  },
};