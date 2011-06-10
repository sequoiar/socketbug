#!/php -q
<?PHP  /*  >php -q server.php  */

error_reporting(E_ALL);
set_time_limit(0);
ob_implicit_flush();

/**
 * callback function 
 * @param WebSocketUser $user Current user
 * @param string $msg Data from user sent
 * @param WebSocketServer $server Server object
 */
function socketbug($user, $msg, $server)
{   
    $return = array();

	foreach($server->getUsers() as $user)
	{
		$return['data'] = array(
			'id' => $user->id,
			'ip' => $user->ip,
			'debug' => $msg
		);
    }
    
    foreach($server->getUsers() as $user)
	{
		$server->send($user->socket, json_encode($return));
    }
}

require_once 'WebSocketServer.php';
// new WebSocketServer( socket address, socket port, callback function )
$web_socket = new WebSocketServer("localhost", 8000, 'socketbug');
$web_socket->run();

?>