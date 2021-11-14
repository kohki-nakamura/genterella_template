$('#item_up').click(function (e) {
    $('select').moveUpDown('#to_box', true, false);
    e.preventDefault();
});
$('#item_down').click(function (e) {
    $('select').moveUpDown('#to_box', false, true);
    e.preventDefault();
});
$("#to_box").on("change", function(e) {
    var id = $("#to_box option:selected").val();
    $('.selectedImage').hide();
    $("#image" + id).show();
});
function submit_hiddens() {
    $('#to_box option').each(function() {
        console.log(this.text + ' ' + this.value);
        $('<input>').attr({ type:'hidden', name:'selected[]', value:this.value }).appendTo('#hidden_items');
    });
    return true;
}
