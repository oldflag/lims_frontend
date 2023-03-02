import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/reagent';

export const register = async (reagent, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: reagent },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_REAGENT', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new reagent has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_REAGENT' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getReagents = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_REAGENTS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, reagentId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${reagentId}`,
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
        message: 'The reagent has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_REAGENT', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};