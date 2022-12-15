const EnrollController=require('../controllers/EnrollController');
module.exports=function enroll(route){
route.post('/enroll/course',EnrollController);
}
