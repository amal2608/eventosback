const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const packagedetailsmodel = require("./model/package");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// DB Connection 
mongoose.connect("mongodb+srv://catering:catering@cluster0.xz4ni0q.mongodb.net/cater?retryWrites=true&w=majority")
    .then(() => { console.log("DB connected") })
    .catch(err => console.log(err));

// API creation
app.get('/', (request, response) => {
    response.send("Hai");
});


// Food Items save
app.post('/ptnew', upload.single('image'), async (request, response) => {
    try {
        const { packid, packname, pprice, pdescription, status } = request.body;
        const newFoodItem = new packagedetailsmodel({
            packid,
            packname,
            pprice,
            pdescription,
            status,
            image: {
                data: request.file.buffer,
                contentType: request.file.mimetype,
            }
        });
        await newFoodItem.save();

        response.status(200).json({ message: 'Food item added successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Food Items edit
app.put('/ptedit/:id', upload.single('image'), async (request, response) => {
    try {
        const id = request.params.id;
        const { packid, packname, pprice, pdescription, status } = request.body;
        let updatedData = {
            packid,
            packname,
            pprice,
            pdescription,
            status,
        };
        if (request.file) {
            updatedData.image = {
                data: request.file.buffer,
                contentType: request.file.mimetype,
            };
        }
        const result = await packagedetailsmodel.findByIdAndUpdate(id, updatedData);
        if (!result) {
            return response.status(404).json({ message: 'Food item not found' });
        }
        response.status(200).json({ message: 'Food item updated successfully', data: result });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Food Items view
app.get('/ptview', async (request, response) => {
    try {
        const foodItems = await packagedetailsmodel.find();
        response.status(200).json(foodItems);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Food Item status
app.put('/ptupdatestatus/:id', async (request, response) => {
    try {
        const id = request.params.id;
        await packagedetailsmodel.findByIdAndUpdate(id, { $set: { status: "INACTIVE" } });
        response.status(200).json({ message: 'Food item status updated successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Food Item
app.delete('/ptdelete/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const deletedFoodItem = await packagedetailsmodel.findByIdAndDelete(id);
        if (!deletedFoodItem) {
            return response.status(404).json({ message: 'Food item not found' });
        }
        response.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Assign port
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
