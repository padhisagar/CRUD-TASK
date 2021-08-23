const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Employee", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection Successfully");
}).catch((err) => {
    console.log(err);
});

const employeeName = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    active: Boolean,
    address: String,
    date: {
        type: Date,
        default: Date.now
    }

})

const Empdetail = new mongoose.model("Empdetail", employeeName);

const createDocument = async () => {
    try {
        const userdetail = new Empdetail({    
            name: "Sagar Padhi",
            password: "Sagar",
            email: "sagarpadhi123@gmail.com",
            active: true,
            address: "Dombivali East"
        });

        const result = await userdetail.save(); 
        console.log(result);

    } catch (error) {
        console.log("Error detected");
    }
}

createDocument();

const getDocument = async () => {
    try {
        const readdata = await Empdetail.find({password:"Sagar"})  //its is used to read data
        .select({email:1})
        .limit(1);
        console.log(readdata);
    } catch (error) {
        console.log("Error Detected");       
    }
}

getDocument();

const updateDocument = async () => {
    try {
        const updata = await Empdetail.update({name:"Sagar Padhi"},{$set:{name:"Padhi Sagar"}});
        console.log(updata);
    } catch (error) {
        console.log("Error Detected");
    }
}

updateDocument();

const deleteDocument = async () => {
    try{
        const deletedata = await Empdetail.deleteOne({name:"Sagar Padhi"});
        console.log(deletedata);
    }catch(error){
        console.log(error);
    }
}

deleteDocument();