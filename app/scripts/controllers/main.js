(function(app) {
    app.controller('MainController', function ($http) {
        var model = this;
        model.isLoading = true;
        model.showLogin = true;
        model.drawers = [];
        model.user = {};
        var tantanAppUrl =  'http://tantan.local:9000/';
        var tantanUrlCore = 'http://tantan.local:8585/';
        var tantanDashboard = tantanAppUrl+'#!/dashboard/';
        var tantanDrawer = tantanAppUrl+'#!/dashboard/drawers/';
        var token = '';

        function init() {
            model.showLogin = true;

            chrome.storage.local.get('token', function(dbToken){
                if(chrome.runtime.lastError){
                    return;
                }
                token = dbToken.token;

                getDrawers('').then(function successCallback(response) {
                  _.forEach(response.data, function(drawer) {
                    drawer.selected = false;
                    model.drawers.push(drawer);
                  });

                    model.showLogin = false;
                    model.isLoading = false;
                    //model.drawers = response.data;
                }, function errorCallback(response) {
                    chrome.extension.getBackgroundPage().console.log(response);
                    model.showLogin = true;
                });

                getCurrent().then(function successCallback(response) {
                    model.showLogin = false;
                    model.isLoading = false;
                    model.user = response.data;
                    var newToken = response.headers('X-TanTan-RenewalToken');
                    if(newToken !== null){
                        chrome.storage.local.set({'token': newToken}, function() {
                        });
                    }
                }, function errorCallback(response) {
                    chrome.extension.getBackgroundPage().console.log(response);
                    model.showLogin = true;
                    openLoginPage();
                });
            });

            model.addToDrawer = addToDrawer;
            model.openLoginPage = openLoginPage;
            model.goToDrawer = goToDrawer;
            model.logout = logout;
            model.goToDashboard = goToDashboard;
            model.searchDrawers = searchDrawers;

        }

        function getDrawers(term){
            return $http({
                method: 'GET',
                url: tantanUrlCore+'_api/drawers/my/0/20?term='+term,
                headers : {
                    'Authorization' : 'Token ' + token
                }
            });
        }

        var debSearchDrawers = _.debounce(getDrawers, 250, { 'trailing': true });
        function searchDrawers(){

            debSearchDrawers(model.drawerSearchTerm).then(function successCallback(response) {
                model.drawers.length = 0;
                model.drawers = response.data;
            }, function errorCallback(response) {
                chrome.extension.getBackgroundPage().console.log(response);
                model.showLogin = true;
            });
        }

        function addToDrawer(drawerId) {
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                var tab = tabs[0];
                if(drawerId === 0){
                    return;
                }
                var drawerTemp = drawerId;
                getMetas(tab.url).then(function(grab){
                    postGrabToDrawer(drawerTemp, grab.data).then(function(response){
                        var selectedDrawer = _.find(model.drawers, { id: drawerTemp});
                        selectedDrawer.selected = true;

                        var timeoutID = setTimeout(function () {
                            window.close();
                        }, 1500);
                    }, function(response){
                        chrome.extension.getBackgroundPage().console.log(response);
                    });
                });
            });
        }

        function openLoginPage() {
            chrome.tabs.create({url : tantanAppUrl+'#!/login-extension' }, function(tab){
            });
        }

        function goToDrawer(drawerId) {
            chrome.tabs.create({url : tantanDrawer+drawerId});
        }

        function goToDashboard(){
            chrome.tabs.create({url : tantanDashboard});
        }

        function logout(drawerId) {
            model.showLogin = true;
            chrome.storage.local.remove('token', function() {});
        }

        function postGrabToDrawer(drawerId, grab){
            return $http({
                method: 'POST',
                url: tantanUrlCore+'_api/drawers/'+drawerId+'/grab',
                headers : {
                    'Authorization' : 'Token ' + token
                },
                data : grab
            });
        }

        function getCurrent(){
            return $http({
                method: 'GET',
                url: tantanUrlCore+'_api/users/current',
                headers : {
                    'Authorization' : 'Token ' + token
                }
            });
        }

        function getMetas(url){
            return $http({
                method: 'GET',
                url: tantanUrlCore+'_api/data/metas?url='+url,
                headers : {
                    'Authorization' : 'Token ' + token
                }
            });
        }

        init();

    });
}(angular.module('saveToTanTan')));
