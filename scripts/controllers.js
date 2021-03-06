/* Controllers */


// 支付首页
function ConfirmPay1Ctrl(HttpService, $localStorage) {

    var vm = this;

    var userData = $localStorage.userData = getUrlData();

    vm.sub_title = '融数支付';
    vm.account_money = userData.amount;
    vm.account_another = userData.another || '融数支付';
    vm.account_number = userData.userorderid || '';
    vm.certificatenumber = '';

    delete $localStorage.bindingData;
    delete $localStorage.accountinfoData;
    delete $localStorage.city;
    delete $localStorage.province;

    CheckSignOrder();

    function CheckSignOrder() { //数据校验
        HttpService({
            url: 'http://192.168.60.34:8080/rsjf-mobpay/CheckSignOrder',
            data: {
                jsonParam: userData.ordertime + userData.productid + userData.rootinstcd + userData.userid + userData.userorderid + userData.userrelateid + userData.amount + userData.unitprice,
                productid: userData.productid,
                rootinstcd: userData.rootinstcd
            }
        }).then(function (data) {
            if (data.data.result === 'ok') {
                orderoper()
            } else {
                console.log('error')
            }
        })
    }

    function orderoper() {//新增业务订单
        HttpService({
            url: 'http://192.168.60.34:8080/rsjf-mobpay/orderoper',
            data: {
                userid: userData.userid,
                constid: userData.rootinstcd,
                ordertypeid: 'B',
                productid: userData.productid,
                opertype: '1',
                orderdate: userData.ordertime,
                ordertime: userData.ordertime,
                userorderid: userData.userorderid,
                amount: userData.amount
            }
        }).then(function (data) {
            if (data.data.result === 'ok') {
                accountinfoquery()
            } else {
                console.log('error')
            }
        })
    }

    function accountinfoquery() { //获取订单信息
        HttpService({
            url: 'http://192.168.60.34:8080/rsjf-mobpay/accountinfoquery',
            data: {
                userid: userData.userid,
                usertype: '2',
                constid: userData.rootinstcd,
                productid: userData.productid,
                objorlist: '1'
            }
        }).then(function (data) {
            if (data.data.result === 'ok') {
                data = data.data.data.wheatfield_accountinfo_query_response.accountinfos.accountinfo[0];
                vm.bankheadname = data.bankheadname;

                vm.certificatenumber = data.bankheadname + '(尾号' + data.certificatenumber.match(/\d{4}$/) + ')';
                localStorage.setItem('accountinfoData', JSON.stringify(data));
            } else {
                console.log('error')
            }
        })
    }

    function getUrlData() {
        var urlDataArr = decodeURI(location.href.split('?')[1]).split('&');
        var userData = {};

        for (var i = 0; i < urlDataArr.length; i++) {
            var data = urlDataArr[i].split('=');
            userData[data[0]] = data[1];
        }
        //location.href=location.href.split('?')[0];
        return userData;
    }

};

