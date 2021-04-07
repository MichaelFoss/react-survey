<?php

/**
 * CAUTION: Only uncomment the following line for testing;
 * allowing for submissions from any source can result
 * in an insecure server!
 */

// header('Access-Control-Allow-Origin: *');

$filename = 'submissions.txt';

$ip = $_SERVER['REMOTE_ADDR'];
$postData = file_get_contents('php://input');
$data = json_decode($postData);
if (!$data) {
    print_r($postData);
    exit('no data');
}

$items = '';
foreach ($data['items'] as $item) {
    $items .= <<<HEREDOC
{$itemNumber}.
  Q: {$item->question}
  A: {$item->answer}


HEREDOC;
}

$contents = <<<HEREDOC
------------------------------------
IP Address: {$ip}

Submissions:

{$items}
HEREDOC;

if (!file_put_contents($filename, $contents, FILE_APPEND)) {
    header("HTTP/1.1 500 Internal Server Error");
    echo "Could not save survey.";
}
