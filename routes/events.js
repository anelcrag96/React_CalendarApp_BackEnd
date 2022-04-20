/*
    Event routes
    /api/events
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

// Todas tienes que pasar por la validación del JWT
router.use(validateJWT);

// Obtener eventos 
router.get('/', getEvents);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'Título obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de finalización obligatoria').custom(isDate),
        validateFields
    ],
    createEvent
);

// Actualizar Evento
router.put(
    '/:id',
    [
        check('title', 'Título obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de finalización obligatoria').custom(isDate),
        validateFields
    ],
    updateEvent
);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;