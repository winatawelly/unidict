import React, { useState, useEffect } from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'

// @material-ui/icons
import People from '@material-ui/icons/People'

// core components
import Header from 'components/Header/Header.js'
import HeaderLinks from 'components/Header/HeaderLinks.js'
import Footer from 'components/Footer/Footer.js'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import Card from 'components/Card/Card.js'
import CardBody from 'components/Card/CardBody.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardFooter from 'components/Card/CardFooter.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import Alert from '@material-ui/lab/Alert'

import styles from 'assets/jss/material-kit-react/views/loginPage.js'

import image from 'assets/img/login-bg.jpg'

const useStyles = makeStyles(styles)

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = useState('cardHidden')
  const [state, setState] = useState({
    users: JSON.parse(window.sessionStorage.getItem('users')) || [],
    username: '',
    password: '',
    isError: false,
  })

  useEffect(() => {
    window.sessionStorage.getItem('isLoggedIn') && window.open('/home', '_self')
  }, [])


  setTimeout(() => {
    setCardAnimation('')
  }, 700)

  const classes = useStyles()
  const { ...rest } = props

  const setLoginStatus = (isLoggedIn) => {
    window.sessionStorage.setItem('isLoggedIn', isLoggedIn)
    window.open('/home', '_self')
  }

  const isUserExist = (username, password) => {
    return state.users.find(
      (user) => user.username === username && user.password === password
    )
      ? true
      : false
  }

  const onInputChange = (type, e) => {
    setState({
      ...state,
      [type]: e.target.value,
    })
  }

  const onLogin = () => {
    if (isUserExist(state.username, state.password)) {
      setLoginStatus(true)
    } else {
      setState({
        ...state,
        isError: true,
      })
    }
  }

  const alertRenderer = (type) => {
    switch (type) {
      case 'error':
        return (
          <Alert severity='error'>
            Oops! username or password is incorrect
          </Alert>
        )
      case 'success':
      default:
        return (
          <Alert severity='success'>
            Subscribed!
          </Alert>
        )
    }
  }

  const formRenderer = () => {
    return (
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <CardHeader color='primary' className={classes.cardHeader}>
                <h4>Login</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText='Username'
                  id='username'
                  onChange={onInputChange.bind(this, 'username')}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'email',
                    endAdornment: (
                      <InputAdornment position='end'>
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText='Password'
                  id='pass'
                  onChange={onInputChange.bind(this, 'password')}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'password',
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Icon className={classes.inputIconsColor}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: 'off',
                  }}
                />
                {state.isError && alertRenderer('error')}
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button onClick={onLogin} color='primary'>
                  Login
                </Button>
              </CardFooter>
              <p className={classes.footerText}>
                Do not have an account ?
                <a href='/register'> Click here to register</a>
              </p>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    )
  }

  return (
    <div>
      <Header
        absolute
        color='transparent' 
        brand='Material Kit React'
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>{formRenderer()}</div>
        <Footer whiteFont />
      </div>
    </div>
  )
}
