import authReducer from '../../reducers/auth';
import uuid from 'uuid';

test('Should setup default state with a default action', () => {
  const action = {
    type: '@@INIT'
  };
  const state = authReducer(undefined, action);
  expect(state).toEqual({});
})

test('Should setup state when login action is dispatched', () => {
  const action = {
    type: 'LOGIN',
    uid: uuid()
  };
  const state = authReducer(undefined, action);
  expect(state).toEqual({
    uid: action.uid
  });
});

test('Should return state when logout action is dispatched', () => {
  const state = {
    uid: uuid()
  }
  const action = {
    type: 'LOGOUT',
  };
  const newState = authReducer(state, action);
  expect(newState).toEqual({});
});