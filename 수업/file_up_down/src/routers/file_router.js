const router = require("express").Router();
const multer = require("multer");

//const upload = multer({dest : "upload_file"});
const stg = multer.diskStorage({
    destination : ( req , file, cb ) => {
        console.log("req : ", req.body );
        console.log("file : ", file)
        console.log("cb : ", cb )
        cb(null,  "upload_file")
    },
    filename : ( req, file, cb) => {
        cb(null, Date.now()+"-"+file.originalname );
    }
})

const f_filter = (req, file, cb)=>{
    console.log("f_filter file : ", file.mimetype );
    const type = file.mimetype.split("/");
    //if(type[1] == "jpg" || type[1] == "jpeg" || type[1] == "png"){
    if( type[0] == "image" ){
        cb(null, true);
    }else{
        req.fileValidation = "이미지만 저장하세요";
        cb(null, false);
    }
}

const upload = multer({storage : stg, fileFilter : f_filter })
const fileCtrl = require("../controller/file_controller");

router.get("/", fileCtrl.view.index )
router.post("/upload", upload.single("file_name"),  fileCtrl.process.upload )

router.get("/list", fileCtrl.view.list );
router.get("/download/:fileName", fileCtrl.view.download )
router.get("/deleteFile/:fileName", fileCtrl.process.deleteFile )
router.get("/modify_form/:fileName", fileCtrl.view.modifyForm )

router.post("/modify", upload.single("newFileName"),  fileCtrl.process.modify )
module.exports = router;