import React from 'react'

// nodejs library that concatenates classes
import classNames from 'classnames'


// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// core components
import Header from 'components/Header/Header.js'
import Footer from 'components/Footer/Footer.js'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Parallax from 'components/Parallax/Parallax.js'

// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.js'
import UniversitiesList from '../Components/Sections/UniversitiesList'

// style
import styles from 'assets/jss/material-kit-react/views/homePage.js'

const useStyles = makeStyles(styles)

export default function SavedPage(props) {
  const classes = useStyles()
  const { ...rest } = props

  const headerRenderer = () => {
    return (
      <Header
        brand='UniDict'
        rightLinks={<HeaderLinks />}
        fixed
        color='transparent'
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
        {...rest}
      />
    )
  }

  const parallaxRenderer = () => {
    return (
      <Parallax image={require('assets/img/home-bg.jpg')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Favorites Universities</h1>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    )
  }

  const searchResultRenderer = () => {
    return (
      <UniversitiesList
        showSaved
      />
    )
  }
  return (
    <div>
      {headerRenderer()}
      {parallaxRenderer()}

      <div
        className={classNames(classes.main, classes.mainRaised)}
      >
        {searchResultRenderer()}
      </div>
      <Footer />
    </div>
  )
}
