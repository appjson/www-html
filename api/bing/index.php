<?php
// error_reporting(0);
$path=date('Ym');
if (!file_exists($path)) {
    mkdir($path, 0777);
}
$last = strtotime("-1 month", time());
$last_month = date("Ym", $last);//上个月
if (file_exists($last_month)) {
    deleteDir($last_month);
}
$pathurl = $path.'/'.date('d').'.jpg';
if (!is_file($pathurl)) {  
    $str=file_get_contents('http://cn.bing.com/HPImageArchive.aspx?idx=0&n=1');
    if (preg_match("/<urlBase>(.+?)<\/urlBase>/ies", $str, $matches)) {
        $imgurl='http://cn.bing.com'.$matches[1].'_1920x1080.jpg';
        copy($imgurl, $pathurl);
    } else {
        copy('https://dl.ryzenx.com/files/win10pic1.jpg', $pathurl);
    }
}
if ($pathurl) {
    header('Content-Type: image/jpeg');
    header("Cache-Control: no-store, no-cache, must-revalidate");//强制不缓存
    header("Pragma: no-cache");//禁止本页被缓存
    @ob_end_clean();
    @readfile($pathurl);
    @flush();
    @ob_flush();
    exit();
} else {
    exit('error');
}
function deleteDir($path_e) {
    if (is_dir($path_e)) {
        //扫描一个目录内的所有目录和文件并返回数组
        $dirs = scandir($path_e);
        foreach ($dirs as $dir) {
            //排除目录中的当前目录(.)和上一级目录(..)
            if ($dir != '.' && $dir != '..') {
                //如果是目录则递归子目录，继续操作
                $sonDir = $path_e.'/'.$dir;
                if (is_dir($sonDir)) {
                    //递归删除
                    deleteDir($sonDir);
                    //目录内的子目录和文件删除后删除空目录
                    @rmdir($sonDir);
                } else {
                    //如果是文件直接删除
                    @unlink($sonDir);
                }
            }
        }
        @rmdir($path_e);
    }
}
?>