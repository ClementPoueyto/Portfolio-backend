
const fs = require('fs')

const { serverUrlImage } = require('../server.config')
const manageAllErrors = require('../utils/routes/error-management')


const addPathImage = (image,directory) => {
  let imageToSend
  if(image == ""){
    imageToSend = ""
  }
  else {
    imageToSend = serverUrlImage() + directory+"/"+ image; 
  }
  return imageToSend
}

module.exports = {

  addPathImage
}
