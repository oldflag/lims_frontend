import { Box } from '@mui/material';

import { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useValue } from '../context/ContextProvider';


import Loading from '../components/Loading';
import Notification from '../components/Notification';
import NavBar from '../components/NavBar';
import Login from '../components/user/Login';
import Register from '../components/user/Register';
import Dashboard from './dashboard/Dashboard';
import Collaborators from './acquisition/collaborator/Collaborators';
import Donors from './acquisition/donor/Donors';
import Projects from './acquisition/project/Projects';
import Specimens from './acquisition/specimen/Specimens';
import UserTable from './user/UserTable';
import Antibodies from './inventory/antibody/Antibodies';
import Patn5s from './inventory/patn5/Patn5s';
import Reagents from './inventory/reagent/Reagents';
import Experiments from './design/experiment/Experiments';
import Samples from './design/sample/Samples';
import Batchs from './design/batch/Batchs';
import Assays from './design/assay/Assays';
import LoadPatn5s from './design/loadPatn5/LoadPatn5s';
import PtPreps from './labprocess/ptPrep/PtPreps';
import SplitPools from './labprocess/splitPool/SplitPools';
import Lysiss from './labprocess/lysis/Lysiss';
import Prelibrarys from './labprocess/prelibrary/Prelibrarys';
import TdtTailings from './labprocess/prelibrary/tdtTailing/TdtTailings';
import LinearAmpAnchors from './labprocess/prelibrary/linearAmpAnchor/LinearAmpAnchors';
import PreAmps from './labprocess/prelibrary/preAmp/PreAmps';
import DoubleSizeSelects from './labprocess/prelibrary/doubleSizeSelect/DoubleSizeSelects';
import NewRnaLibrarys from './labprocess/rnaLibrary/newRnaLibrary/NewRnaLibrarys';
import RnaLibrarys from './labprocess/rnaLibrary/rnaLibrary/RnaLibrarys';
import RnaSplitEnzymes from './labprocess/rnaLibrary/rnaSplitEnzyme/RnaSplitEnzymes';
import RnaAdapters from './labprocess/rnaLibrary/rnaAdapter/RnaAdapters';
import RnaLibMultiplexs from './labprocess/rnaLibrary/rnaLibMultiplex/RnaLibMultiplexs';
import NewDnaLibrarys from './labprocess/dnaLibrary/newDnaLibrary/NewDnaLibrarys';
import DnaLibrarys from './labprocess/dnaLibrary/dnaLibrary/DnaLibrarys';
import DnaSplitEnzymes from './labprocess/dnaLibrary/dnaSplitEnzyme/DnaSplitEnzymes';
import DnaAdapters from './labprocess/dnaLibrary/dnaAdapter/DnaAdapters';
import DnaLibMultiplexs from './labprocess/dnaLibrary/dnaLibMultiplex/DnaLibMultiplexs';
import Qpcr from './qcresult/qpcr/Qpcr';
import SizeSelection from './qcresult/sizeselection/SizeSelection';
import TapeStation from './qcresult/tapestation/TapeStation';
import SeqLibrarys from './sequencing/seqLibrary/SeqLibrarys';
import NewSeqLibrarys from './sequencing/newSeqLibrary/NewSeqLibrarys'
import SeqFiles from './sequencing/seqFile/SeqFiles';
import SeqRuns from './sequencing/seqRun/SeqRuns';
import SampleSheet from './report/samplesheet/SampleSheet';
import Digest from './report/digest/Digest';
import Qcreport from './report/qcreport/Qcreport';
import SeqRunReport from './report/seqrunreport/SeqRunReport';

import Protected from '../components/Protected';
import NucleiIncubations from './labprocess/ptPrep/nucleiIncubation/NucleiIncubations';
import RnaRTs from './labprocess/ptPrep/rnaRT/RnaRTs';
import WashAndTags from './labprocess/ptPrep/washAndTag/WashAndTags';
import Quotes from './account/quote/Quotes';
import MinQuoteViews from './account/quote/MinQuoteViews';


