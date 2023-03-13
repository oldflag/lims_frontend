import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/dnaLibrary';

export const register = async (dnaLibrary, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: dnaLibrary },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_DNALIBRARY', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new dnaLibrary has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_DNALIBRARY' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getDnaLibrarys = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_DNALIBRARYS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, dnaLibraryId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${dnaLibraryId}`,
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
        message: 'The dnaLibrary has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_DNALIBRARY', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};