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

    // infra / bootstrap
    '!**/*.module.ts',
    '!main.ts',

    // repositories & guards
    '!**/repository/**',
    '!**/guards/**',

    // interfaces & types
    '!**/*.interface.ts',
    '!**/*.type.ts',

    // pure validation DTOs (optional but recommended)
    '!**/dto/create-*.dto.ts',
    '!**/dto/*-filter.dto.ts',

    // decorators
    '!**/auth/decorators/**',
    '!**/auth/google/**',
  ]
}

export default config
