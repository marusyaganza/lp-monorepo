// import bcrypt from 'bcryptjs';

import { mockEnv } from './mocks/mockEnv';
Object.keys(mockEnv).forEach(key => {
  process.env[key] = mockEnv[key];
});

jest.mock('bcryptjs', () => {
  return {
    hash: jest.fn((pass, salt) => `mock_hash_${pass}_salt_${salt}`),
    compare: jest.fn(() => false),
    genSalt: jest.fn(() => 5)
  };
});

jest.mock('lodash', () => ({
  shuffle: jest.fn(arr => arr),
  take: jest.fn((arr, count) => arr?.slice(0, count)),
  uniq: jest.fn(arr => arr)
}));

let index = 0;

jest.spyOn(global.Date, 'now').mockImplementation(function () {
  return index++;
});
