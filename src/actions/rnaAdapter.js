import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/rnaAdapter';

export const register = async (rnaAdapter, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: rnaAdapter },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_RNAADAPTER', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new rnaAdapter has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_RNAADAPTER' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getRnaAdapters = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_RNAADAPTERS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, rnaAdapterId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${rnaAdapterId}`,
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
        message: 'The rnaAdapter has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_RNAADAPTER', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};