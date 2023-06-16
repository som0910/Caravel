module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  reporters: [
    'default',
    [
      'jest-junit', // For Azure Pipelines
      {
        outputName: 'test-report-junit.xml',
      },
    ],
    [
      'jest-sonar', // For Sonar Cloud
      {
        outputDirectory: '.',
        outputName: 'test-report-sonar.xml',
        reportedFilePath: 'absolute',
      },
    ],
  ],
  coverageReporters: [
    'cobertura', // For Azure Pipelines
    'lcovonly', // For Sonar Cloud
  ],
  collectCoverageFrom: ['src/**/*.{ts,js}'],
}
