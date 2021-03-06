import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// core components
import Parallax from 'components/Parallax/Parallax.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// own components
import MarswieseFooter from './Footer/Footer.jsx';
import Header from 'components/Header/Header.js';
import HeaderLinks from './NavBar/NavBar.jsx';

import MainPageStyle from '../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js';

export const useMainPageStyles = makeStyles(MainPageStyle);

export const withParallaxPaper = WrappedComponent => ({
  title,
  subtitle,
  image,
  children
}) => {
  const mainPageClasses = useMainPageStyles();

  return (
    <div>
      <Header
        brand="Marswiese"
        links={<HeaderLinks dropdownHoverColor="secondary" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: 'primary'
        }}
      />

      <Parallax
        image={
          image
          //'https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg'
        }
        small
      >
        <div className={mainPageClasses.container}>
          <GridContainer justify="center">
            <GridItem
              xs={12}
              sm={12}
              md={8}
              className={mainPageClasses.textCenter}
            >
              <h2 className={mainPageClasses.title}>{title}</h2>
              {subtitle ? (
                <h4 className={mainPageClasses.title}>{subtitle}</h4>
              ) : null}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div
        className={classNames(mainPageClasses.main, mainPageClasses.mainRaised)}
      >
        <WrappedComponent>{children}</WrappedComponent>
      </div>

      <MarswieseFooter />
    </div>
  );
};

export const DivWithParallaxPaper = withParallaxPaper(({ children }) => (
  <div>{children}</div>
));
