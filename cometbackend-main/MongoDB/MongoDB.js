const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');

class MongoDB{
    constructor(){
        this.url="mongodb+srv://comet:comettest@cluster0.ulq62.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        this.client = null;
        this.databaseName = 'Comet';
        this.userCollection = 'Users';
    }

    async connect(){
        const mongoClient=new MongoClient(this.url,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi:ServerApiVersion.v1 });

        try{
            this.client=await mongoClient.connect();
            console.log('conntected successfulklu');
        }catch(err){
            console.log(err);
        }

        return this.client;
    };

    async insertOneUserData(UserData){
        try{
            const client=await this.connect();
            const id=await client.db(this.databaseName).collection(this.userCollection).insertOne(UserData);
            console.log(`inserted id ${id}`);
        }catch(err){
            console.log(err);
        }finally{
            this.disconnect();
        }
        return {respose:true}
    }

    async getUserByEmail(email) {
        try {
            const client = await this.connect();
            const user = await client.db(this.databaseName).collection(this.userCollection).findOne({ email: email });
            console.log(user);
            return user;
        } catch (err) {
            console.log(err);
        } finally {
            await this.disconnect();
        }
    }

    async disconnect() {
        if (this.client) {
            console.log('successfully disconnected');
            return await this.client.close();
        } else
            return false;
    }

}

module.exports = MongoDB;