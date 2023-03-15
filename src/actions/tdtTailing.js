import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/tdtTailing';

export const register = async (tdtTailing, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: tdtTailing },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_TDTTAILING', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new tdtTailing has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_TDTTAILING' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getTdtTailings = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_TDTTAILINGS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, tdtTailingId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${tdtTailingId}`,
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
        message: 'The tdtTailing has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_TDTTAILING', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};