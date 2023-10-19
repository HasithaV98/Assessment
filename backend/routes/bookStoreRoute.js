const express=require("express")
const router=express.Router()

const bookController=require('../controller/bookController')

router.get('/getAllBooks',bookController.index)
router.post('/saveing',bookController.store)
router.delete('/delete/:isbn',bookController.remove)

module.exports=router

