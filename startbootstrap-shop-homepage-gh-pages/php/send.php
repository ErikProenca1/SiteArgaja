<?php 

if(isset($_POST['submit'])){
    $produto = $_POST['produto'];
    header("https://api.whatsapp.com/send?phone=5511953116196&text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20or%C3%A7amento%$produto");

}else{
    echo "
    <script>
    window.location=history.go(-1);
    </script>
    "
}


?>