import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/doubleSizeSelect';

export const register = async (doubleSizeSelect, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: doubleSizeSelect },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_DOUBLESIZESELECT', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new doubleSizeSelect has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_DOUBLESIZESELECT' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getDoubleSizeSelects = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_DOUBLESIZESELECTS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, doubleSizeSelectId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${doubleSizeSelectId}`,
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
        message: 'The doubleSizeSelect has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_DOUBLESIZESELECT', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};