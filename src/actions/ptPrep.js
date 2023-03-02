import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/ptPrep';

export const register = async (ptPrep, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: ptPrep },
    dispatch
  );
  console.log(result)
  if (result) {
    dispatch({ type: 'UPDATE_PTPREP', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new ptPrep has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_PTPREP' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getPtPreps = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_PTPREPS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, ptPrepId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${ptPrepId}`,
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
        message: 'The ptPrep has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_PTPREP', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};