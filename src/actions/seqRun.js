import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/seqRun';

export const register = async (seqRun, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: seqRun },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_SEQRUN', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new seqRun has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_SEQRUN' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getSeqRuns = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_SEQRUNS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, seqRunId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${seqRunId}`,
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
        message: 'The seqRun has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_SEQRUN', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};