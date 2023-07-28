import express from 'express'
import cors from 'cors'
import morgon from 'morgan';
import editroutes from "./Router/imageFilter.js"
import docxroutes from "./Router/DocxRouter.js"
import multer from 'multer';
const app = express();


app.use(cors());
app.use(express.json());
app.use(morgon('dev'));

//routes

// app.use('/api/v1/auth',authRoutes)
// app.use('/api/v1/product',productRoutes)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/v1/edit',editroutes)
app.use('/api/v1/docx',docxroutes)


const PORT = 7000;
//listen
app.listen(PORT ,()=>{
    console.log(`Runnnig at ${PORT}`);
})