//绑卡页
function BindCtrl($scope, $localStorage, $location, HttpService) {
    var vm = this;
    vm.userData = $localStorage.userData;

    vm.sub_title = '绑定银行卡';

    vm.certificatetype = [
        {
            name: '身份证',
            code: '1'
        }
    ];

    if($localStorage.bindingData){
        for(var i=0;i<vm.certificatetype.length;i++){
            if(vm.certificatetype[i].code==$localStorage.bindingData.certificatetype){
                vm.certificatetypeVal=vm.certificatetype[i];
                break;
            }
        }
    }else{
        vm.certificatetypeVal=vm.certificatetype[0];
    }


    // 获取总行信息
    HttpService({
        url: 'http://192.168.60.34:8080/rsjf-mobpay/bindingCardQuery',
        data: {}
    }).then(function (data) {
        if (data.data.result === 'ok') {
            vm.bankhead = data.data.data.wheatfield_bankn_query_response.bankinfos.bankinfo;
        } else {
            console.log('error')
        }
    });
    vm.bankheadVal = null;

    //监听总行变化，清空支付信息
    $scope.$watch('vm.bankheadVal', function () {
        vm.bankbranchVal = null;

        if (vm.bankheadVal) {
            HttpService({
                url: 'http://192.168.60.34:8080/rsjf-mobpay/bindingCardQuery',
                data: {
                    bankcode: vm.bankheadVal.bankcode
                }
            }).then(function (data) {
                if (data.data.result === 'ok') {
                    console.log(data.data.data.wheatfield_bankn_query_response.bankinfos.bankinfo);
                    vm.bankbranch = data.data.data.wheatfield_bankn_query_response.bankinfos.bankinfo;
                } else {
                    console.log('error')
                }
            });
        } else {
            console.log(2)
        }

    });

    vm.city = $localStorage.city||{
            cityname:'请选择省'
        };
    vm.province = $localStorage.province||{
            cityname:'请选择市'
        };
    vm.bindingData = $localStorage.bindingData||{
        "accountname": '',
        "accountnumber": '',
        "certificatetype": '',
        "certificatename": '',
        "certificatenumnumber": '',
        "bankheadname": '',
        "bankcode": '',
        "bankprovince": '',
        "provincecode": '',
        "bankcity": '',
        "citycode": ''
    };
    vm.agreement=true;

    vm.goProvinceList = function () {
        vm.bindingData.certificatetype=vm.certificatetypeVal.code;
        vm.bindingData.certificatename=vm.certificatetypeVal.name;
        $localStorage.bindingData = vm.bindingData;
        $location.path('/cityList')
    }
}
//付款页
function ConfirmPay2Ctrl($localStorage) {
    var vm = this;
    var userData = $localStorage.userData;

    vm.sub_title = '整数支付';
    vm.account_money = userData.amount;
}
//市列表
function provinceListCtrl(HttpService, $scope, $localStorage) {
    var vm = this;

    vm.sub_title = '选择所在市';
    vm.cityAll = [];
    vm.citys = [];
    vm.keyword = '';

    HttpService({
        url: 'http://192.168.60.34:8080/rsjf-mobpay/cityQuery',
        data: {
            citycode: $localStorage.city.citycode
        }
    }).then(function (data) {
        if (data.data.result === 'ok') {
            vm.citys = vm.cityAll = data.data.data.wheatfield_city_query_response.citycodes.citycode;
        } else {
            console.log('error')
        }
    });

    $scope.$watch('vm.keyword', function () {
        vm.keyword = vm.keyword.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '');
        var re = new RegExp(vm.keyword);
        vm.citys = [];

        angular.forEach(vm.cityAll, function (city) {
            if (city.cityname.search(re) != -1) {
                vm.citys.push(city);
            }
        })
    })
}
//省列表
function cityListCtrl(HttpService, $scope, $localStorage) {
    var vm = this;

    vm.sub_title = '选择所在省';
    vm.cityAll = [];
    vm.citys = [];
    vm.keyword = '';

    HttpService({
        url: 'http://192.168.60.34:8080/rsjf-mobpay/cityQuery',
        data: {}
    }).then(function (data) {
        if (data.data.result === 'ok') {
            vm.citys = vm.cityAll = data.data.data.wheatfield_city_query_response.citycodes.citycode.slice(1);
        } else {
            console.log('error')
        }
    });


    $scope.$watch('vm.keyword', function () {
        vm.keyword = vm.keyword.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '');
        vm.citys = [];
        var re = new RegExp(vm.keyword);

        angular.forEach(vm.cityAll, function (city) {
            if (city.cityname.search(re) != -1) {
                vm.citys.push(city);
            }
        })
    })
}

//用户协议
function AgreementCtrl() {
    var vm = this;

    vm.sub_title = '融数金服支付用户服务协议'
}

//设置支付密码
function SetPasswordCtrl() {
    var vm = this;
    vm.sub_title = '融数金服';

    vm.setPassword='';
    vm.rePassword='';
}

//付款结果
function PayResultCtrl() {
    var vm = this;

    vm.sub_title = '融数金服'
}

//付款结果详情
function PayResultInfoCtrl() {
    var vm = this;

    vm.sub_title = '融数金服'
}

//银行卡详情
function CardInfoCtrl() {
    var vm = this;

    vm.sub_title = '融数金服'
}