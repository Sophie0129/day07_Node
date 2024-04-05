const fs = require("fs");
const view = {
    index : (req, res) => {
        console.log("controller index 연동");
        res.render( "file_index" );
    },
    list : (req, res) => {
        let fList;
        /*
        fs.readdir("./upload_file", (fList)=>{

        })
        */
        fList = fs.readdirSync("./upload_file");
        res.render("file_list", { list : fList });
    },
    download : (req, res) => {
        const path = `./upload_file/${req.params.fileName}`;
        res.download( path );
    },
    modifyForm : (req, res) =>{
        const fileName = req.params.fileName;
        res.render("modify_form", {fileName});
    }
}
const process = {
    upload : (req, res)=>{
        console.log( req.file )
        console.log("=========")
        console.log( req.body )
        console.log("validation : ", req.fileValidation )
        if( req.fileValidation ){
            return res.send( req.fileValidation );
        }
       
        res.send("연동");
    },
    deleteFile : (req, res) => {
        fs.unlinkSync( "./upload_file/"+req.params.fileName );
        res.redirect("/file/list");
    },
    modify : (req, res) => {
        console.log( 'req.file : ', req.file )
        if( req.file ){ //파일을 변경했다면
return res.redirect(`/file/deleteFile/${req.body.originFileName}`);
        }
        res.redirect("/file/list");
    }
}

module.exports = { view , process };