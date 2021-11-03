const model = require("../../model/BaseModel.js");
/**
 * 编辑处理
 * @param {object} collectionName 集合名称
 * @param {object} type 参数
 * @return {object|null} 操作结果
 */

const baseTest = (type = 5, field = {}, collectionName = 'test') => {
  let result;
  let id = 'b00064a7608d60541349b4166ca46d6f';
  switch (type) {
    case 1:
      //1. 查询所有
      result = model.query(collectionName, field);
      break;
    case 2:
      //2. 根据id查询
      result = model.findById(collectionName, id);
      break;
    case 3:
      //3.新增
      let params_add = {
        name: 'test42',
        age: 14,
        sex: 'female',
        show: true
      };
      result = model.add(collectionName, params_add);
      break;
    case 4:
      // 4.修改
      let params_update = {
        id: id,
        name: 'test03',
        age: 22,
        sex: 1,
        show: true
      };
      result = model.update(collectionName, params_update);
      break;
    case 5:
      // 5.删除
      result = model.remove(collectionName, id);
      break;
  }
  return result
}

module.exports = {
  baseTest
}