import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    '**/*.ts',

    // bootstrap
    '!main.ts',
    '!**/*.module.ts',

    // types & interfaces
    '!**/*.interface.ts',
    '!**/*.type.ts',
    '!**/*.types.ts',
    '!**/@types/**',

    // validation-only DTOs
    '!**/dto/**/*.dto.ts',

    // exclude simple decorators
    '!**/auth/decorators/**',

  ]
}

export default config
