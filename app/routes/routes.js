module.exports = function(app, db) {

    var ObjectID = require('mongodb').ObjectID;

    const collection = 

    // Lecture d'une note
    app.get('/notes/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('notes').findOne(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send(item);
        }
      });
    });

    // Création d'une note
    app.post('/notes', (req, res) => {
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').insert(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });

    // Suppression d'une note
    app.delete('/notes/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('notes').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('Note ' + id + ' deleted!');
        }
      });
    });

    // Mise à jour d'une note
    app.put('/notes/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').update(details, note, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
        }
      });
    });

  };