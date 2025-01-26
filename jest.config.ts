import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom' // Intentar solo con esto
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Para transformar archivos TypeScript
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Si usas CSS Modules
  },
};

export default config;