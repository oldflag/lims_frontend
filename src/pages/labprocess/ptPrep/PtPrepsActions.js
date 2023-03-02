import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useValue } from '../../../context/ContextProvider';
// import { deleteOne } from '../../../actions/ptPrep';

import {
  GridRowModes,
  GridActionsCellItem,
} from '@mui/x-data-grid';

const PtPrepsActions = ({ params,  rows, setRows, rowModesModel, setRowModesModel }) => {

    const { dispatch } = useValue();

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
    
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    };

    // const handleDeleteClick = (id) => async() => {
    //     setRows(rows.filter((row) => row.id !== id));
    //     await deleteOne(id, dispatch)
    // };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

    };

    const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

    if (isInEditMode) {
        return [
        <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(params.id)}
        />,
        <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(params.id)}
            color="inherit"
        />,
        // {loading && (
        // <CircularProgress
        //   size={52}
        //   sx={{
        //     color: green[500],
        //     position: 'absolute',
        //     top: -6,
        //     left: -6,
        //     zIndex: 1,
        //   }}
        // />
        // )}
        ];
    }

    return [
        <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={handleEditClick(params.id)}
        color="inherit"
        />,
        // <GridActionsCellItem
        // icon={<DeleteIcon />}
        // label="Delete"
        // onClick={handleDeleteClick(params.id)}
        // color="inherit"
        // />,
    ];
}

export default PtPrepsActions;