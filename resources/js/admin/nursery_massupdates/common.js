var endpoint = '/admin/nurseries/massupdate/';

function searchList() {
    var city = $('select[name=target_city] :selected').val();
    var kind = $('select[name=nursery_kind] :selected').val();
    if (!city || !kind) {
        alert('検索するには市区町村と保育種別を選択してください。')
        return;
    }
    var group = $('select[name=nursery_group] :selected').val();
    var redirect = window.location.href.split('?')[0] + '?search_city_id=' + city + '&search_kind=' + kind + '&search_writer_id=' + group;
    var name = $('input[name=search_name]').val();
    if (name) {
        redirect += '&search_name=' + name;
    }
    location.href = redirect;
}

function openModal(nursery_id, type) {
    var url = endpoint + 'get_' + type + '/' + nursery_id;
    var type_str = '';
    if (type == 'capacity') {
        type_str = '定員';
    }
    if (type == 'vacancy') {
        type_str = '空き定員';
    }
    $.ajax({
        type: 'get',
        url: url,
        success: function(data) {
            $('.modal input').val('');
            if (data.capacity) {
                $('.modal .title').html(data.name + '（' + type_str + '編集）');
                $('#age0').val(formatedNum(data.capacity.age_g0_0));
                $('#age1').val(formatedNum(data.capacity.age_g0_1));
                $('#age2').val(formatedNum(data.capacity.age_g0_2));
                $('#age3').val(formatedNum(data.capacity.age_g0_3));
                $('#age4').val(formatedNum(data.capacity.age_g0_4));
                $('#age5').val(formatedNum(data.capacity.age_g0_5));
                $('#age02').val(formatedNum(data.capacity.age_g0_02));
                $('#age12').val(formatedNum(data.capacity.age_g0_12));
                $('#age25').val(formatedNum(data.capacity.age_g0_25));
                $('#age35').val(formatedNum(data.capacity.age_g0_35));
                $('#age45').val(formatedNum(data.capacity.age_g0_45));
                $('#total').val(formatedNum(data.capacity.age_g0_total));
            } else {
                $('.modal .title').html(data.name + '（' + type_str + '新規作成）');
            }
            $('.modal input').data('capazero', false);
            if (data.capazero) {
                data.capazero.forEach(function(id) {
                    $('#'+id).data('capazero', true);
                    if (!$('#'+id).val()) {
                        $('#'+id).val(0);
                    }
                });
            }
            $('.modal').data('nursery_id', nursery_id);
            $('.modal').data('type', type);
            $('.modal').show();
            controlInputs();
        },
        error: function(response, textStatus, errorThrown) {
            alert(type_str + 'のデータが取得できませんでした');
        }
    });
}

function saveModal() {
    var data = {};
    var valid = true;
    $('.modal input').each(function() {
        var matches = $(this).val().match(/^(\d+|不明)?$/);
        if(!matches) {
            valid = false;
            return;
        }
        var val = $(this).val();
        if (val == '不明') {
            val = -1;
        }
        data[$(this).attr('id')] = val;
    });
    if (!valid) {
        alert('半角数字または不明と入力してください。');
        return;
    }

    var nursery_id = $('.modal').data('nursery_id');
    var type = $('.modal').data('type');
    var url = endpoint + 'update_' + type + '/' + nursery_id;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        type: 'post',
        url: url,
        data: data,
        success: function(data) {
            $('.modal').hide();
            location.reload();
        },
        error: function(response, textStatus, errorThrown) {
            console.log(response);
            alert('データの更新に失敗しました。やり直してください。');
        }
    });
}

function formatedNum(num) {
    if(num < 0) {
        return '不明'
    } else {
        return num;
    }
}

function controlInputs() {
    $('.modal input').prop('readonly', false);
    if ($('#age02').val()) {
        $('#age0').prop('readonly', true);
    }
    $('#age02,#age12').each(function() {
        if ($(this).val()) {
            $('#age1').prop('readonly', true);
        }
    });
    $('#age02,#age12,#age25').each(function() {
        if ($(this).val()) {
            $('#age2').prop('readonly', true);
        }
    });
    $('#age25,#age35').each(function() {
        if ($(this).val()) {
            $('#age3').prop('readonly', true);
        }
    });
    $('#age25,#age35,#age45').each(function() {
        if ($(this).val()) {
            $('#age4').prop('readonly', true);
            $('#age5').prop('readonly', true);
        }
    });
    $('#age0,#age1,#age2,#age12,#age25').each(function() {
        if ($(this).val()) {
            $('#age02').prop('readonly', true);
        }
    })
    $('#age1,#age2,#age02,#age25').each(function() {
        if ($(this).val()) {
            $('#age12').prop('readonly', true);
        }
    });
    $('#age2,#age3,#age4,#age5,#age02,#age12,#age35,#age45').each(function() {
        if ($(this).val()) {
            $('#age25').prop('readonly', true);
        }
    });
    $('#age3,#age4,#age5,#age25,#age45').each(function() {
        if ($(this).val()) {
            $('#age35').prop('readonly', true);
        }
    });
    $('#age4,#age5,#age25,#age35').each(function() {
        if ($(this).val()) {
            $('#age45').prop('readonly', true);
        }
    });
    $('.modal input').each(function() {
        if ($(this).data('capazero')) {
            $(this).prop('readonly', true);
        }
    });
}

function confirmSubmit() {
    if ($('input[name=search_name]').val()) {
        alert('保育園名の検索は提供元データ更新日の一括更新には使えません。\n検索条件を変えてください。');
        return false;
    }
    if (location.href.includes('search_name')) {
        alert('検索条件が変わったのでリロードします');
        searchList();
        return false;
    }
    return confirm('本当に一括更新しますか？');
}

function updateOrder(nursery_id, val) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var url = endpoint + 'order/' + nursery_id;
    $.ajax({
        type: 'post',
        url: url,
        data: {'val': val},
        success: function(data) {
            location.reload();
        },
        error: function(response, textStatus, errorThrown) {
            console.log(response);
            alert('データの更新に失敗しました。やり直してください。');
        }
    });
}

$(function() {
    $('.modal input').on('keyup', function() {
        controlInputs();
    });
});
