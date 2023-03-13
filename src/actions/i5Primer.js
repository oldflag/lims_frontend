import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/i5Primer';

export const getI5Primers = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_I5PRIMERS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

