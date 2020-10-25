module.exports = {
    preset: 'ts-jest',
    verbose: true,
    setupFilesAfterEnv: ['./test/setup.ts'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.css$': 'jest-transform-css',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-file',
    },
};
