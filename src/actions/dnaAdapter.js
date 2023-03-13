import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/dnaAdapter';

export const register = async (dnaAdapter, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: dnaAdapter },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_DNAADAPTER', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new dnaAdapter has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_DNAADAPTER' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getDnaAdapters = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_DNAADAPTERS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, dnaAdapterId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${dnaAdapterId}`,
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
        message: 'The dnaAdapter has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_DNAADAPTER', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};