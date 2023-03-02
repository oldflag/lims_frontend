import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/patn5';

export const register = async (patn5, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: patn5 },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_PATN5', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new patn5 has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_PATN5' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getPatn5s = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_PATN5S', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, patn5Id, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${patn5Id}`,
      method: 'PATCH',
      body: updatedFields,
    },
    dispatch
  );

};

export const deleteOne = async (id, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: `${url}/${id}`, method: 'DELETE' },
    dispatch
  );

  if (result) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'The patn5 has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_PATN5', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};