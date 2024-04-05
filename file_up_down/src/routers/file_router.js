const router = require("express").Router();
const multer = require("multer")


//const upload = multer({dest : "upload_file"});
//데스티네이션 : 업로드 파일 >> 올라오는 사진 저기(업로드_파일}에다 저장하겠다

const stg = multer.diskStorage({
    destination : (req, file, cb)=>{
        console.log("req :" , req.body)
        console.log("file : ", file)
        console.log("cb : ", cb)
        cb(null, "upload_file")
    },
    filename : (req, file, cb) => {
        cb(null, Date.now()+"-" + file.originalname)
    }
})

const f_filter = (req, file, cb)=> {
    console.log("f_filter file : ", file.mimetype.split("/"));
    const type = file.mimetype.split("/");
    
    //if(type[1 == "jpg" || type[1] =="jpeg" || type[1] === "png"]){}
    //위는 파일의 자료형을 정할 수 있다
    if(type[0] == "image"){
        cb(null, true)
    }else{
        req.fileValidation = "이미지만 저장하세요"
        cb(null, false)
    }



}

const upload = multer({storage: stg, fileFilter:f_filter})
const fileCtrl = require("../controller/file_controller");

router.get("/",fileCtrl.view.index) //(req, res) => res.send("file index 연동"))
//인덱스를 컨트롤러에 넣어서 내보냈기 때문에
router.post("/upload", upload.single("file_name"),fileCtrl.process.upload)


router.get("/list", fileCtrl.view.list)
router.get("/download/:fileName", fileCtrl.view.downlaod)
router.get("/deleteFile/:fileName", fileCtrl.process.deleteFile )
router.get("/modify_form/:fileName", fileCtrl.view.modifyForm )
//파일네임부분을 디비에서 가져와도 됨

router.post("/modify", upload.single("newFileName"),fileCtrl.process.modify)

module.exports = router;