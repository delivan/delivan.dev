import React from 'react';

export const themes = {
  light: {
    backgroundColor: 'white',
    fontColor: 'black'
  },
  dark: {
    backgroundColor: 'black',
    fontColor: 'white'
  }
};

export const ThemeContext = React.createContext(themes.light);