# UniDict

UniDict - University Dictionaries. 
A simple web based application that lets you search information about universities across the world.

## Summary

  - [Getting Started](#getting-started)
  - [Runing the tests](#running-the-tests)
  - [Built With](#built-with)
  - [Authors](#authors)
  - [Drawbacks](#drawbacks)


## Getting Started

### Prerequisites

Clone the github repo

    git clone https://github.com/winatawelly/unidict.git

### Installing
Enter the cloned directory and then install the npm packages to run this app


    cd unidict
    npm i


## Running the tests

Not Fulfilled.
I have little to no experience about unit testing. I'm currently learning more about testing in general so that i can apply them to my future project


## Built With

  - [React](https://reactjs.org/) - Main framework for this application
  - [React Material UI](https://material-ui.com/components/text-fields/) - for creating beautiful UI fast

## Authors

  - **Welly Winata**
 
## Drawbacks

- I used `window.open()` instead of proper React navigator system for the sake of simplicity and speed
- Because React run in browser, it doesnt have an access to write into file. So I use `sessionStorage` instead. The main disadvantage of this is that the data (userList, userFavorite, subsriberList) will be erased if the tab or window is closed.


