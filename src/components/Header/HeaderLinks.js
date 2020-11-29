/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  const notLoggedInLinks = [
    {
      name: 'search',
      linkTo: '/home',
    },
    {
      name: 'login',
      linkTo: '/login',
    },
    {
      name: 'register',
      linkTo: '/register',
    }
  ]

  const isLoggedInLinks = [
    {
      name: 'search',
      linkTo: '/home',
    }, {
      name: 'favorites',
      linkTo: '/saved'
    }, {
      name: 'admin',
      linkTo: '/admin'
    }, {
      name: 'logout',
      linkTo: '/'
    }
  ]

  const onButtonPressed = (type) => {
    type === 'logout' && window.sessionStorage.setItem('isLoggedIn', false)
  }

  const linksRenderer = () => {
    const isUserLoggedIn = JSON.parse(window.sessionStorage.getItem('isLoggedIn'))
    return isUserLoggedIn
      ? isLoggedInLinks.map(linkRenderer)
      : notLoggedInLinks.map(linkRenderer)
  }
  
  const linkRenderer = (link, i) => {
    // link.name === 'logout' && window.sessionStorage.setItem('isLoggedIn', false)
    return (
      <ListItem className={classes.listItem}>
        <Button
          href={link.linkTo}
          color="transparent"
          className={classes.navLink}
          onClick={ onButtonPressed.bind(this, link.name)}
        >
          {link.name}
        </Button>
      </ListItem>
    )
  }

  return (
    <List className={classes.list}>
      {linksRenderer()}
    </List>
  );
}
