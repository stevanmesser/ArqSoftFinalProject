import mongoose from 'mongoose';

import configMongoose from '~/configs/mongoose';

const connection = mongoose.connect(configMongoose.url, configMongoose.options);

export default connection;
