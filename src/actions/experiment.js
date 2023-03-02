import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/experiment';

export const register = async (experiment, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: experiment },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_EXPERIMENT', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new experiment has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_EXPERIMENT' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getExperiments = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_EXPERIMENTS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, experimentId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${experimentId}`,
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
        message: 'The experiment has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_EXPERIMENT', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};