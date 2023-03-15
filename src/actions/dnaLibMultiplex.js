import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/dnaLibMultiplex';

export const register = async (dnaLibMultiplex, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: dnaLibMultiplex },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_DNALIBMULTIPLEX', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new dnaLibMultiplex has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_DNALIBMULTIPLEX' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getDnaLibMultiplexs = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_DNALIBMULTIPLEXS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, dnaLibMultiplexId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${dnaLibMultiplexId}`,
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
        message: 'The dnaLibMultiplex has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_DNALIBMULTIPLEX', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};