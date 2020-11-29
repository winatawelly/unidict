import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles({
  root: {
    maxWidth: 340,
    minWidth: 340,
    marginBottom: 12,
  },
});

export default function UniversityCard(props) {
  const [state, setState] = useState({
    isFav: false,
  })

  const classes = useStyles();

  const onAddToFavorites = () => {
    props.onAddToFavorites && 
    props.onAddToFavorites({
      name: props.name,
      country: props.country,
      countryCode: props.countryCode,
      web_pages: [props.web],
    })
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {`${props.country}, ${props.countryCode}`}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            <a href={props.web} rel="noreferrer" target="_blank">{props.web}</a>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={onAddToFavorites}
        >
          {
            props.isFav
              ? <FavoriteIcon />
              : <FavoriteBorderIcon/>
          }
        </IconButton>
      </CardActions>
    </Card>
  );
}

UniversityCard.propTypes = {
    name: PropTypes.string,
    country: PropTypes.string,
    web: PropTypes.string,
    countryCode: PropTypes.string,
    isFav: PropTypes.bool,
    onAddToFavorites: PropTypes.func,

}
