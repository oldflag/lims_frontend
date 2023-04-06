import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/collaborator';

export const register = async (collaborator, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/register', body: collaborator },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_COLLABORATOR', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new collaborator has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_COLLABORATOR' });

  }

  dispatch({ type: 'END_LOADING' });
};

export const registerMany = async (collaborators, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/registerMany', body: collaborators },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_COLLABORATORS', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new collaborator has been created successfully',
      },
    });
    // dispatch({ type: 'CLOSE_COLLABORATOR' });

  }

  dispatch({ type: 'END_LOADING' });
};



export const getCollaborators = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_COLLABORATORS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, collaboratorId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${collaboratorId}`,
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
        message: 'The collaborator has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_COLLABORATOR', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};