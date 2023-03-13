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

    case 'UPDATE_SPLITPOOL':
      return { ...state, splitPools: [...state.splitPools, action.payload] };    
    case 'UPDATE_SPLITPOOLS':
      return { ...state, splitPools: action.payload};
    case 'DELETE_SPLITPOOL':
      return {
        ...state,
        splitPools: state.splitPools.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_SPLITPOOL':
      return { ...state, openSplitPool: true };
    case 'CLOSE_SPLITPOOL':
      return { ...state, openSplitPool: false };

    case 'UPDATE_LYSIS':
      return { ...state, lysiss: [...state.lysiss, action.payload] };    
    case 'UPDATE_LYSISS':
      return { ...state, lysiss: action.payload};
    case 'DELETE_LYSIS':
      return {
        ...state,
        lysiss: state.lysiss.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_LYSIS':
      return { ...state, openLysis: true };
    case 'CLOSE_LYSIS':
      return { ...state, openLysis: false };

    case 'OPEN_PRELIB':
      return { ...state, openPrelibrary: true };
    case 'CLOSE_PRELIB':
      return { ...state, openPrelibrary: false };
    case 'UPDATE_PRELIBSELECT':
      return { ...state, selectedPrelibrarys: action.payload};

    case 'UPDATE_TDTTAILING':
      return { ...state, tdtTailings: [...state.tdtTailings, action.payload] };    
    case 'UPDATE_TDTTAILINGS':
      return { ...state, tdtTailings: action.payload};
    case 'DELETE_TDTTAILING':
      return {
        ...state,
        tdtTailings: state.tdtTailings.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_TDTTAILING':
      return { ...state, openTdtTailing: true };
    case 'CLOSE_TDTTAILING':
      return { ...state, openTdtTailing: false };
    
    case 'UPDATE_LINEARAMPANCHOR':
      return { ...state, linearAmpAnchors: [...state.linearAmpAnchors, action.payload] };    
    case 'UPDATE_LINEARAMPANCHORS':
      return { ...state, linearAmpAnchors: action.payload};
    case 'DELETE_LINEARAMPANCHOR':
      return {
        ...state,
        linearAmpAnchors: state.linearAmpAnchors.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_LINEARAMPANCHOR':
      return { ...state, openLinearAmpAnchor: true };
    case 'CLOSE_LINEARAMPANCHOR':
      return { ...state, openLinearAmpAnchor: false };

    case 'UPDATE_PREAMP':
      return { ...state, preAmps: [...state.preAmps, action.payload] };    
    case 'UPDATE_PREAMPS':
      return { ...state, preAmps: action.payload};
    case 'DELETE_PREAMP':
      return {
        ...state,
        preAmps: state.preAmps.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_PREAMP':
      return { ...state, openPreAmp: true };
    case 'CLOSE_PREAMP':
      return { ...state, openPreAmp: false };
    
    case 'UPDATE_DOUBLESIZESELECT':
      return { ...state, doubleSizeSelects: [...state.doubleSizeSelects, action.payload] };    
    case 'UPDATE_DOUBLESIZESELECTS':
      return { ...state, doubleSizeSelects: action.payload};
    case 'DELETE_DOUBLESIZESELECT':
      return {
        ...state,
        doubleSizeSelects: state.doubleSizeSelects.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_DOUBLESIZESELECT':
      return { ...state, openDoubleSizeSelect: true };
    case 'CLOSE_DOUBLESIZESELECT':
      return { ...state, openDoubleSizeSelect: false };

    case 'OPEN_RNALIB':
      return { ...state, openRnaLib: true };
    case 'CLOSE_RNALIB':
      return { ...state, openRnaLib: false };
    case 'UPDATE_RNALIBSELECT':
      return { ...state, selectedRnaLibrarys: action.payload};
    
    case 'OPEN_DNALIB':
      return { ...state, openDnaLib: true };
    case 'CLOSE_DNALIB':
      return { ...state, openDnaLib: false };
    case 'UPDATE_DNALIBSELECT':
      return { ...state, selectedDnaLibrarys: action.payload};

    case 'UPDATE_RNALIBRARY':
      return { ...state, rnaLibrarys: [...state.rnaLibrarys, action.payload] };    
    case 'UPDATE_RNALIBRARYS':
      return { ...state, rnaLibrarys: action.payload};
    case 'DELETE_RNALIBRARY':
      return {
        ...state,
        rnaLibrarys: state.rnaLibrarys.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_RNALIBRARY':
      return { ...state, openRnaLibrary: true };
    case 'CLOSE_RNALIBRARY':
      return { ...state, openRnaLibrary: false };

    case 'UPDATE_RNASPLITENZYME':
      return { ...state, rnaSplitEnzymes: [...state.rnaSplitEnzymes, action.payload] };    
    case 'UPDATE_RNASPLITENZYMES':
      return { ...state, rnaSplitEnzymes: action.payload};
    case 'DELETE_RNASPLITENZYME':
      return {
        ...state,
        rnaSplitEnzymes: state.rnaSplitEnzymes.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_RNASPLITENZYME':
      return { ...state, openRnaSplitEnzyme: true };
    case 'CLOSE_RNASPLITENZYME':
      return { ...state, openRnaSplitEnzyme: false };

    case 'UPDATE_RNAADAPTER':
      return { ...state, rnaAdapters: [...state.rnaAdapters, action.payload] };    
    case 'UPDATE_RNAADAPTERS':
      return { ...state, rnaAdapters: action.payload};
    case 'DELETE_RNAADAPTER':
      return {
        ...state,
        rnaAdapters: state.rnaAdapters.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_RNAADAPTER':
      return { ...state, openRnaAdapter: true };
    case 'CLOSE_RNAADAPTER':
      return { ...state, openRnaAdapter: false };

    case 'UPDATE_RNALIBMULTIPLEX':
      return { ...state, rnaLibMultiplexs: [...state.rnaLibMultiplexs, action.payload] };    
    case 'UPDATE_RNALIBMULTIPLEXS':
      return { ...state, rnaLibMultiplexs: action.payload};
    case 'DELETE_RNALIBMULTIPLEX':
      return {
        ...state,
        rnaLibMultiplexs: state.rnaLibMultiplexs.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_RNALIBMULTIPLEX':
      return { ...state, openRnaLibMultiplex: true };
    case 'CLOSE_RNALIBMULTIPLEX':
      return { ...state, openRnaLibMultiplex: false };

    case 'UPDATE_DNALIBRARY':
      return { ...state, dnaLibrarys: [...state.dnaLibrarys, action.payload] };    
    case 'UPDATE_DNALIBRARYS':
      return { ...state, dnaLibrarys: action.payload};
    case 'DELETE_DNALIBRARY':
      return {
        ...state,
        dnaLibrarys: state.dnaLibrarys.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_DNALIBRARY':
      return { ...state, openDnaLibrary: true };
    case 'CLOSE_DNALIBRARY':
      return { ...state, openDnaLibrary: false };

    case 'UPDATE_DNASPLITENZYME':
      return { ...state, dnaSplitEnzymes: [...state.dnaSplitEnzymes, action.payload] };    
    case 'UPDATE_DNASPLITENZYMES':
      return { ...state, dnaSplitEnzymes: action.payload};
    case 'DELETE_DNASPLITENZYME':
      return {
        ...state,
        dnaSplitEnzymes: state.dnaSplitEnzymes.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_DNASPLITENZYME':
      return { ...state, openDnaSplitEnzyme: true };
    case 'CLOSE_DNASPLITENZYME':
      return { ...state, openDnaSplitEnzyme: false };

    case 'UPDATE_DNAADAPTER':
      return { ...state, dnaAdapters: [...state.dnaAdapters, action.payload] };    
    case 'UPDATE_DNAADAPTERS':
      return { ...state, dnaAdapters: action.payload};
    case 'DELETE_DNAADAPTER':
      return {
        ...state,
        dnaAdapters: state.dnaAdapters.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_DNAADAPTER':
      return { ...state, openDnaAdapter: true };
    case 'CLOSE_DNAADAPTER':
      return { ...state, openDnaAdapter: false };

    case 'UPDATE_DNALIBMULTIPLEX':
      return { ...state, dnaLibMultiplexs: [...state.dnaLibMultiplexs, action.payload] };    
    case 'UPDATE_DNALIBMULTIPLEXS':
      return { ...state, dnaLibMultiplexs: action.payload};
    case 'DELETE_DNALIBMULTIPLEX':
      return {
        ...state,
        dnaLibMultiplexs: state.dnaLibMultiplexs.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_DNALIBMULTIPLEX':
      return { ...state, openDnaLibMultiplex: true };
    case 'CLOSE_DNALIBMULTIPLEX':
      return { ...state, openDnaLibMultiplex: false };

    case 'UPDATE_SEQLIBRARY':
      return { ...state, seqLibrarys: [...state.seqLibrarys, action.payload] };    
    case 'UPDATE_SEQLIBRARYS':
      return { ...state, seqLibrarys: action.payload};
    case 'DELETE_SEQLIBRARY':
      return {
        ...state,
        seqLibrarys: state.seqLibrarys.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_SEQLIBRARY':
      return { ...state, openSeqLibrary: true };
    case 'CLOSE_SEQLIBRARY':
      return { ...state, openSeqLibrary: false };
    
    case 'UPDATE_SEQRUN':
      return { ...state, seqRuns: [...state.seqRuns, action.payload] };    
    case 'UPDATE_SEQRUNS':
      return { ...state, seqRuns: action.payload};
    case 'DELETE_SEQRUN':
      return {
        ...state,
        seqRuns: state.seqRuns.filter((aRecord) => aRecord.id !== action.payload),
      };
    case 'OPEN_SEQRUN':
      return { ...state, openSeqRun: true };
    case 'CLOSE_SEQRUN':
      return { ...state, openSeqRun: false };

    case 'OPEN_SEQLIB':
      return { ...state, openSeqLib: true };
    case 'CLOSE_SEQLIB':
      return { ...state, openSeqLib: false };
    case 'UPDATE_SEQLIBSELECT':
      return { ...state, selectedSeqLibrarys: action.payload};

    case 'UPDATE_I7PRIMERS':
      return { ...state, i7Primers: action.payload};
    case 'UPDATE_I5PRIMERS':
      return { ...state, i5Primers: action.payload};

    case 'OPEN_SAMPLESHEET':
      return { ...state, openSampleSheet: true };
    case 'CLOSE_SAMPLESHEET':
      return { ...state, openSampleSheet: false };


    


    default:
      throw new Error('No matched action!');
  }
};

export default reducer;