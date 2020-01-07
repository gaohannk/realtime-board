
module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testEnvironment: "node", // Don't test using JSDOM
    testRegex: "test.ts$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    setupFilesAfterEnv: ['./jest.setup.js'],
    collectCoverage: true,
    coverageThreshold: {
        "global": {
            "branches": 70,
            "functions": 90,
            "lines": 90,
            "statements": 90
        },
    },
};
