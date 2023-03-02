import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/batch';

export const register = async (batch, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: batch },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_BATCH', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new batch has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_BATCH' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getBatchs = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_BATCHS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, batchId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${batchId}`,
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
        message: 'The batch has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_BATCH', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};