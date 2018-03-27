/*global app*/
/*global log*/
/*global $*/
app.service('mService', ['$rootScope', 'httpFacade', 'AppStore', function ($rootScope, httpFacade, AppStore) {
    'use strict';
    var self = this,
        inbox = {},
        loaded = false;
    function getInbox(inb) {
        self.ids = [];
        inb.forEach(function (x) {
            self.ids[x.id] = x.tid;
        });
        return inb;
    }
    self.getInbox = function () {
        return JSON.parse(JSON.stringify(inbox));
    };
    function requestThread(tid, t) {
        httpFacade.getMessages($.param({id: tid})).then(function (res) {
            var id = 0, note = 0;
            inbox.forEach(function (x) {
                if (x.seen === false) {
                    note += 1;
                }
                if (x.tid === tid) {
                    id = x.id;
                    x.thread = res.data;
                }
            });
            $rootScope.$broadcast('NOTIFY', note);
            if (typeof t !== 'undefined' && t === true) {
                $rootScope.$broadcast('THREAD', [id, tid]);
            } else {
                if (self.count === 0) {
                    $rootScope.$broadcast('INBOX');
                }
                self.count -= 1;
            }
        });
    }
    function init() {
        httpFacade.getMessages().then(function (res) {
            inbox = res.data;
            self.count = -1;
            inbox = getInbox(res.data);
            inbox.forEach(function (x) {
                self.count += 1;
                requestThread(x.tid, false);
            });
            loaded = true;
        });
    }
    self.init = function (x) {
        if (typeof x !== 'undefined') {
            init();
        } else if (loaded) {
            $rootScope.$broadcast('INBOX');
        } else {
            init();
        }
    };
    self.requestThread = function (id) {
        requestThread(id, true);
    };
    self.send = function (id, body, tid) {
        var param = {id: id, body: body};
        if (typeof tid !== 'undefined') {
            param.tid = tid;
        }
        httpFacade.postMessage($.param(param)).then(function (res, headers) {
            if (res.status === 201) {
                init();
            } else {
                inbox.forEach(function (x) {
                    if (x.id === Number.parseInt(id)) {
                        x.thread.push({body: body, date: res.data, sent: true});
                        self.count = 0;
                        requestThread(param.tid, false);
                    }
                });
            }
        }, function (err) {
            //TODO error posting message
        });
    };
    self.setOpened = function (tid) {
        inbox.forEach(function (x) {
            if (x.tid === tid && x.seen === false) {
                x.seen = true;
                httpFacade.putMessage($.param({tid: tid})).then(function (res) {
                    log(res.data);
                });
            }
        });
    };
}]);
