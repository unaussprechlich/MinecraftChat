/**
 * Connect Controller
 */

module.exports = function($scope, socket, servers) {

  $scope.servers = servers.get();
  $scope.version = "1.10";

  $scope.select = function(id) {
    $scope.ip   = servers.select(id).ip;
    $scope.port = servers.select(id).port;
    $scope.version = servers.select(id).version;

    if ($scope.username.length > 0 && $scope.password.length > 0 ) {
      $scope.connect();
    }
  };

  // connect handler
  $scope.connect = function() {
    $('#connectModal').modal('hide');

    if (socket.connected) {

      if($scope.username_password.length > 0){
          $scope.username = $scope.username_password.substr(0, $scope.username_password.indexOf(":"));
          $scope.password = $scope.username_password.substr($scope.username_password.indexOf(":") + 1);
          $scope.username_password = "";
      }

      socket.emit('server:connect', {
        username: $scope.username,
        password: $scope.password,
        hostname: $scope.ip || "hypixel.net",
        port: $scope.port || 25565,
        version: $scope.version || "1.10"
      });

    } else {
      alert('Server unreachable, please try again later...');
    }
  };

  $scope.selectversion = function(version){
    $scope.version=version;
  }

};
