import {connect, set} from 'mongoose';

export const connectDb = async () => {
    try {
        set('strictQuery', false);
        const {connection} = await connect(process.env.MONGO_URL);

        console.log('mongoose connected with host: '+connection.host);
        
    } catch (error) {
        console.log(error);
    }
}