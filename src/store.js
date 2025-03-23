import { createStore } from 'redux';

// Her framework için renk paleti tanımları
const frameworkColors = {
  dropwizard: {
    primary: '#2C3E91', // Mavi
    secondary: '#FFD700', // Sarı
    text: '#FFFFFF',
    accent: '#FFD700',
    background: '#1A273A',
    cardBg: 'rgba(44, 62, 145, 0.2)',
    border: '#2C3E91'
  },
  vertx: {
    primary: '#1B2A47', // Koyu lacivert
    secondary: '#8000FF', // Mor
    text: '#FFFFFF',
    accent: '#8000FF',
    background: '#0F1724',
    cardBg: 'rgba(128, 0, 255, 0.1)',
    border: '#8000FF'
  },
  spring: {
    primary: '#6DB33F', // Yeşil
    secondary: '#FFFFFF',
    text: '#FFFFFF',
    accent: '#6DB33F',
    background: '#1C2B1F',
    cardBg: 'rgba(109, 179, 63, 0.1)',
    border: '#6DB33F'
  },
  restlet: {
    primary: '#4D4D4D', // Koyu gri
    secondary: '#FFB81C', // Turuncu
    text: '#FFFFFF',
    accent: '#FFB81C',
    background: '#2C2C2C',
    cardBg: 'rgba(255, 184, 28, 0.1)',
    border: '#FFB81C'
  },
  spark: {
    primary: '#E25A1C', // Turuncu
    secondary: '#343434', // Koyu gri
    text: '#FFFFFF',
    accent: '#E25A1C',
    background: '#292724',
    cardBg: 'rgba(226, 90, 28, 0.1)',
    border: '#E25A1C'
  }
};

// Varsayılan renk paleti (ilk yüklemede)
const defaultColors = frameworkColors.dropwizard;

const initialState = {
  selectedFramework: 'dropwizard', // Varsayılan seçili framework
  colors: defaultColors, // Aktif renk paleti
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FRAMEWORK':
      return { 
        ...state, 
        selectedFramework: action.payload,
        colors: frameworkColors[action.payload] || defaultColors
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;