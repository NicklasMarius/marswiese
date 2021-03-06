import React, { useContext } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// own components
import LocationItem from './LocationItem';
import HomeItem from './HomeItem';
import BookingsItem from './BookingsItem';
import ShoppingCartItem from './ShoppingCartItem';
import LoginItem from './LoginItem';
import AccountItem from './AccountItem';
import styles from 'assets/jss/material-kit-pro-react/components/headerLinksStyle.js';

import UserContext from '../../context/UserContext';

const useStyles = makeStyles(styles);

const HeaderLinks = props => {
  /*const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };*/

  /*const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };*/

  /*const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };*/

  const classes = useStyles();

  const { userData } = useContext(UserContext);

  return (
    <List className={classes.list + ' ' + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <HomeItem />
      </ListItem>
      <ListItem className={classes.listItem}>
        <LocationItem />
      </ListItem>

      {!userData.id ? (
        <ListItem className={classes.listItem}>
          <LoginItem />
        </ListItem>
      ) : (
        <React.Fragment>
          <ListItem className={classes.listItem}>
            <BookingsItem />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ShoppingCartItem />
          </ListItem>
          <ListItem className={classes.listItem}>
            <AccountItem />
          </ListItem>
        </React.Fragment>
      )}
    </List>
  );
};

export default HeaderLinks;
