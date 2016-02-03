(function() {
    var assert = require('assert');
    var mongoWorkSheetInst = require("../request-handler/MongoDB.js").worksheet;
    var Q = require('q');
    var extend = require('extend');
    var moment = require('moment');
    var auditWorkSheets = {
        audit: function(req, res){
            if (req && req.body) {
                var wmTarget = req.headers['wm-target'];
                if (wmTarget) {
                    var reqData = req.body;
                    var user = req.userDetails;
                    if (user && user._id) {
                        switch (wmTarget){
                            case 'WM_AUDIT':
                                var workDateValidity = Q.resolve(validateWorkDate(user._id, reqData));
                                workDateValidity.then(function(validWorkDate){
                                    if(validWorkDate && validWorkDate.workData && validWorkDate.workData.length > 0){
                                        var formatData = formatWorkData(validWorkDate.workData);
                                        res.status(200);
                                        res.json({
                                            "status": "success",
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
                                });
                            break;
                            case 'WM_SUMMARY':
                                var summaryFetched = Q.resolve(fetchWorkSheetSummary(user._id));
                                summaryFetched.then(function(validWorkDate){
                                    if(validWorkDate && validWorkDate.workData && validWorkDate.workData.length > 0){
                                        var formatData = formatWorkData(validWorkDate.workData);
                                        res.status(200);
                                        res.json({
                                            "status": "success",
                                            "results":formatData
                                        });
                                    }else{
                                        res.status(200);
                                        res.json({
                                            "status": "failure",
                                            "severity": "error",
                                            "err_msg": "Unable to fetch work summary"
                                        });
                                    }
                                });
                            break;
                        }
                    }else {
                        res.status(200);
                        res.json({
                            "status": "failure",
                            "severity": "error",
                            "err_msg": "UserId is required"
                        });
                    }
                }else {
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
                        status: datum.status,
                        hoursLogged: moment.duration(datum.hoursLogged).asHours(),
                        modifiedDate: datum.modifiedDate
                    };
                    records.push(savedWorkData);
                }

            }
        }
        return records;
    }

    function validateWorkDate(_id, dateRange) {
        var deferred = Q.defer();
        var workData = [];
        if(_id){
            var queryObj = {
                userid: _id
            };
            if(dateRange){
                if(dateRange.fromDate){
                    queryObj.workDate = {$gte:dateRange.fromDate};
                }
                if(dateRange.toDate){
                    queryObj.workDate = {$lte: dateRange.toDate};
                }
            }
            var validateDate = mongoWorkSheetInst.find(queryObj, function (err, items) {
                if (assert.equal(null, err) || (items && items.length === 0)) {
                    validateDate = false;
                } else if (items && items.length > 0) {
                    validateDate = true;
                    workData = items;
                }
                deferred.resolve({workData: workData});
            });
        }
        return deferred.promise;
    }

    function fetchWorkSheetSummary(_id){
        var deferred = Q.defer();
        var workData = [];
        if(_id){
            var queryOptions = {
                sort: ['workDate', 'desc'],
                limit: 7
            };
            var validateDate = mongoWorkSheetInst.collection.find({userid: _id}, queryOptions).toArray(function (err, items) {
                if (assert.equal(null, err) || (items && items.length === 0)) {
                    validateDate = false;
                } else if (items && items.length > 0) {
                    validateDate = true;
                    workData = items;
                }
                deferred.resolve({workData: workData});
            });
        }
        return deferred.promise;
    }
    module.exports = auditWorkSheets;
})();