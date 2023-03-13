import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/lysis';

export const register = async (lysis, dispatch) => {
  // dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: lysis },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_LYSIS', payload: result });
    // dispatch({
    //   type: 'UPDATE_ALERT',
    //   payload: {
    //     open: true,
    //     severity: 'success',
    //     message: 'A new lysis has been created successfully',
    //   },
    // });
    // dispatch({ type: 'CLOSE_LYSIS' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getLysiss = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_LYSISS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, lysisId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${lysisId}`,
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
        message: 'The lysis has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_LYSIS', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};