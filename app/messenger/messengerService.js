/*global app*/
/*global log*/
/*global $*/
app.service('mService', ['$rootScope', 'httpFacade', 'AppStore', function ($rootScope, httpFacade, AppStore) {
    'use strict';
    var self = this,
        inbox = {};
    function vSend(id, str) {
        log(id, str);
        var date = new Date(),
            msg = {
                to: id,
                from: self.from,
                name: self.name,
                body: str
            };
        httpFacade.postMessage($.param(msg)).then(function (res) {
            msg.sent = true;
            msg.status = res.data;
            inbox[id].thread.push(msg);
            log(inbox);
            $rootScope.$broadcast('MESSAGE_SENT');
        });
    }
    function uSend() {}
    if (AppStore.isToken()) {
        self.send = uSend;
        httpFacade.getMessages('id=' + AppStore.getUserId()).then(function (res) {
            log(res.data);
        });
    } else {
        self.send = vSend;
    }
    self.setup = function (email, fname, id, name) {
        self.from = email;
        self.name = name;
        if (typeof inbox[id] === 'undefined') {
            inbox[id] = {
                name: name,
                id: id,
                thread: []
            };
        } else {
            $rootScope.$broadcast('NEW_MESSAGE');
        }
    };
    self.getInbox = function () {
        return JSON.parse(JSON.stringify(inbox));
    };
}]);