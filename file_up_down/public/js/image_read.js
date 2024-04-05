<script>
    const readURL = (input) => {
        console.log(input)
        console.log(input.files[0])
        const file = input.files[0];
        if(file != ""){
            let reader = new fileReader();
            reader.readAsDaraURL(file)
            reader.onload = (e) => {
                console.log("e.target : ", e.target.result);
                document.getElementByID("img").src = e.target.result;
            }
        }
    }
</script>