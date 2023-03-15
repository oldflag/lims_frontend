import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/rnaSplitEnzyme';

export const register = async (rnaSplitEnzyme, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: rnaSplitEnzyme },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_RNASPLITENZYME', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new rnaSplitEnzyme has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_RNASPLITENZYME' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getRnaSplitEnzymes = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_RNASPLITENZYMES', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, rnaSplitEnzymeId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${rnaSplitEnzymeId}`,
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
        message: 'The rnaSplitEnzyme has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_RNASPLITENZYME', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};