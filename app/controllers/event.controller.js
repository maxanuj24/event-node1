const Event = require('../models/event.model.js');


exports.create = (req, res) => {
    // Validate request
    // if(!req.body.name) {
    //     return res.status(400).send({
    //         message: "Event content can not be empty"
    //     });
    // }

    // Create a Note
    const event = new Event({
        name: req.body.name || "Untitled Event",
        type: req.body.type,
        length: req.body.length,
        views: req.body.views || "1"
    });

    // Save Note in the database
    event.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Event."
            });
        });
};

//-------------------------------------------------------------------------------------------------------------------------

exports.findAll = (req, res) => {
    Event.find()
        .then(events => {
            res.send(events);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
            });
        });
};

//-------------------------------------------------------------------------------------------------------------------------

exports.findOne = (req, res) => {
    Event.findById(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.eventId
            });            
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving event with id " + req.params.eventId
        });
    });
};



// exports.findOne = (req, res) => {
//    // console.log('Inside update findOne........');
//     console.log('**************************************************');
//     console.log(req.body.name);
//     console.log('**************************************************');
//   //  return res.status(404).send({'params': JSON.parse(req.body)});

//     Event.findById(req.params.eventId)
//        .then(event => {
//             if (!event) {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.eventId
//                 });
//             }
//              console.log("...........C");
//              res.send(event);
//         }).catch(err => {
//             return res.status(404).send({'params': JSON.stringify(req.params)});

//      if (err.kind === 'ObjectId') {
//         return res.status(404).send({
//              message: "Event not found with id " + req.params.eventId
//          });
//      }
//      return res.status(500).send({
//          message: "Error retrieving event with id " + req.params.eventId
//      });
    

//  }); return res.status(404).send({'params': JSON.stringify(req)});
// };

//-------------------------------------------------------------------------------------------------------------------------

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Event.findByIdAndUpdate(req.params.eventId, {
        name: req.body.name || "Untitled Event",
        type: req.body.type,
        length: req.body.length,
        views: req.body.views
    }, {new: true})
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Error updating even with id " + req.params.eventId
        });
    });
};



// exports.update = (req, res) => {
//     console.log('Inside update function........');
//     // Validate Request
//     if (!req.body.name) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }

    // Find note and update it with the request body
//     Event.findByIdAndUpdate(req.params.eventId, {
//         name: req.body.name || "Untitled Event",
//         type: req.body.type,
//         length: req.body.length
//     }, { new: true })
//         .then(event => {

//             if (!event) {
//                 return res.status(404).send({
//                     message: "Event not found with id " + req.params.eventId
//                 });
//             }
//             res.send(event);
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Event not found with id " + req.params.eventId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error updating even with id " + req.params.eventId
//             });
//         });
// };




//-------------------------------------------------------------------------------------------------------------------------

exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.eventId)
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.eventId
                });
            }
            res.send({ message: "Event deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.eventId
                });
            }
            return res.status(500).send({
                message: "Could not delete event with id " + req.params.eventId
            });
        });
};