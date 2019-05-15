module.exports = (app) => {
    const event = require('../controllers/event.controller.js');

    app.post('/event', event.create);


    app.get('/event', event.findAll);

  
    app.get('/event/:eventId', event.findOne);

    app.put('/event/:eventId', event.update);

    app.delete('/event/:eventId', event.delete);
}   