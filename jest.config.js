module.exports = {
    roots: ["<rootDir>/src"],
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{vue,js}",
        "<rootDir>/src/**/*.{spec,test}.{vue,js}",
    ],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(vue)$": "<rootDir>/node_modules/vue3-jest",
        "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/",
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss|less)$",
    ],
    moduleNameMapper: {
        "^~src(.*)$": "<rootDir>/src$1",
        "^~layouts(.*)$": "<rootDir>/src/layouts$1",
        "^~components(.*)$": "<rootDir>/src/components$1",
        "^~containers(.*)$": "<rootDir>/src/containers$1",
        "^~utils(.*)$": "<rootDir>/src/utils$1",
        "^~router(.*)$": "<rootDir>/src/router$1",
        "^~vuex(.*)$": "<rootDir>/src/vuex$1",
        "\\.(jpg|jpeg|png)$": "<rootDir>/src/config/fileMock.js",
        "\\.(css|scss|svg)$": "identity-obj-proxy"
    },
    moduleFileExtensions: ["vue", "js", "json", "node"],
    resetMocks: true,
};
