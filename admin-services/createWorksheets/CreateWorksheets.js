(function() {
    var assert = require('assert');
    var mongoWorkSheetInst = require("../request-handler/MongoDB.js").worksheet;
    var Q = require('q');
    var createWorkSheets = {
        create: function (req, res) {
            if (req && req.body) {
                var wmTarget = req.headers['WM-TARGET'];
                if (wmTarget === "WM_CREATE") {
                    var reqData = req.body;
                    var user = reqData.userDetails;
                    if (user && user._id && reqData.workDate) {
                        var validWorkDate = validateWorkDate(user._id, reqData.workDate);
                        if (validWorkDate) {
                            var workDataValid = validateWorkData(reqData.workData);
                            if (workDataValid) {
                                var workDataSaved = mongoWorkSheetInst(reqData);
                                workDataSaved.save([req], function (err, result) {
                                    if (!assert.equal(null, err)) {
                                        res.json(200);
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
                                });
                            } else {
                                res.json(200);
                                res.json({
                                    "status": "failure",
                                    "severity": "error",
                                    "err_msg": "Worksheet has invalid data"
                                });
                            }
                        } else {
                            res.json(200);
                            res.json({
                                "status": "failure",
                                "severity": "error",
                                "err_msg": "Worksheet for " + reqData.workDate + " already exists. Cannot create new"
                            });
                        }
                    } else {
                        res.json(200);
                        res.json({
                            "status": "failure",
                            "severity": "error",
                            "err_msg": "Date is required"
                        });
                    }
                } else {
                    res.json(200);
                    res.json({
                        "status": "failure",
                        "severity": "error",
                        "err_msg": "Service Target is required"
                    });
                }
            }
        }
    };

    function validateWorkDate(_id, date) {
        var isValidDate = false;
        var validateDate = mongoWorkSheetInst.find({userId: _id, workDate: date}, function (err, items) {
            if (assert.equal(null, err)) {
                isValidDate = true;
            } else if (items && items.length > 0) {
                isValidDate = false;
            }
        });
        var afterValidation = Q.all([validateDate]);
        afterValidation.then(function (data) {
            return isValidDate;
        });
    }

    function sortWorkData(data) {
        if (data && data.length > 0) {
            data.sort(function (a, b) {
                return a.fromTime < b.fromTime;
            });
        }
    }

    function validateWorkData(data) {
        var isValidData = false;
        if (data && data.length > 0) {
            sortWorkData(data);
            var prevToTime = 0;
            for (var indx = 0; indx < data.length; indx) {
                if (!isValidData) {
                    var workData = data[indx];
                    var prevWorkData = data[indx - 1];
                    if (workData) {
                        if (workData.fromTime && workData.toTime && workData.description && workData.fromTime < workData.toTime && workData.description.length > 0) {
                            if (workData.fromTime > prevToTime) {
                                prevToTime = workData.fromTime;
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
        return isValidData;
    }

    module.exports(createWorkSheets);
})();