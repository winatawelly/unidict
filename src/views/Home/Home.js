import React, { useState} from 'react'

// nodejs library that concatenates classes
import classNames from 'classnames'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons
import Search from '@material-ui/icons/Search'

// core components
import Header from 'components/Header/Header.js'
import Footer from 'components/Footer/Footer.js'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Parallax from 'components/Parallax/Parallax.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import InputAdornment from '@material-ui/core/InputAdornment'

// axios
import axios from 'axios'

// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.js'
import UniversitiesList from '../Components/Sections/UniversitiesList'

// style
import styles from 'assets/jss/material-kit-react/views/homePage.js'

const useStyles = makeStyles(styles)

const CancelToken = axios.CancelToken
let source

export default function Components(props) {
  const [state, setState] = useState({
    search: '',
    results: [],
  })
  const classes = useStyles()
  const { ...rest } = props

  


  const onFetchData = (keyword) => {
    if(keyword.length >= 2) {
      if (typeof source != typeof undefined) {
        source.cancel('cancel')
      }
      source = CancelToken.source()
      axios(`http://universities.hipolabs.com/search?name=${keyword}`, {
        cancelToken: source.token
      })
      .then(res => {
        setState({
          ...state,
          results: res.data,
        })
      })
    }
  }

  const onSearchChange = (e) => {
    setState({
      ...state,
      search: e.target.value,
    })
    onFetchData(state.search)
  }

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
                <h1 className={classes.title}>University Dictionaries</h1>
                <h3 className={classes.subtitle}>
                  Find infos about your favorite University, just a few clicks away
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    )
  }

  const searchBarRenderer = () => {
    return (
      <div className={classes.searchBarContainer}>
        <CustomInput
          labelText='University Name'
          id='text'
          onChange={onSearchChange}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'text',
            endAdornment: (
              <InputAdornment position='end'>
                <Search className={classes.inputIconsColor} />
              </InputAdornment>
            ),
          }}
        />
      </div>
    )
  }

  const searchResultRenderer = () => {
    return (
      <UniversitiesList
        data={state.results}
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
        {searchBarRenderer()}
        {searchResultRenderer()}
      </div>
      <Footer />
    </div>
  )
}
