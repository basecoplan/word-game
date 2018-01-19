import { push } from 'react-router-redux';
import * as actions from './actions';

const restart = actions.restart;

const setWord = word => {
  return dispatch => {
    dispatch(actions.setWord(word));
    dispatch(push('/game'));
  };
};

const isWin = state => {
  return state.game.user.win || state.game.ai.win;
};

const check = value => {
  return (dispatch, getState) => {
    dispatch(actions.check(value));
    if (!getState().game.error) {
      dispatch(actions.activateAIStep());
    }
    if (isWin(getState())) {
      dispatch(push('/end'));
    }
  };
};

const shuffle = () => {
  return (dispatch, getState) => {
    dispatch(actions.shuffle());
    if (!getState().game.error) {
      dispatch(actions.activateAIStep());
    }
    if (isWin(getState())) {
      dispatch(push('/end'));
    }
  };
};

export { setWord, restart, check, shuffle };
