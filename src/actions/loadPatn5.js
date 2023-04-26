import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/loadPatn5';

export const register = async (loadPatn5, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: loadPatn5 },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_LOADPATN5', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new loadPatn5 has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_LOADPATN5' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getLoadPatn5s = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  // console.log(result)
  if (result) {
    dispatch({ type: 'UPDATE_LOADPATN5S', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, loadPatn5Id, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${loadPatn5Id}`,
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
        message: 'The loadPatn5 has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_LOADPATN5', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};