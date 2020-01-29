import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Html from './Html';

const mockStore = configureStore();

jest.mock('../Helmet/Helmet', () => ({
  rewind: () => ({
    base: {
      toComponent: () => '',
    },
    title: {
      toComponent: () => '',
    },
    meta: {
      toComponent: () => '',
    },
    link: {
      toComponent: () => '',
    },
    script: {
      toComponent: () => '',
    },
  }),
}));

jest.mock('../BodyClass/BodyClass', () => ({
  rewind: () => ['class1', 'class2'],
}));

describe('Html', () => {
  it('renders a html component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const component = renderer.create(
      <Provider store={store}>
        <Html
          assets={{
            client: {
              css: 'style.css',
              js: 'bundle.js',
            },
          }}
          markup="<div />"
          store={{
            getState: () => {},
          }}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
