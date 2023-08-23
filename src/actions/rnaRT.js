import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/rnaRT';

export const register = async (rnaRT, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  // console.log(rnaRT)
  const result = await fetchData(
    { url: url + '/register', body: rnaRT },
    dispatch
  );
  // console.log(result)
  if (result) {
    dispatch({ type: 'UPDATE_RNART', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new rnaRT has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_RNART' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getRnaRTs = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_RNARTS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, rnaRTId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${rnaRTId}`,
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
        message: 'The rnaRT has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_RNART', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};