import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/user';

export const register = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/register', body: user },
    dispatch
  );
  if (result) {
    dispatch({ type: 'ADD_USER', payload: result });
    dispatch({ type: 'CLOSE_REGISTER' });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'An account has been created successfully',
      },
    });
  }

  dispatch({ type: 'END_LOADING' });
};

export const login = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url: url + '/login', body: user }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_USER', payload: result });
    dispatch({ type: 'CLOSE_LOGIN' });
  }

  dispatch({ type: 'END_LOADING' });
};

export const getUsers = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_USERS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, userId, dispatch) => {
  return fetchData(
    {
      url: `${url}/updateStatus/${userId}`,
      method: 'PATCH',
      body: updatedFields,
    },
    dispatch
  );
};