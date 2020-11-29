import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Alert from "@material-ui/lab/Alert";

import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "assets/jss/material-kit-react/views/landingPageSections/newsletterStyle.js";

const useStyles = makeStyles(styles);

export default function NewsletterSection() {
  const classes = useStyles();
  const [state, setstate] = useState({
    isSubscribing: false,
    email: "",
    isError: false,
    isSuccess: false,
    subscribers: JSON.parse(window.sessionStorage.getItem("subscribers")) || [],
  });

  console.log(state);

  const addToFile = (email) => {
    state.subscribers.push({
      email: email,
    });
    window.sessionStorage.setItem(
      "subscribers",
      JSON.stringify(state.subscribers)
    );
  };

  const isUserAlreadySubscribed = (email) => {
    return state.subscribers.find((sub) => sub.email === email) ? true : false;
  };

  const onSubscribe = () => {
    setstate({
      ...state,
      isSubscribing: !state.isSubscribing,
    });

    if (isUserAlreadySubscribed(state.email)) {
      setstate({
        ...state,
        isError: true,
        isSuccess: false,
      });
    } else {
      setstate({
        ...state,
        isError: false,
        isSuccess: true,
      });
      addToFile(state.email);
    }
  };

  const onInputChange = (e) => {
    setstate({
      ...state,
      email: e.target.value,
    });
  };

  const formRenderer = () => {
    return (
      <form>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              labelText="Your Email"
              id="email"
              error={state.isError}
              formControlProps={{
                fullWidth: true,
              }}
              onChange={onInputChange}
            />
          </GridItem>
        </GridContainer>
        {state.isError && alertRenderer("error")}
        {state.isSuccess && alertRenderer("success")}
      </form>
    );
  };

  const alertRenderer = (type) => {
    switch (type) {
      case "error":
        return (
          <Alert severity="error">Oops! You already subscribed before</Alert>
        );
      case "success":
      default:
        return <Alert severity="success">Subscribed!</Alert>;
    }
  };

  const buttonRenderer = () => {
    return (
      <div>
        <Button onClick={onSubscribe} color="primary">
          subscribe
        </Button>
      </div>
    );
  };

  const gridRenderer = () => {
    return (
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Subscribe to our newsletter</h2>
          <h4 className={classes.description}>
            Join over 10.000 others on UniDict email list to get access to
            exclusive content and promotion!
          </h4>
          {formRenderer()}
        </GridItem>
      </GridContainer>
    );
  };

  return (
    <div className={classes.section}>
      {gridRenderer()}
      <div className={classes.subscribeButtonContainer}>
        {state.isSubscribing ? <CircularProgress /> : buttonRenderer()}
      </div>
    </div>
  );
}
