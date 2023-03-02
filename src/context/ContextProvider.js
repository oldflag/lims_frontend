import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  users: [],
  collaborators: [],
  openCollaborator: false,
  donors: [],
  openDonor: false,
  specimens: [],
  openSpecimen: false,
  projects: [],
  openProject: false,
  antibodies: [],
  openAntibody: false,
  patn5s: [],
  openPatn5: false,
  loadPatn5s: [],
  openLoadPatn5: false,
  reagents: [],
  openReagent: false,
  experiments: [],
  openExperiment: false,
  samples: [],
  openSample: false,
  batchs: [],
  openBatch: false,
  assays: [],
  openAssay: false,
  assayBarcodes: [],
  openPtPrep: false,
  ptPreps: [],
  openNucleiIncubation: false,
  nucleiIncubations: [],
  openWashAndTag: false,
  washAndTags: [],
  openRnaRT: false,
  rnaRTs: [],

};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