const Home = () => {

const {
    state: { currentUser },
    dispatch,
} = useValue();

const [selectedLink, setSelectedLink] = useState('');

const linklist = useMemo(
    () => [
      {
        title: 'Dashboard',
        link: 'dashboard',
        component: <Dashboard {...{ setSelectedLink, link: 'dashboard' }} />,
      },
      {
        title: 'Users',
        link: 'usertable',
        component: <UserTable {...{ setSelectedLink, link: 'usertable' }} />,
      },
      {
        title: 'Collaborators',
        link: 'acquisition/collaborators',
        component: <Collaborators {...{ setSelectedLink, link: 'acquisition/collaborators' }} />,
      },
      {
        title: 'Donors',
        link: 'acquisition/donors',
        component: <Donors {...{ setSelectedLink, link: 'acquisition/donors' }} />,
      },
      {
        title: 'Projects',
        link: 'acquisition/projects',
        component: <Projects {...{ setSelectedLink, link: 'acquisition/projects' }} />,
      },
      {
        title: 'Specimens',
        link: 'acquisition/specimens',
        component: <Specimens {...{ setSelectedLink, link: 'acquisition/specimens' }} />,
      },
      {
        title: 'Antibody',
        link: 'inventory/antibodies',
        component: <Antibodies {...{ setSelectedLink, link: 'inventory/antibodies' }} />,
      },
      {
        title: 'Patn5',
        link: 'inventory/patn5s',
        component: <Patn5s {...{ setSelectedLink, link: 'inventory/patn5s' }} />,
      },
      
      {
        title: 'Reagents',
        link: 'inventory/reagents',
        component: <Reagents {...{ setSelectedLink, link: 'inventory/reagents' }} />,
      },
      {
        title: 'Experiments',
        link: 'design/experiments',
        component: <Experiments {...{ setSelectedLink, link: 'design/experiments' }} />,
      },
      {
        title: 'Samples',
        link: 'design/samples',
        component: <Samples {...{ setSelectedLink, link: 'design/samples' }} />,
      },
      {
        title: 'Batchs',
        link: 'design/batchs',
        component: <Batchs {...{ setSelectedLink, link: 'design/batchs' }} />,
      },
      {
        title: 'Quotes',
        link: 'design/quotes',
        component: <Quotes {...{ setSelectedLink, link: 'design/quotes' }} />,
      },
      {
        title: 'Assays',
        link: 'design/assays',
        component: <Assays {...{ setSelectedLink, link: 'design/assays' }} />,
      },
      {
        title: 'LoadPatn5',
        link: 'design/loadPatn5s',
        component: <LoadPatn5s {...{ setSelectedLink, link: 'design/loadPatn5s' }} />,
      },
      {
        title: 'Paired-Tag Preparation',
        link: 'labprocess/ptPrep',
        component: <PtPreps {...{ setSelectedLink, link: 'labprocess/ptPrep' }} />,
      },
      {
        title: 'Nuclei Incubation',
        link: 'labprocess/ptPrep/nucleiIncubation',
        component: <NucleiIncubations {...{ setSelectedLink, link: 'labprocess/ptPrep/nucleiIncubation' }} />,
      },
      {
        title: 'RNA RT',
        link: 'labprocess/ptPrep/rnaRT',
        component: <RnaRTs {...{ setSelectedLink, link: 'labprocess/ptPrep/rnaRT' }} />,
      },
      {
        title: 'Wash And Tag',
        link: 'labprocess/ptPrep/washAndTag',
        component: <WashAndTags {...{ setSelectedLink, link: 'labprocess/ptPrep/washAndTag' }} />,
      },
      {
        title: 'Split&Pool',
        link: 'labprocess/splitPool',
        component: <SplitPools {...{ setSelectedLink, link: 'labprocess/splitPool' }} />,
      },
      {
        title: 'Lysis',
        link: 'labprocess/lysis',
        component: <Lysiss {...{ setSelectedLink, link: 'labprocess/lysis' }} />,
      },
      {
        title: 'Prelibrary',
        link: 'labprocess/prelibrary',
        component: <Prelibrarys {...{ setSelectedLink, link: 'labprocess/prelibrary' }} />,
      },
      {
        title: 'TDT Tailing',
        link: 'labprocess/prelibrary/tdtTailing',
        component: <TdtTailings {...{ setSelectedLink, link: 'labprocess/prelibrary/tdtTailing' }} />,
      },
      {
        title: 'Linear Amplication With Anchor',
        link: 'labprocess/prelibrary/linearAmpAnchor',
        component: <LinearAmpAnchors {...{ setSelectedLink, link: 'labprocess/prelibrary/linearAmpAnchor' }} />,
      },
      {
        title: 'PreAmplication',
        link: 'labprocess/prelibrary/preAmp',
        component: <PreAmps {...{ setSelectedLink, link: 'labprocess/prelibrary/preAmp' }} />,
      },
      {
        title: 'Double Size Selection',
        link: 'labprocess/prelibrary/doubleSizeSelect',
        component: <DoubleSizeSelects {...{ setSelectedLink, link: 'labprocess/prelibrary/doubleSizeSelect' }} />,
      },

      {
        title: 'DNA Library',
        link: 'labprocess/dnaLibrary/dnaLibrary',
        component: <DnaLibrarys {...{ setSelectedLink, link: 'labprocess/dnaLibrary/dnaLibrary' }} />,
      },
      {
        title: 'New DNA Library',
        link: 'labprocess/dnaLibrary/newDnaLibrary',
        component: <NewDnaLibrarys {...{ setSelectedLink, link: 'labprocess/dnaLibrary/newDnaLibrary' }} />,
      },
      {
        title: 'DNA SplitEnzyme',
        link: 'labprocess/dnaLibrary/dnaSplitEnzyme',
        component: <DnaSplitEnzymes {...{ setSelectedLink, link: 'labprocess/dnaLibrary/dnaSplitEnzyme' }} />,
      },
      {
        title: 'DNA Adapter',
        link: 'labprocess/dnaLibrary/dnaAdapter',
        component: <DnaAdapters {...{ setSelectedLink, link: 'labprocess/dnaLibrary/dnaAdapter' }} />,
      },
      {
        title: 'DNA LibMultiplex',
        link: 'labprocess/dnaLibrary/dnaLibMultiplex',
        component: <DnaLibMultiplexs {...{ setSelectedLink, link: 'labprocess/dnaLibrary/dnaLibMultiplex' }} />,
      },
      {
        title: 'RNA Library',
        link: 'labprocess/rnaLibrary/rnaLibrary',
        component: <RnaLibrarys {...{ setSelectedLink, link: 'labprocess/rnaLibrary/rnaLibrary' }} />,
      },
      {
        title: 'New RNA Library',
        link: 'labprocess/rnaLibrary/newRnaLibrary',
        component: <NewRnaLibrarys {...{ setSelectedLink, link: 'labprocess/rnaLibrary/newRnaLibrary' }} />,
      },
      {
        title: 'RNA SplitEnzyme',
        link: 'labprocess/rnaLibrary/rnaSplitEnzyme',
        component: <RnaSplitEnzymes {...{ setSelectedLink, link: 'labprocess/rnaLibrary/rnaSplitEnzyme' }} />,
      },
      {
        title: 'RNA Adapter',
        link: 'labprocess/rnaLibrary/rnaAdapter',
        component: <RnaAdapters {...{ setSelectedLink, link: 'labprocess/rnaLibrary/rnaAdapter' }} />,
      },
      {
        title: 'RNA LibMultiplex',
        link: 'labprocess/rnaLibrary/rnaLibMultiplex',
        component: <RnaLibMultiplexs {...{ setSelectedLink, link: 'labprocess/rnaLibrary/rnaLibMultiplex' }} />,
      },
      {
        title: 'qPCR',
        link: 'qcresult/qpcr',
        component: <Qpcr {...{ setSelectedLink, link: 'qcresult/qpcr' }} />,
      },
      {
        title: 'Size Selection',
        link: 'qcresult/sizeselection',
        component: <SizeSelection {...{ setSelectedLink, link: 'qcresult/sizeselection' }} />,
      },
      {
        title: 'TapeStation',
        link: 'qcresult/tapestation',
        component: <TapeStation {...{ setSelectedLink, link: 'qcresult/tapestation' }} />,
      },
      {
        title: 'Sequencing Librarys',
        link: 'sequencing/seqLibrary',
        component: <SeqLibrarys {...{ setSelectedLink, link: 'sequencing/seqLibrary' }} />,
      },
      {
        title: 'New Sequencing Librarys',
        link: 'sequencing/newSeqLibrary',
        component: <NewSeqLibrarys {...{ setSelectedLink, link: 'sequencing/newSeqLibrary' }} />,
      },
      {
        title: 'Sequencing Files',
        link: 'sequencing/seqFile',
        component: <SeqFiles {...{ setSelectedLink, link: 'sequencing/seqFile' }} />,
      },
      {
        title: 'Sequencing Runs',
        link: 'sequencing/seqRun',
        component: <SeqRuns {...{ setSelectedLink, link: 'sequencing/seqRun' }} />,
      },
      {
        title: 'Sample Sheet',
        link: 'report/samplesheet',
        component: <SampleSheet {...{ setSelectedLink, link: 'report/samplesheet' }} />,
      },
      {
        title: 'Digests for Analysis',
        link: 'report/digest',
        component: <Digest {...{ setSelectedLink, link: 'report/digest' }} />,
      },
      {
        title: 'QC Report',
        link: 'report/qcreport',
        component: <Qcreport {...{ setSelectedLink, link: 'report/qcreport' }} />,
      },
      {
        title: 'Sequencing Run Report',
        link: 'report/seqrun',
        component: <SeqRunReport {...{ setSelectedLink, link: 'report/seqrun' }} />,
      },
      {
        title: 'Quotes',
        link: 'account/quote',
        component: <Quotes {...{ setSelectedLink, link: 'account/quote' }} />,
      },
      {
        title: 'Minimum Quote View',
        link: 'account/minquoteview',
        component: <MinQuoteViews {...{ setSelectedLink, link: 'account/minquoteview' }} />,
      },
      // {
      //   title: 'Accounts',
      //   link: 'account/accounts',
      //   component: <Quotes {...{ setSelectedLink, link: 'account/quote' }} />,
      // },
      

    ],
    []
  );


//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch({ type: 'UPDATE_USER', payload: null });
//     navigate('/');
//   };


  return (
    <>
    <Loading />
    <Notification />
    <Login />
    <Register />
    <NavBar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route key="dashboard" path="/dashboard" element={<Dashboard {...{ setSelectedLink, link: 'dashboard' }} />} />
          <Route key="lims" path="/" element={<Dashboard {...{ setSelectedLink, link: 'dashboard' }} />} />
          {linklist.map((item) => (
            <Route key={item.title} path={item.link} element={<Protected currentUser={currentUser}> {item.component}</Protected>} />
          ))}
        </Routes>
    </Box>

    </>
  );
};

export default Home;