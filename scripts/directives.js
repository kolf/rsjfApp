'use strict';

define([], function () {

    var directives = {};

    //搜索条
    directives.searchBar = function () {
        return {
            restrict: 'E',
            template: '<div class="ui-searchbar-wrap ui-border-b">' +
            '<div class="ui-searchbar ui-border-radius">' +
            '<i class="ui-icon-search"></i>' +
            '<div class="ui-searchbar-text">请输入关健字</div>' +
            '<div class="ui-searchbar-input"><input ng-model="vm.keyword" type="text" placeholder="请输入关健字" autocapitalize="off"></div>' +
            '<i class="ui-icon-close"></i>' +
            '</div>' +
            '<button class="ui-searchbar-cancel">取消</button>' +
            '</div>',
            replace: true,
            link: function (scope, ele) {
                ele.children().on('click', function () {
                    ele.addClass('focus').find('input')[0].focus();
                });

                ele.find('button').on('click', function () {
                    ele.removeClass('focus');
                })
            }
        }
    };
    //搜索列表
    directives.searchList = function ($location, $timeout, $localStorage) {
        return {
            restrict: 'E',
            template: '<ul class="ui-list ui-list-text ui-list-link ui-border-b"><li class="ui-border-b" data-citycode="{{city.citycode}}" ng-repeat="city in vm.citys">{{city.cityname}}</li></ul>',
            replace: true,
            link: function (scope, ele, attr) {
                ele.on('click', function (ev) {
                    var _this = ev.target;
                    //console.log(attr.gotourl);
                    if (attr.gotourl == '/provinceList') {
                        $localStorage.city = {
                            citycode: _this.dataset.citycode,
                            cityname: _this.innerHTML
                        };
                    }
                    if (attr.gotourl == '/bind') {
                        $localStorage.province = {
                            citycode: _this.dataset.citycode,
                            cityname: _this.innerHTML
                        };
                    }
                    $timeout(function () {
                        $location.path(attr.gotourl);
                    }, 0)
                })
            }
        }
    };
    //密码输入框
    directives.payInput = function ($timeout) {
        return {
            restrict: 'E',
            template: '<div class="pay-input">' +
            '<ul class="ui-tiled ">' +
            '<li ng-class="{active:vm.val.length>=1}"></li>' +
            '<li ng-class="{active:vm.val.length>=2}"></li>' +
            '<li ng-class="{active:vm.val.length>=3}"></li>' +
            '<li ng-class="{active:vm.val.length>=4}"></li>' +
            '<li ng-class="{active:vm.val.length>=5}"></li>' +
            '<li ng-class="{active:vm.val.length>=6}"></li>' +
            '</ul>' +
            '<input type="tel" maxlength="6" ng-model="vm.val" />' +
            '</div>',
            scope: {
                //val:'='
            },
            replace: true
        }
    };//设置密码
    directives.setPassword = function ($timeout) {
        return {
            restrict: 'E',
            require: '^payInput',
            scope: {
                //val:'='
            },
            link: function (scope, ele, attrs) {

            }
        }
    };


    return directives;
});

