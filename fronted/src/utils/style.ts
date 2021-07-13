import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: 2,
        },
        drawer: {
            width: 240,
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
            flexGrow: 1,
            padding: theme.spacing(10),
        },
    }),
);