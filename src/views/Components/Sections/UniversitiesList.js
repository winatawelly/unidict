import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import UniversityCard from '../Sections/UniversityCard'

import LoginModal from '../Sections/LoginModal.js'


import styles from 'assets/jss/material-kit-react/views/componentsSections/listStyle.js'
const useStyles = makeStyles(styles)

export default function UniversitiesList(props) {
    const [state, setState] = useState({
        refresher: 0,
        isShowModal: false,
    })
    const classes = useStyles()

    const isFav = (name) => {
        const favorites = JSON.parse(window.sessionStorage.getItem('favorites')) || []
        return !!favorites.find(fav => fav.name === name)
    }

    const onCloseModal = () => {
        console.log('here')
        setState({
            ...state,
            isShowModal: false,
        })
    }

    const onAddToFavorites = (data) => {
        if(!JSON.parse(window.sessionStorage.getItem('isLoggedIn'))) {
            setState({
                ...state,
                isShowModal: true,
            })
        }else {
            let favorites = JSON.parse(window.sessionStorage.getItem('favorites')) || []
    
            if(isFav(data.name)) {
                favorites = favorites.filter(fav => fav.name !== data.name)
            }else {
                favorites.push(data)
            }
    
            window.sessionStorage.setItem('favorites', JSON.stringify(favorites))
            setState({
                refresher: state.refresher + 1,
            })
        }
    }

    const cardRenderer = (university, i) => {
        return (
            <UniversityCard
                key={i}
                name={ university.name }
                country={ university.country }
                web={ university.web_pages[0] }
                countryCode={ university.alpha_two_code }
                isFav={isFav(university.name)}
                onAddToFavorites={onAddToFavorites}
            />
        )
    }

    const emptyRenderer = () => {
        return (
            <h3>Nothing yet :(</h3>
        )
    }

    const resultsRenderer = () => {
        return props.data.length > 0
        && props.data.map(cardRenderer)
    }

    const savedRenderer = () => {
        const data = JSON.parse(window.sessionStorage.getItem('favorites'))
        return !!data && data.length > 0
            ? data.map(cardRenderer)
            : emptyRenderer()
    }



    return (
        <div className={classes.listContainer}>
            {
                props.showSaved
                    ? savedRenderer()
                    : resultsRenderer()
            }
            <LoginModal
                isShow={state.isShowModal}
                onClose={onCloseModal}
            />
        </div>
    )
}

UniversitiesList.propTypes = {
    data: PropTypes.array,
    showSaved: PropTypes.bool,
}