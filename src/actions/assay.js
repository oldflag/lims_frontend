import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/assay';

export const register = async (assay, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  console.log(assay)
  const result = await fetchData(
    { url: url + '/register', body: assay },
    dispatch
  );
  
  if (result) {
    dispatch({ type: 'UPDATE_ASSAY', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new assay has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_ASSAY' });

  }

  dispatch({ type: 'END_LOADING' });
};

export const registerFromFile = async (assay, dispatch) => {
  // dispatch({ type: 'START_LOADING' });
  // console.log(assay)
  const result = await fetchData(
    { url: url + '/import', body: assay },
    dispatch
  );
  
  if (result.code) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: "Skip "+assay.sample_name+" due to: "+ result.meta.cause,
      },
    });
    
  } else {
    dispatch({ type: 'UPDATE_ASSAY', payload: result });
  }
};

export const getAssays = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_ASSAYS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, assayId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${assayId}`,
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
        message: 'The assay has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_ASSAY', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};