import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/quote';

export const register = async (quote, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: quote },
    dispatch
  );

  console.log(result)
  
  if (result) {
    dispatch({ type: 'UPDATE_QUOTE', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new quote has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_QUOTE' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getQuotes = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_QUOTES', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, quoteId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${quoteId}`,
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
        message: 'The quote has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_QUOTE', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};