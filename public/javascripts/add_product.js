$(document).ready(function(){

$('#add_number').click(function() {
	$("#number").val(parseInt($("#number").val())+1);/* Act on the event */
});
$('#less_number').click(function() {
	if(parseInt($("#number").val()) >0){
	$("#number").val(parseInt($("#number").val())-1);/* Act on the event */
	}
});
});