import React, {useState} from 'react'

import PropTypes from 'prop-types'


import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'

import People from '@material-ui/icons/People'
import Close from '@material-ui/icons/Close'


import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

import CustomInput from 'components/CustomInput/CustomInput.js'
import Button from 'components/CustomButtons/Button.js'
import Alert from '@material-ui/lab/Alert'



import styles from 'assets/jss/material-kit-react/views/componentsSections/loginModalStyle.js'

const useStyles = makeStyles(styles)

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />
})
  
Transition.displayName = 'Transition'


export default function LoginModal(props) {
    const [state, setState] = useState({
        users: JSON.parse(window.sessionStorage.getItem('users')) || [],
        username: '',
        password: '',
        isError: false,
    })
    const classes = useStyles()

    const setLoginStatus = (isLoggedIn) => {
        window.sessionStorage.setItem('isLoggedIn', isLoggedIn)
        props.onClose()
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

    const onLogin = (username, password) => {
        if (isUserExist(username, password)) {
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
        default:
            return (
                <Alert severity='error'>
                    Oops! username or password is incorrect
                </Alert>
            )
        }
    }

    return (
        <Dialog
            classes={{
            root: classes.center,
            paper: classes.modal
            }}
            open={props.isShow}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby='classic-modal-slide-title'
            aria-describedby='classic-modal-slide-description'
        >
            <DialogTitle
                id='classic-modal-slide-title'
                disableTypography
                className={classes.modalHeader}
            >
                <IconButton
                    className={classes.modalCloseButton}
                    key='close'
                    aria-label='Close'
                    color='inherit'
                    onClick={props.onClose}
                >
                    <Close className={classes.modalClose} />
                </IconButton>
                <h4 className={classes.modalTitle}>Oops! You need to login first!</h4>
            </DialogTitle>
            <DialogContent
            id='classic-modal-slide-description'
            className={classes.modalBody}
            >
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
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                <Button onClick={onLogin.bind(this, state.username, state.password)} color='transparent' simple>
                    Login
                </Button>
                <Button
                    onClick={props.onClose}
                    color='danger'
                    simple
                >
                    Close
                </Button>
            </DialogActions>
            {state.isError && alertRenderer('error')}

            <p className={classes.footerText}>
                Do not have an account ?
                <a href='/register'> Click here to register</a>
            </p>
        </Dialog>
    )
}

LoginModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}