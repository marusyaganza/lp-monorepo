import {mockEnv} from './src/mocks/constants';
Object.keys(mockEnv).forEach(key => {
    process.env[key] = mockEnv[key];
});