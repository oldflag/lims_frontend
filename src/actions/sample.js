import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/sample';

export const register = async (sample, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  console.log(sample)
  const result = await fetchData(
    { url: url + '/register', body: sample },
    dispatch
  );
  console.log(result)
  if (result) {
    dispatch({ type: 'UPDATE_SAMPLE', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new sample has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_SAMPLE' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getSamples = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_SAMPLES', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, sampleId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${sampleId}`,
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
        message: 'The sample has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_SAMPLE', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};