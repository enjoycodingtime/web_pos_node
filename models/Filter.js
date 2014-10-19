function Filter(){

};
Filter.filter  = function(rule,back){
var str =rule; 
var reg = new RegExp('name','g');
var result;
var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
var rs = ""; 
for (var i = 0; i < str.length; i++) { 
rs = rs+str.substr(i, 1).replace(pattern, ''); 
} 
var name =[];
var indexs =[];
while ((result = reg.exec(rs)) != null)  {
	indexs.push(reg.lastIndex);
 };
 var length = indexs.length;
 for(var i=0;i<length;i++){
 	if(i ==length-1){
 		name.push(rs.substr(indexs[i],rs.length-indexs[i]))
 	}else{
 		name.push(rs.substr(indexs[i],indexs[i+1]-indexs[i]-4))
 	}
 }
back(null,name);	
};
Filter.filter_date  = function(rule,back){
var str =rule; 
var reg = new RegExp('date','g');
var result;
var pattern = new RegExp("[`~!@#$^&*()|{}':;',\\[\\]./?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
var rs = ""; 
for (var i = 0; i < str.length; i++) { 
rs = rs+str.substr(i, 1).replace(pattern, ''); 
} 
var date ={};
var indexs =[];
while ((result = reg.exec(rs)) != null)  {
	indexs.push(reg.lastIndex);
 };
 var length = indexs.length;
 for(var i=0;i<length;i++){
 	if(i ==length-1){
 		if(rs.substr(indexs[i],1) == '>'){
 			date.daye = rs.substr(indexs[i]+1,rs.length-indexs[i]-1)
 		}else{
 			date.xiaoyu = rs.substr(indexs[i]+1,rs.length-indexs[i]-1)
 		}
 	}else{
 		if(rs.substr(indexs[i],1) == '>'){
 			date.daye = rs.substr(indexs[i]+1,indexs[i+1]-indexs[i]-5)
 		}else{
 			date.xiaoyu = rs.substr(indexs[i]+1,indexs[i+1]-indexs[i]-5)
 		}
 	}
 }
back(null,date);	
};
module.exports = Filter;