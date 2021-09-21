import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';



export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        header: {
            display: 'flex',
            zIndex: 2,
            height: 64
        },
        headerTitle:{
            flexGrow: 1,
        },
        drawer: {
            flexGrow:1,
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
            position: 'absolute',
            right: 0
        },
    }),
);