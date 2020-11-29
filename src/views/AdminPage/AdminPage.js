import React from 'react'

// core components
import Button from 'components/CustomButtons/Button.js'


export default function SavedPage() {

  const downloadUser = () => {
    let fileData = JSON.stringify(window.sessionStorage.getItem('users'))
    fileData = fileData.replace(/\\/g, "")
    const blob = new Blob([fileData], {type: "application/json"})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'userList.json'
    link.href = url
    link.click()
  }

  const downloadNewsletter = () => {
    let fileData = JSON.stringify(window.sessionStorage.getItem('subscribers'))
    fileData = fileData.replace(/\\/g, "")
    const blob = new Blob([fileData], {type: "application/json"})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'subscriberList.json'
    link.href = url
    link.click()
  }

  const downloadFav = () => {
    let fileData = JSON.stringify(window.sessionStorage.getItem('favorites'))
    fileData = fileData.replace(/\\/g, "")
    const blob = new Blob([fileData], {type: "application/json"})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'favorites.json'
    link.href = url
    link.click()
  }

  return(
    <div style={{
      display: 'flex',
      justifyContent:'center'
    }}>
      <Button
        color='primary'
        size='lg'
        target='_blank'
        rel='noopener noreferrer'
        onClick={downloadUser}
      >
        Download User List json
      </Button>
      <Button
        color='success'
        size='lg'
        target='_blank'
        rel='noopener noreferrer'
        onClick={downloadNewsletter}
      >
        Download Newsletter Subscriber List json
      </Button>
      <Button
        color='danger'
        size='lg'
        target='_blank'
        rel='noopener noreferrer'
        onClick={downloadFav}

      >
        Download Favorite Universities json
      </Button>
    </div>
  )
}
