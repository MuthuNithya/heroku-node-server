(function() {
    var assert = require('assert');
    var mongoWorkSheetInst = require("../request-handler/MongoDB.js").worksheet;
    var Q = require('q');
    var extend = require('extend');
    var moment = require('moment');
    var createWorkSheets = {
        create: function (req, res) {
            if (req && req.body) {
                var wmTarget = req.headers['wm-target'];
                if (wmTarget) {
                    var reqData = req.body;
                    var user = req.userDetails;
                    if (user && user._id && reqData.workDate) {
                        var workDateValidity = Q.resolve(validateWorkDate(user._id, reqData.workDate));
                        workDateValidity.then(function(validWorkDate){
                            if (validWorkDate || (!validWorkDate && wmTarget === 'WM_UPDATE')) {
                                var workDataValid = validateWorkData(reqData.workData, {workDate:reqData.workDate, userid:user._id});
                                if (workDataValid && workDataValid.isValidData && workDataValid.data) {
                                    var workDataObj = {
                                        userid: user._id,
                                        status: reqData.status,
                                        workDate: reqData.workDate,
                                        workData: workDataValid.data,
                                        hoursLogged: workDataValid.hoursLogged,
                                        modifiedDate: moment.utc().valueOf()
                                    };
                                    var workDataSaved = mongoWorkSheetInst(workDataObj);
                                    switch (wmTarget){
                                        case "WM_CREATE":
                                            workDataSaved.save([workDataObj], function(err, result){
                                                createUpdateCallBack(err, result, res);
                                            });
                                            break;
                                        case "WM_UPDATE":
                                            workDataSaved.collection.replaceOne({userid: user._id, workDate: reqData.workDate}, workDataObj, function(err, result){
                                                createUpdateCallBack(err, result, res);
                                            });
                                            break;
                                    }
                                } else {
                                    res.status(200);
                                    res.json({
                                        "status": "failure",
                                        "severity": "error",
                                        "err_msg": "Worksheet has invalid data"
                                    });
                                }
                            } else {
                                res.status(200);
                                res.json({
                                    "status": "failure",
                                    "severity": "error",
                                    "err_msg": "Worksheet for " + moment(reqData.workDate).format('MM-DD-YYYY') + " already exists."
                                });
                            }
                        });
                    } else {
                        res.status(200);
                        res.json({
                            "status": "failure",
                            "severity": "error",
                            "err_msg": "Date is required"
                        });
                    }
                } else {
                    res.status(200);
                    res.json({
                        "status": "failure",
                        "severity": "error",
                        "err_msg": "Service Target is required"
                    });
                }
            }
        }
    };
    function createUpdateCallBack(err, result, res){
        if (!assert.equal(null, err)) {
            res.status(200);
            res.json({
                "status": 200,
                "message": "Data Saved Successfully"
            });
        } else if (err) {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Data Save Error"
            });
        }
    }
    function validateWorkDate(_id, date) {
        var isValidDate = false;
        var deferred = Q.defer();
        var validateDate = mongoWorkSheetInst.find({userid: _id, workDate: date}, function (err, items) {
            if (assert.equal(null, err) || (items && items.length === 0)) {
                validateDate = true;
            } else if (items && items.length > 0) {
                validateDate = false;
            }
            deferred.resolve(validateDate);
        });
        return deferred.promise;
    }

    function sortWorkData(data) {
        if (data && data.length > 0) {
            data.sort(function (a, b) {
                return a.fromTime > b.fromTime;
            });
        }
        return data;
    }

    function validateWorkData(data, _dataConfigObj) {
        var isValidData = true;
        var dataConfigObject = {};
        var hoursLogged = 0;
        if(_dataConfigObj){
            dataConfigObject = _dataConfigObj;
        }
        if (data && data.length > 0) {
            data = sortWorkData(data);
            var prevToTime = 0;
            for (var indx = 0; indx < data.length; indx++) {
                if (isValidData) {
                    var workData = data[indx];
                    var prevWorkData = data[indx - 1];
                    if (workData) {
                        if (workData.fromTime && workData.toTime && workData.description && workData.fromTime < workData.toTime && workData.description.length > 0) {
                            if (workData.fromTime >= prevToTime) {
                                prevToTime = workData.fromTime;
                                var duration = workData.toTime - workData.fromTime;
                                hoursLogged = hoursLogged + moment.duration(duration);
                                //extend(true, data[indx], dataConfigObject);
                            } else {
                                isValidData = false;
                            }
                        } else {
                            isValidData = false;
                        }
                    }
                } else {
                    break;
                }

            }
        }
        return {isValidData:isValidData, data: data, hoursLogged: hoursLogged};
    }

    module.exports = createWorkSheets;
})();