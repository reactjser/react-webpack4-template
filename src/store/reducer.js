import { ADD } from './constants';

const defaultState = {
  count: 0,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};
