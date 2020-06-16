const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '33130c9249ed4a298014438a4e062579'
});

//calling clarifai API
const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API '))
}

//incrementing entries in db
const handleImage = (req, res, db) =>{
    const { id } = req.body;
    //console.log({id});
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries);
    })
    .catch(err => res.status(400).json('unable to get entries !! '))
}

module.exports = {
    handleImage,
    handleApiCall
}