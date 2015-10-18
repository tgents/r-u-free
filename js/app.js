var app = angular.module("ListApp", ["firebase"]);

app.controller("AuthController", ["$scope", "$firebaseAuth", function($scope, $firebaseAuth) {
        var ref = new Firebase("https://rufree.firebaseio.com");
        $scope.authObj = $firebaseAuth(ref);

        $scope.login = function(){
            $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
                $scope.authData = authData;
                console.log(authData);
                document.getElementById("login").style.visibility = "hidden";
                document.getElementById("overlay").style.display = "none";
                $scope.addUser();
            }).catch(function(error) {
                $scope.error = error;
                console.log(error);
            });
        }

        $scope.addUser = function(){
            var newUser = ref.child("users");
            newUser.set({
                logid: $scope.authData.uid,
                name: $scope.authData.facebook.displayName
            });
        }
    }
]);

app.controller("ListController", ["$firebaseObject",
    function($firebaseObject) {
        var ref = new Firebase("https://rufree.firebaseio.com");
        $scope.profile = $firebaseObject(ref.child('profiles').child('phsyicsmarie'));
    }
]);