import React, { useState, useEffect } from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'

// @material-ui/icons
// import Email from '@material-ui/icons/Email'
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

import styles from 'assets/jss/material-kit-react/views/registerPage.js'

import image from 'assets/img/register-bg.jpg'

const useStyles = makeStyles(styles)

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = useState('cardHidden')
  const [state, setState] = useState({
    users: JSON.parse(window.sessionStorage.getItem('users')) || [],
    username: '',
    password: '',
    password2: '',
    isPasswordMismatch: false,
    isAlreadyExist: false,
  })

  setTimeout(() => {
    setCardAnimation('')
  }, 700)

  useEffect(() => {
    window.sessionStorage.getItem('isLoggedIn') && window.open('/home', '_self')

  }, [])

  const classes = useStyles()
  const { ...rest } = props


  const register = (username, password) => {
    state.users.push({
      username,
      password,
    })
    window.sessionStorage.setItem('users', JSON.stringify(state.users))
    window.sessionStorage.setItem('isLoggedIn', true)
    window.open('/home', '_self')

  }

  const isUserExist = (username) => {
    return state.users.find((user) => user.username === username)
      ? true
      : false
  }

  const onInputChange = (type, e) => {
    setState({
      ...state,
      [type]: e.target.value,
    })
  }

  const onRegister = () => {
    if (state.password !== state.password2) {
      setState({
        ...state,
        isPasswordMismatch: true,
        isAlreadyExist: false,
      })
    } else {
      if (isUserExist(state.username)) {
        setState({
          ...state,
          isPasswordMismatch: false,
          isAlreadyExist: true,
        })
      } else {
        register(state.username, state.password)
      }
    }
  }

  const alertRenderer = (type) => {
    switch (type) {
      case 'alreadyExist':
        return (
          <Alert severity='error'>
            Oops! Username already exist
          </Alert>
        )
      case 'mismatch':
        return (
          <Alert severity='error'>
            Oops! Password mismatch
          </Alert>
        )
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
              <CardHeader color='info' className={classes.cardHeader}>
                <h4>Sign Up</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText='Username'
                  id='username'
                  onChange={onInputChange.bind(this, 'username')}
                  error={state.isAlreadyExist}
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
                  error={state.isPasswordMismatch}
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
                <CustomInput
                  labelText='Confirm your password'
                  error={state.isPasswordMismatch}
                  id='pass2'
                  onChange={onInputChange.bind(this, 'password2')}
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
                {state.isPasswordMismatch && alertRenderer('mismatch')}
                {state.isAlreadyExist && alertRenderer('alreadyExist')}
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button onClick={onRegister} color='info'>
                  register
                </Button>
              </CardFooter>
              <p className={classes.footerText}>
                Already have an account ?
                <a href='/register'> Click here to login</a>
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
