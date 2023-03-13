import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/rnaLibMultiplex';

export const register = async (rnaLibMultiplex, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: rnaLibMultiplex },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_RNALIBMULTIPLEX', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new rnaLibMultiplex has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_RNALIBMULTIPLEX' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getRnaLibMultiplexs = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_RNALIBMULTIPLEXS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, rnaLibMultiplexId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${rnaLibMultiplexId}`,
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
        message: 'The rnaLibMultiplex has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_RNALIBMULTIPLEX', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};