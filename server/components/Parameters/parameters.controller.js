const { param } = require('../../router/router');
const { ParametersModel } = require('./Parameters.schema');

class Parameters{
  
  async getParams(req, res){
    try {
      let devicetype = req.query.devicetype;
      let data = await ParametersModel.find({devicetype: devicetype});
      return res.send(data);   
    } catch (error) {
      console.log("Error : ", error);
      res.status(400).send(new Error(error.message));
    }
  }
 
  async addParam(req, res){
    try {
      let body = req.body;
      let paramData = new ParametersModel(body);
      
      ParametersModel.findOneAndUpdate(
        { devicetype: paramData.devicetype},
        {$push: {params: paramData.params}},
        {upsert: true, new: true},
        (err, doc) => {
          if (err) {
            console.error("Error in update : ",err);
          }
          return res.send(doc);
        }
      );

    } catch (error) {
      console.log("Error : ", error);
      res.status(400).send(new Error(error.message));
    }
  }

  async updateParam(req, res){
    try {
      let value = req.query.value;
      let newValue = req.query.newValue;
      let devicetype = req.query.devicetype;
      ParametersModel.findOneAndUpdate(
        {devicetype : devicetype},
        { $set: { "params.$[element]": newValue } },
        {arrayFilters: [ { element: value } ],new: true},
        (err, doc) => {
          if(!err) {
            return res.send(doc);
          }
        }
      );
    } catch (error) {
      console.log("Error : ", error);
      res.status(400).send(new Error(error.message));
    }
  }

  async deleteParam(req, res){
    try {
      let value = req.query.value;
      let devicetype = req.query.devicetype;

      ParametersModel.findOneAndUpdate(
        {devicetype : devicetype},
        { $pull: { params: value } }, 
        {multi: true , new: true},
        (err, doc) => {
          if(!err) {
            return res.send(doc);
          }
        }
      );

    } catch (error) {
      console.log("Error : ", error);
      res.status(400).send(new Error(error.message));
    }
  }

}

module.exports = new Parameters();
