import { Role } from '../../../generated/graphql';

export const usersTestData = [
  {
    email: 'bob.miller@example.com',
    firstName: 'Bob',
    lastName: 'Miller',
    role: Role.Member,
    password: 'mock_hash_password4_salt_5'
  },
  {
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: Role.Admin,
    password: 'mock_hash_password1_salt_5'
  },
  {
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: Role.Member,
    password: 'mock_hash_password2_salt_5'
  },
  {
    email: 'alice.johnson@example.com',
    firstName: 'Alice',
    lastName: 'Johnson',
    role: Role.Guest,
    password: 'mock_hash_password3_salt_5'
  }
];
