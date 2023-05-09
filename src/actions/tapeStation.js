import fetchData from './utils/fetchData';
import { getObjectSignedUrl } from './utils/s3';

const url = process.env.REACT_APP_SERVER_URL + '/tapeStation';

export const register = async (tapeStation, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: tapeStation },
    dispatch
  );
  if (result) {    
    result.resultFileUrl = await getObjectSignedUrl(result.resultFile)
    dispatch({ type: 'UPDATE_TAPESTATION', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new tapeStation result has been added successfully',
      },
    });
    dispatch({ type: 'CLOSE_TAPESTATION' });

  }

  dispatch({ type: 'END_LOADING' });
};


export const getTapeStations = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);

  // console.log(result)
  
  if (result) {
    for(let aResult of result){
      aResult.resultFileUrl = await getObjectSignedUrl(aResult.resultFile)
    }
    dispatch({ type: 'UPDATE_TAPESTATIONS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, tapeStationId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${tapeStationId}`,
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
        message: 'A tapeStation result has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_TAPESTATION', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};