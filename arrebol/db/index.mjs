import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/arrebol", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

export default mongoose;