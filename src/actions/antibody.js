import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/antibody';

export const register = async (antibody, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: antibody },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_ANTIBODY', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new antibody has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_ANTIBODY' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getAntibodies = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_ANTIBODIES', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, antibodyId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${antibodyId}`,
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
        message: 'The antibody has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_ANTIBODY', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};