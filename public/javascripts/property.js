/**
 * Created by zk on 14-10-13.
 */
function verification (){
    var current_form =  document.add_property;
    if(current_form.property_name.value =='生产日期'){
        if(current_form.property_value.value.match(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)) {
            return true;
        } else {
            alert('日期格式不正确!如:2014-10-12');
            return false;
        }
    }
    return true;
}