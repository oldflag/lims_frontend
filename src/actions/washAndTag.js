import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/washAndTag';

export const register = async (washAndTag, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  console.log(washAndTag)
  const result = await fetchData(
    { url: url + '/register', body: washAndTag },
    dispatch
  );
  console.log(result)
  if (result) {
    dispatch({ type: 'UPDATE_WASHANDTAG', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new washAndTag has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_WASHANDTAG' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getWashAndTags = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_WASHANDTAGS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, washAndTagId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${washAndTagId}`,
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
        message: 'The washAndTag has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_WASHANDTAG', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};