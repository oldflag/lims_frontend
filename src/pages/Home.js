import { Box } from '@mui/material';

import { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useValue } from '../context/ContextProvider';


import Loading from '../components/Loading';
import Notification from '../components/Notification';
import NavBar from '../components/NavBar';
import Login from '../components/user/Login';
import Dashboard from './dashboard/dashboard';
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
import Quotes from './design/quote/Quotes';
import Assays from './design/assay/Assays';
import LoadPatn5s from './design/loadPatn5/LoadPatn5s';
import PtPreps from './labprocess/ptPrep/PtPreps';
import SplitPool from './labprocess/splitPool/SplitPool';
import Lysis from './labprocess/lysis/Lysis';
import Prelibrary from './labprocess/prelibrary/Prelibrary';
import DnaRnaLibrary from './labprocess/dnaRnaLibrary/DnaRnaLibrary';
import Qpcr from './qcresult/qpcr/Qpcr';
import SizeSelection from './qcresult/sizeselection/SizeSelection';
import TapeStation from './qcresult/tapestation/TapeStation';
import SeqRuns from './sequencing/seqrun/SeqRuns';
import SeqFiles from './sequencing/seqfile/SeqFiles';
import SampleSheet from './report/samplesheet/SampleSheet';
import Digest from './report/digest/Digest';
import Qcreport from './report/qcreport/Qcreport';
import SeqRunReport from './report/seqrunreport/SeqRunReport';





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
        link: '',
        component: <Dashboard {...{ setSelectedLink, link: '' }} />,
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
        title: 'Split&Pool',
        link: 'labprocess/splitPool',
        component: <SplitPool {...{ setSelectedLink, link: 'labprocess/splitPool' }} />,
      },
      {
        title: 'Lysis',
        link: 'labprocess/lysis',
        component: <Lysis {...{ setSelectedLink, link: 'labprocess/lysis' }} />,
      },
      {
        title: 'Prelibrary',
        link: 'labprocess/prelibrary',
        component: <Prelibrary {...{ setSelectedLink, link: 'labprocess/prelibrary' }} />,
      },
      {
        title: 'DNA&RNA Library',
        link: 'labprocess/dnaRnaLibrary',
        component: <DnaRnaLibrary {...{ setSelectedLink, link: 'labprocess/dnaRnaLibrary' }} />,
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
        title: 'Sequencing Run',
        link: 'sequencing/seq_runs',
        component: <SeqRuns {...{ setSelectedLink, link: 'sequencing/seq_runs' }} />,
      },
      {
        title: 'Sequencing Files',
        link: 'sequencing/seq_files',
        component: <SeqFiles {...{ setSelectedLink, link: 'sequencing/seq_files' }} />,
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
    <NavBar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          {linklist.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
        </Routes>
    </Box>

    </>
  );
};

export default Home;