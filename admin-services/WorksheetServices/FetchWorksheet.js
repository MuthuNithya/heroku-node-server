(function() {
    var assert = require('assert');
    var mongoWorkSheetInst = require("../request-handler/MongoDB.js").worksheet;
    var Q = require('q');
    var extend = require('extend');
    var moment = require('moment');
    var fetchWorkSheets = {
        fetch: function (req, res) {
            if (req && req.body) {
                var wmTarget = req.headers['wm-target'];
                if (wmTarget === "WM_FETCH") {
                    var reqData = req.body;
                    var user = req.userDetails;
                    if (user && user._id && reqData.workDate) {
                        var workDateValidity = Q.resolve(validateWorkDate(user._id, reqData.workDate));
                        workDateValidity.then(function(validWorkDate){
                            if (validWorkDate.isValidDate) {
                                if(validWorkDate.workData && validWorkDate.workData.length > 0){
                                    var formatData = formatWorkData(validWorkDate.workData);
                                    res.status(200);
                                    res.json({
                                        "results":formatData
                                    });
                                }else{
                                    res.status(200);
                                    res.json({
                                        "status": "failure",
                                        "severity": "error",
                                        "err_msg": "Worksheet for " + moment(reqData.workDate).format('MM-DD-YYYY') + "has no data."
                                    });
                                }
                            } else {
                                res.status(200);
                                res.json({
                                    "status": "failure",
                                    "severity": "error",
                                    "err_msg": "Worksheet for " + moment(reqData.workDate).format('MM-DD-YYYY') + " does not exist."
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

    function formatWorkData(data){
        var records = [];
        if(data && data.length > 0){
            for(var indx=0; indx < data.length; indx++){
                var datum = data[indx];
                if(datum) {
                    var savedWorkData = {
                        workDate: datum.workDate,
                        workData: datum.workData
                    };
                    records.push(savedWorkData);
                }

            }
        }
        return records;
    }
    function validateWorkDate(_id, date) {
        var deferred = Q.defer();
        var workData = [];
        var validateDate = mongoWorkSheetInst.find({userid: _id, workDate: date}, function (err, items) {
            if (assert.equal(null, err) || (items && items.length === 0)) {
                validateDate = false;
            } else if (items && items.length > 0) {
                validateDate = true;
                workData = items;
            }
            deferred.resolve({isValidDate:validateDate, workData: workData});
        });
        return deferred.promise;
    }

    module.exports = fetchWorkSheets;
})();