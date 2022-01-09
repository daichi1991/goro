import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@mui/system';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        header: {
            display: 'flex',
            zIndex: 100,
            height: 64
        },
        headerTitle:{
            flexGrow: 1,
        },
        appBody:{
            display: 'flex',
            flexDirection: 'row',
        },
        drawer: {
            zIndex: 1,
        },
        drawerPaper: {
            zIndex: 0
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow:2,
            paddingTop: theme.spacing(10),
        },
        itemList: {
            padding: 10,
        },
        itemListContent:{
            paddingLeft: 10,
            height: 40,
            fontSize: 12,
            lineHeight: '40px',
        },
        addMylistAppBar: {
            position: "relative"
        },
        addMylistTitle: {
            marginLeft: theme.spacing(2),
            flex: 1
        },
        addMylistBtn: {
            position:'absolute',
            right: 0,
            top: '50%',
            transform: 'translate(0, -50%)',
        },
        mylistContentBtn: {
            position:'absolute',
            right: 0,
        },
        itemLinkIcon :{
            width:"100%",
            color:"black",
            textDecoration:"none"
        },
        itemLinkText :{
            width:"100%",
            color:"#3f51b5",
            textDecoration:"none"
        },
        pageTitle:{
            height:"40px",
            color:"black",
            fontSize:"24px",
            fontWeight:"bold",
            textDecoration:"none",
            lineHeight:"24px",
        },
        pageTitleText:{
            marginLeft:"10px",
        },
        textPrimary:{
            color: '#173A5E',
        },
        textSecondary:{
            color: '#46505A',
        },
        space:{
            marginTop:'20px',
        },
        mylistMenubtn:{
            right:0,
            color:"black",
        },
        dialogContent:{
            display:"block",
        }
    }),
);
