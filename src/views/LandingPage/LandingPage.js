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
import Button from 'components/CustomButtons/Button.js'
import HeaderLinks from 'components/Header/HeaderLinks.js'
import Parallax from 'components/Parallax/Parallax.js'
import Typing from 'react-typing-animation'

// style
import styles from 'assets/jss/material-kit-react/views/landingPage.js'

// Sections for this page
import NewsletterSection from './Sections/NewsletterSection.js'



const useStyles = makeStyles(styles)

export default function LandingPage(props) {
  const classes = useStyles()
  const { ...rest } = props

  const onNavigateToHome = () => {
    window.open('/home', '_self')
  }

  return (
    <div>
      <Header
        color='transparent'
        brand='UniDict'
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
        {...rest}
      />
      <Parallax filter image={require('assets/img/landing2.jpg')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Typing>
                <h1 className={classes.title}>
                  UniDict
                  <Typing.Backspace count={4} speed={150} />
                  versity Dictionaries
                </h1>
              </Typing>
              <br />
              <Button
                color='danger'
                size='lg'
                target='_blank'
                rel='noopener noreferrer'
                onClick={onNavigateToHome}
              >
                Get Started
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <NewsletterSection />
        </div>
      </div>
      <Footer />
    </div>
  )
}
