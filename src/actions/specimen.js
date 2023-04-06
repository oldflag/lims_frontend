import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/specimen';

export const register = async (specimen, dispatch) => {
  console.log(specimen)
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: specimen },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_SPECIMEN', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new specimen has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_SPECIMEN' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getSpecimens = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_SPECIMENS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, specimenId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${specimenId}`,
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
        message: 'The specimen has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_SPECIMEN', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};