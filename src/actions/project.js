import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/project';

export const register = async (project, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: project },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_PROJECT', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new project has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_PROJECT' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getProjects = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_PROJECTS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, projectId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${projectId}`,
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
        message: 'The project has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_PROJECT', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};