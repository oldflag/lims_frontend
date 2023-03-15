import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  currentUser: null,
  openLogin: false,
  openRegister: false,
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
  openSplitPool: false,
  splitPools: [],
  openLysis: false,
  lysiss: [],
  tdtTailings: [],
  openTdtTailing: false,
  linearAmpAnchors: [],
  openLinearAmpAnchor: false,
  preAmps: [],
  openPreAmp: false,
  doubleSizeSelects: [],
  openDoubleSizeSelect: false,
  openPrelibrary: false,
  selectedPrelibrarys: [],
  
  openRnaLib: false,
  selectedRnaLibrarys: [],
  openDnaLib: false,
  selectedDnaLibrarys: [],

  openRnaLibrary: false,
  rnaLibrarys: [],
  openRnaSplitEnzyme: false,
  rnaSplitEnzymes: [],
  openRnaAdapter: false,
  rnaAdapters: [],
  openRnaLibMultiplex: false,
  rnaLibMultiplexs: [],

  openDnaLibrary: false,
  dnaLibrarys: [],
  openDnaSplitEnzyme: false,
  dnaSplitEnzymes: [],
  openDnaAdapter: false,
  dnaAdapters: [],
  openDnaLibMultiplex: false,
  dnaLibMultiplexs: [],

  openSeqLibrary: false,
  seqLibrarys: [],

  openSeqRun: false,
  seqRuns: [],

  openSeqLib: false,
  selectedSeqLibrarys: [],

  i7Primers: [],
  i5Primers: [],

  openSampleSheet: false,
  

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
