import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/nucleiIncubation';

export const register = async (nucleiIncubation, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: nucleiIncubation },
    dispatch
  );
  console.log(result)
  if (result) {
    dispatch({ type: 'UPDATE_NUCLEIINCUBATION', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new nucleiIncubation has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_NUCLEIINCUBATION' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getNucleiIncubations = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_NUCLEIINCUBATIONS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, nucleiIncubationId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${nucleiIncubationId}`,
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
        message: 'The nucleiIncubation has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_NUCLEIINCUBATION', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};