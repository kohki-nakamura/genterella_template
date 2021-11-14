$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$('table button').click(function() {
    console.log($('meta[name="csrf-token"]').attr('content'));
    $.ajax({
        type: 'post',
        url: '/admin/mail_subscriptions/test',
        data: {'subscription_id': $(this).data('subscription_id')},
        success: function(data) {
            alert('テストメールを送信しました。');
        },
        error: function(response, textStatus, errorThrown) {
            if (response.status == 404) {
                alert('登録情報が見つかりませんでした。やり直してください。');
            }
            if (response.status == 405) {
                alert('退会済ユーザのため、メールは送信されませんでした。');
            }
            if (response.status == 406) {
                alert('条件に該当する空き情報が見つからないため、メールは送信されませんでした。');
            }
            if (response.status == 500) {
                alert('テストメールの送信に失敗しました。やり直してください。');
            }
        }
    });
});