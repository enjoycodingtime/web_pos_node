/**
 * Created by zk on 14-10-13.
 */
function verification (){
    var current_form =  document.add_property;
    if(current_form.property_name.value =='生产日期'){
        if(current_form.property_value.value.match(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/((?:19|20)\d\d)$/)) {
            return true;
        } else {
            alert('日期格式不正确!日/月/年。如:12/11/2014');
            return false;
        }
    }
    return true;
}