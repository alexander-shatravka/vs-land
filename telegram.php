<?php
    // $service = $_POST['service'] ? $_POST['service'] : 'не указано';
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    // $email = $_POST['email'];
    $service = $_POST['service'];
    // $file = $_POST['file'];

    $token = "1245666893:AAG0dKYlA3ekDdCfwt7W4EETe4Kca0Akmzk";
    $chat_id = "-473060733";

    $arr = array(
        'услуга: ' => $service,
        'имя: ' => $name,
        'телефон: ' => $phone,
        // 'почта: ' => $email,
        //'сообщение: ' => $message,
        // 'файл: ' => $file
    );

    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

    //var_dump($txt);
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
?>