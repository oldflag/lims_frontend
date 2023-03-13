import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/splitPool';

export const register = async (splitPool, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: splitPool },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_SPLITPOOL', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new splitPool has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_SPLITPOOL' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getSplitPools = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_SPLITPOOLS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, splitPoolId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${splitPoolId}`,
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
        message: 'The splitPool has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_SPLITPOOL', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};