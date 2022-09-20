import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Button,
  ListItem,
  makeStyles,
  Tooltip
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'center',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%',
    minWidth : 10,
    // @ts-ignore
    color :  theme.palette.icons.menu,
    '&:hover' : {
      color :  theme.palette.primary.main,
    }
  },
  icon: {
    width : '18px'
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    // color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      // color: theme.palette.primary.main
    }
  },
  editIcon: {
    width: '16px'
  },
  tooltip: {
    // @ts-ignore
    backgroundColor : theme.palette.tooltip.main,
    fontSize : 12,
    fontWeight : 500,
    textTransform :'uppercase'
  },
  customArrow : {
    // backgroundColor : theme.palette.tooltip.main
  }
}));

interface NavItemProps {
  className?: string;
  id: string;
  href: string;
  click?: () => void;
  icon: any;
  title:string;
  edit: boolean;
  // onEditClick: () => void;
  onFilterClicked?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  className,
  id,
  href,
  click,
  icon: Icon,
  title,
  edit,
  // onEditClick,
  onFilterClicked,
  ...rest
}) => {
  const classes = useStyles();

  const handleDailogClick = () => {
    if (onFilterClicked) onFilterClicked()
  }

  const link = () => {
    if (click) {
      return (
        <Button
        // activeClassName={classes.active}
        className={classes.button}
        onClick={handleDailogClick}
        // to={href}
      >
      <Tooltip title={title} classes={{tooltip : classes.tooltip, arrow: classes.customArrow}} arrow placement="right-start">
      {Icon && (
          <Icon
            className={classes.icon}
            size="20"
          />
        )}
      </Tooltip>
      </Button>
      )
    } else {
      return (
        <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
      <Tooltip title={title} classes={{tooltip : classes.tooltip}} arrow placement="right-start">
      {Icon && (
          <Icon
            className={classes.icon}
            size="20"
          />
        )}
      </Tooltip>
      </Button>
      )
    }

  }


  return (
    <ListItem
      button
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
      key={id}
    >
     {link()}
      {/* {editFilter(edit, id)} */}
    </ListItem>
  );
};

export default NavItem;