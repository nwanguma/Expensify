import { login, logout } from '../../actions/auth';
import uuid from 'uuid';

test('Should generate the login action with id', () => {
  const uid = uuid();
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('Should generate the logout action with id', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT',
  });
});