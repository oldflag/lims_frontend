const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    
    case 'UPDATE_USERS':
      return { ...state, users: action.payload };

    case 'UPDATE_COLLABORATOR':
      return { ...state, collaborators: [...state.collaborators, action.payload] };
    
    case 'UPDATE_COLLABORATORS':
      return { ...state, collaborators: action.payload};
    
    case 'DELETE_COLLABORATOR':
      return {
        ...state,
        collaborators: state.collaborators.filter((aCollaborator) => aCollaborator.id !== action.payload),
      };
    
    case 'OPEN_COLLABORATOR':
      return { ...state, openCollaborator: true };

    case 'CLOSE_COLLABORATOR':
      return { ...state, openCollaborator: false };

    case 'UPDATE_DONOR':
      return { ...state, donors: [...state.donors, action.payload] };
    
    case 'UPDATE_DONORS':
      return { ...state, donors: action.payload};
    
    case 'DELETE_DONOR':
      return {
        ...state,
        donors: state.donors.filter((aDonor) => aDonor.id !== action.payload),
      };
    
    case 'OPEN_DONOR':
      return { ...state, openDonor: true };

    case 'CLOSE_DONOR':
      return { ...state, openDonor: false };
    
    case 'UPDATE_SPECIMEN':
      return { ...state, specimens: [...state.specimens, action.payload] };
    
    case 'UPDATE_SPECIMENS':
      return { ...state, specimens: action.payload};
    
    case 'DELETE_SPECIMEN':
      return {
        ...state,
        specimens: state.specimens.filter((aSpecimen) => aSpecimen.id !== action.payload),
      };
    
    case 'OPEN_SPECIMEN':
      return { ...state, openSpecimen: true };

    case 'CLOSE_SPECIMEN':
      return { ...state, openSpecimen: false };

    case 'UPDATE_PROJECT':
      console.log(state.projects)
      return { ...state, projects: [...state.projects, action.payload] };
    
    case 'UPDATE_PROJECTS':
      return { ...state, projects: action.payload};
    
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((aProject) => aProject.id !== action.payload),
      };
    
    case 'OPEN_PROJECT':
      return { ...state, openProject: true };

    case 'CLOSE_PROJECT':
      return { ...state, openProject: false };

    case 'UPDATE_ANTIBODY':
      return { ...state, antibodies: [...state.antibodies, action.payload] };
    
    case 'UPDATE_ANTIBODIES':
      return { ...state, antibodies: action.payload};
    
    case 'DELETE_ANTIBODY':
      return {
        ...state,
        antibodies: state.antibodies.filter((aAntibody) => aAntibody.id !== action.payload),
      };
    
    case 'OPEN_ANTIBODY':
      return { ...state, openAntibody: true };

    case 'CLOSE_ANTIBODY':
      return { ...state, openAntibody: false };

     case 'UPDATE_PATN5':
      return { ...state, patn5s: [...state.patn5s, action.payload] };
    
    case 'UPDATE_PATN5S':
      return { ...state, patn5s: action.payload};
    
    case 'DELETE_PATN5':
      return {
        ...state,
        patn5s: state.patn5s.filter((aPatn5) => aPatn5.id !== action.payload),
      };
    case 'OPEN_PATN5':
      return { ...state, openPatn5: true };

    case 'CLOSE_PATN5':
      return { ...state, openPatn5: false };

    case 'UPDATE_LOADPATN5':
      return { ...state, loadPatn5s: [...state.loadPatn5s, action.payload] };
    
    case 'UPDATE_LOADPATN5S':
      return { ...state, loadPatn5s: action.payload};
    
    case 'DELETE_LOADPATN5':
      return {
        ...state,
        loadPatn5s: state.loadPatn5s.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_LOADPATN5':
      return { ...state, openLoadPatn5: true };

    case 'CLOSE_LOADPATN5':
      return { ...state, openLoadPatn5: false };

    case 'UPDATE_REAGENT':
      return { ...state, reagents: [...state.reagents, action.payload] };
    
    case 'UPDATE_REAGENTS':
      return { ...state, reagents: action.payload};
    
    case 'DELETE_REAGENT':
      return {
        ...state,
        reagents: state.reagents.filter((aPatn5) => aPatn5.id !== action.payload),
      };
    
    case 'OPEN_REAGENT':
      return { ...state, openReagent: true };

    case 'CLOSE_REAGENT':
      return { ...state, openReagent: false };

    case 'UPDATE_EXPERIMENT':
      return { ...state, experiments: [...state.experiments, action.payload] };
    
    case 'UPDATE_EXPERIMENTS':
      return { ...state, experiments: action.payload};
    
    case 'DELETE_EXPERIMENT':
      return {
        ...state,
        experiments: state.experiments.filter((aPatn5) => aPatn5.id !== action.payload),
      };
    
    case 'OPEN_EXPERIMENT':
      return { ...state, openExperiment: true };

    case 'CLOSE_EXPERIMENT':
      return { ...state, openExperiment: false };

    case 'UPDATE_SAMPLE':
      return { ...state, samples: [...state.samples, action.payload] };
    
    case 'UPDATE_SAMPLES':
      return { ...state, samples: action.payload};
    
    case 'DELETE_SAMPLE':
      return {
        ...state,
        samples: state.samples.filter((aRecord) => aRecord.id !== action.payload),
      };    
    case 'OPEN_SAMPLE':
      return { ...state, openSample: true };

    case 'CLOSE_SAMPLE':
      return { ...state, openSample: false };

    case 'UPDATE_BATCH':
      return { ...state, batchs: [...state.batchs, action.payload] };    
    case 'UPDATE_BATCHS':
      return { ...state, batchs: action.payload};
    case 'DELETE_BATCH':
      return {
        ...state,
        batchs: state.batchs.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_BATCH':
      return { ...state, openBatch: true };
    case 'CLOSE_BATCH':
      return { ...state, openBatch: false };
//assay
    case 'UPDATE_ASSAY':
      return { ...state, assays: [...state.assays, action.payload] };    
    case 'UPDATE_ASSAYS':
      return { ...state, assays: action.payload};
    case 'DELETE_ASSAY':
      return {
        ...state,
        assays: state.assays.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_ASSAY':
      return { ...state, openAssay: true };
    case 'CLOSE_ASSAY':
      return { ...state, openAssay: false };
// assaybarcode
    case 'UPDATE_ASSAYBARCODES':
      return { ...state, assayBarcodes: action.payload};
    
    case 'UPDATE_PTPREP':
      return { ...state, ptPreps: [...state.ptPreps, action.payload] };    
    case 'UPDATE_PTPREPS':
      return { ...state, ptPreps: action.payload};
    case 'DELETE_PTPREP':
      return {
        ...state,
        ptPreps: state.ptPreps.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_PTPREP':
      return { ...state, openPtPrep: true };
    case 'CLOSE_PTPREP':
      return { ...state, openPtPrep: false };

    case 'UPDATE_NUCLEIINCUBATION':
      return { ...state, nucleiIncubations: [...state.nucleiIncubations, action.payload] };    
    case 'UPDATE_NUCLEIINCUBATIONS':
      return { ...state, nucleiIncubations: action.payload};
    case 'DELETE_NUCLEIINCUBATION':
      return {
        ...state,
        nucleiIncubations: state.nucleiIncubations.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_NUCLEIINCUBATION':
      return { ...state, openNucleiIncubation: true };
    case 'CLOSE_NUCLEIINCUBATION':
      return { ...state, openNucleiIncubation: false };

    case 'UPDATE_WASHANDTAG':
      return { ...state, washAndTags: [...state.washAndTags, action.payload] };    
    case 'UPDATE_WASHANDTAGS':
      return { ...state, washAndTags: action.payload};
    case 'DELETE_WASHANDTAG':
      return {
        ...state,
        washAndTags: state.washAndTags.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_WASHANDTAG':
      return { ...state, openWashAndTag: true };
    case 'CLOSE_WASHANDTAG':
      return { ...state, openWashAndTag: false };

    case 'UPDATE_RNART':
      return { ...state, rnaRTs: [...state.rnaRTs, action.payload] };    
    case 'UPDATE_RNARTS':
      return { ...state, rnaRTs: action.payload};
    case 'DELETE_RNART':
      return {
        ...state,
        rnaRTs: state.rnaRTs.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_RNART':
      return { ...state, openRnaRT: true };
    case 'CLOSE_RNART':
      return { ...state, openRnaRT: false };

    default:
      throw new Error('No matched action!');
  }
};

export default reducer;