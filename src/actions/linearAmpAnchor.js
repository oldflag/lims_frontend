import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/linearAmpAnchor';

export const register = async (linearAmpAnchor, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: linearAmpAnchor },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_LINEARAMPANCHOR', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new linearAmpAnchor has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_LINEARAMPANCHOR' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getLinearAmpAnchors = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_LINEARAMPANCHORS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, linearAmpAnchorId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${linearAmpAnchorId}`,
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
        message: 'The linearAmpAnchor has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_LINEARAMPANCHOR', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};