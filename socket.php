<?php
	$_POST  = json_decode(file_get_contents("php://input"),true);
	
	$open_     = isset($_POST ['open']) ?    $_POST ['open']     : "0"; // 设备 1-2
	$index_    = isset($_POST['index']) ?    $_POST['index']     : "0"; // 播放序号 1-8
	$status_   = isset($_POST['status']) ?   $_POST['status']    : "-"; // 播放状态 0播放 1 暂停  
	
	echo $_POST ['open'];
	
	if($open_ == 1){
		echo $_POST ['open'].'第一个设备播放';	 
		// 创建一个socket套接流
 		$socket = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
		/****************设置socket连接选项，这两个步骤你可以省略*************/
		 // 接收套接流的最大超时时间1秒，后面是微秒单位超时时间，设置为零，表示不管它
		socket_set_option($socket, SOL_SOCKET, SO_RCVTIMEO, array("sec" => 1, "usec" => 0));
		 // 发送套接流的最大超时时间为6秒
		socket_set_option($socket, SOL_SOCKET, SO_SNDTIMEO, array("sec" => 6, "usec" => 0));
		/****************设置socket连接选项，这两个步骤你可以省略*************/

		// 连接服务端的套接流，这一步就是使客户端与服务器端的套接流建立联系
		if(socket_connect($socket,'192.168.1.102',8080) == false){
			echo 'connect fail massege:'.socket_strerror(socket_last_error());
		}else{
			$message = $index_. ',' .$status_;
			// 转为GBK编码，处理乱码问题，这要看你的编码情况而定，每个人的编码都不同
			$message = mb_convert_encoding($message,'GBK','UTF-8');
			// 向服务端写入字符串信息

			if(socket_write($socket,$message,strlen($message)) == false){
				echo 'fail to write'.socket_strerror(socket_last_error());
			}else{
				echo 'client write success'.PHP_EOL;
				// 读取服务端返回来的套接流信息
				$callback = socket_read($socket,1024);
				echo 'server return message is:'.PHP_EOL.$callback;	
			}
		}
		 socket_close($socket);//工作完毕，关闭套接流
	}
	else if($open_ == 2){
		echo $_POST ['open'].'第二个设备播放';
		// 创建一个socket套接流
 		$socket = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
		/****************设置socket连接选项，这两个步骤你可以省略*************/
		 // 接收套接流的最大超时时间1秒，后面是微秒单位超时时间，设置为零，表示不管它
		socket_set_option($socket, SOL_SOCKET, SO_RCVTIMEO, array("sec" => 1, "usec" => 0));
		 // 发送套接流的最大超时时间为6秒
		socket_set_option($socket, SOL_SOCKET, SO_SNDTIMEO, array("sec" => 6, "usec" => 0));
		/****************设置socket连接选项，这两个步骤你可以省略*************/

		// 连接服务端的套接流，这一步就是使客户端与服务器端的套接流建立联系
		if(socket_connect($socket,'192.168.2.221',8080) == false){
			echo 'connect fail massege:'.socket_strerror(socket_last_error());
		}else{
			$message = $index_. ',' .$status_;
			// 转为GBK编码，处理乱码问题，这要看你的编码情况而定，每个人的编码都不同
			$message = mb_convert_encoding($message,'GBK','UTF-8');
			// 向服务端写入字符串信息

			if(socket_write($socket,$message,strlen($message)) == false){
				echo 'fail to write'.socket_strerror(socket_last_error());
			}else{
				echo 'client write success'.PHP_EOL;
				// 读取服务端返回来的套接流信息
				$callback = socket_read($socket,1024);
				echo 'server return message is:'.PHP_EOL.$callback;	
			}
		}
		socket_close($socket);//工作完毕，关闭套接流
	}

?>