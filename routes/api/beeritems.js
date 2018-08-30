const express = require('express');
const router = express.Router();

const BeerItem = require('../../models/BeerItem');

router.get('/', (req, res) => {
    BeerItem.find().then(items => res.json(items));
});

router.post('/', (req, res) => {
    const newBeerItem = new BeerItem({
        id: req.body.id,
        name: req.body.name,
        tagline: req.body.tagline,
        description: req.body.description,
        image_url: req.body.image_url,
        abv: req.body.abv,
        ibu: req.body.ibu
    });

    newBeerItem.save()
        .then(item => res.json(item))
        .catch(err => {
            console.log(err);
            res.status(501).json({ success: false })
        });
});

router.delete('/:id', (req, res) => {
    BeerItem.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;