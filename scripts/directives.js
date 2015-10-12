'use strict';

define([], function () {

    var directives = {};

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
            link:function(scope, ele){
                ele.children().on('click', function(){
                    ele.addClass('focus').find('input')[0].focus();
                });

                ele.find('button').on('click', function(){
                    ele.removeClass('focus');
                })
            }
        }
    };
    directives.searchList = function ($location) {
        return {
            restrict: 'E',
            template: '<ul class="ui-list ui-list-text ui-list-link ui-border-b"><li class="ui-border-b" data-citycode="{{city.citycode}}" ng-repeat="city in vm.citys">{{city.cityname}}</li></ul>',
            replace: true,
            transclude:true,
            link:function(scope, ele, attr){
                ele.on('click', function(ev){
                    console.log(attr.gotourl);
                    $location.path(attr.gotourl)
                })
            }
        }
    };

    return directives;
});

