import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/preAmp';

export const register = async (preAmp, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: preAmp },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_PREAMP', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new preAmp has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_PREAMP' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getPreAmps = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_PREAMPS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, preAmpId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${preAmpId}`,
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
        message: 'The preAmp has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_PREAMP', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};