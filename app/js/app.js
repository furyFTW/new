var app = angular.module('app', ['angular-loading-bar'])
    .config(function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    })
    .controller('appController', ['$scope', 'similarWeb', 'cfpLoadingBar', function ($scope, similarWeb, cfpLoadingBar) {
        $scope.show = {
            'info': true,
            'error': true
        };
        $scope.search = function (site) {
            $scope.site = site;
            cfpLoadingBar.start();
            similarWeb.search(site).then(
                function (data) {
                    cfpLoadingBar.complete();
                    $scope.show = {
                        'info': false,
                        'error': true
                    };
                    $scope.SimilarSites = data.SimilarSites;
                    $scope.data = data;
                    $scope.urlChoose = site;
                    window.scrollTo(0, 0)
                }, function () {
                    $scope.show = {
                        'info': true,
                        'error': false
                    };
                });
        }
    }])
    .factory('similarWeb', ['$q', '$http', function ($q, $http) {
        var similarWeb = {},
            userKey = 'a6fd04d833f2c28ce7c30dc957bf481e';
        similarWeb.search = function (site) {
            var defer = $q.defer();
            $http.get('http://api.similarweb.com/site/' + site + '/rankoverview?userkey=' + userKey + '&format=json').then(
                function (data) {
                    document.getElementById('site').src = 'http://' + site;// iframe src add
                    defer.resolve(data.data);
                },
                function () {
                    angular.element('.search').trigger('focus');
                    defer.reject('error');
                }
            );
            return defer.promise;
        };
        return similarWeb;
    }]
);
