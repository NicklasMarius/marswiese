/*eslint-disable*/
import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';
// core components
import Header from 'components/Header/Header.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
import Footer from 'components/Footer/Footer.js';
import Button from 'components/CustomButtons/Button.js';
// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.js';
import CampsSectionDescription from 'myViews/CampsPage/Sections/CampsSectionDescription.js';
import CampsSectionServices from 'myViews/CampsPage/Sections/CampsSectionServices.js';
import CampsSectionOffice from 'myViews/CampsPage/Sections/CampsSectionOffice.js';
import CampsSectionContact from 'myViews/CampsPage/Sections/CampsSectionContact.js';

import campsStyle from 'assets/jss/material-kit-pro-react/views/campsStyle.js';
import { BrowserRouter } from 'react-router-dom';
import MarswieseFooter from 'myComponents/Footer/Footer';

const useStyles = makeStyles(campsStyle);

export default function AboutUsPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Parallax image={require('assets/img/K1600_mars.JPG')} small>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h1 className={classes.title}>Camps auf der Marswiese</h1>
              <h4>
                Wir bieten nun seit geraumer Zeit mehrmals im Jahr Feriencamps
                für Kinder zwischen 6-13 Jahren an!
              </h4>
            </GridItem>
          </GridContainer>
          <br />
          <GridContainer>
            <GridItem
              md={4}
              sm={4}
              className={classNames(
                classes.mrAuto,
                classes.mlAuto,
                classes.textCenter
              )}
            >
              <Link href="/gestalte-dein-camp">
                <Button color="primary" size="lg" round>
                  Camp zusammenstellen
                </Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <CampsSectionDescription />
          <CampsSectionServices />
          <CampsSectionOffice />
          <CampsSectionContact />
        </div>
      </div>
      <MarswieseFooter />
    </BrowserRouter>
  );
}
