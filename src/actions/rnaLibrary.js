import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/rnaLibrary';

export const register = async (rnaLibrary, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: rnaLibrary },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_RNALIBRARY', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new rnaLibrary has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_RNALIBRARY' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getRnaLibrarys = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_RNALIBRARYS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, rnaLibraryId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${rnaLibraryId}`,
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
        message: 'The rnaLibrary has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_RNALIBRARY', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};