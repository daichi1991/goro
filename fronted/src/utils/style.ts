import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        header: {
            flexGrow: 1,
            zIndex: 2,
        },
        headerTitle:{
            flexGrow: 1,
        },
        drawer: {
            flexShrink: 0,
            zIndex: 1,
        },
        drawerPaper: {
            width: 240,
            zIndex: 0
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow : 1,
            paddingTop: theme.spacing(10),
            paddingRight: theme.spacing(10),
        },
    }),
);