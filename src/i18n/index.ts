import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';

import enUS from '../locales/enUS.json';
import esES from '../locales/esES.json';
import ptBR from '../locales/ptBR.json';

i18next.use(initReactI18next).init({
  resources: {
    pt: { translation: ptBR },
    en: { translation: enUS },
    es: { translation: esES },
  },
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
