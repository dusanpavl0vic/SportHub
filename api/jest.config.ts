export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1', // Rešava problem sa `src/` aliasom u testovima
    },
    testEnvironment: 'node',
  };
  