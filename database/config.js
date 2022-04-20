const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN /*, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }*/);

        console.log('DB Online')
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar BD');
    }
}

module.exports = {
    dbConnection
}

// mongodb+srv://Anel_Crag:<password>@cluster0.ewjpt.mongodb.net
// DB user: anel_crag
// Password: DXZQrA5j6LXYOdeS