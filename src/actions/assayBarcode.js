import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/assayBarcode';


export const getAssayBarcodes = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_ASSAYBARCODES', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

