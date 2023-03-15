import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/dnaSplitEnzyme';

export const register = async (dnaSplitEnzyme, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: dnaSplitEnzyme },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_DNASPLITENZYME', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new dnaSplitEnzyme has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_DNASPLITENZYME' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getDnaSplitEnzymes = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_DNASPLITENZYMES', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, dnaSplitEnzymeId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${dnaSplitEnzymeId}`,
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
        message: 'The dnaSplitEnzyme has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_DNASPLITENZYME', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};