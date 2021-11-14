(function ($) {
    function initialie() {
        var statuses = $('#statuses').data('list');

        $.each(statuses, function(cnt, status) {
            var knob_id = "#knob-" + status;
            var knobColor = function(status) {
                var returnVal = ""
                switch(status) {
                    case "calorie":
                        returnVal = '#d6cf75';
                        break;
                    case "difficulty":
                        returnVal = '#67aad4';
                        break;
                    case "relax":
                        returnVal = '#9e88c9';
                        break;
                    case "chiropractic":
                        returnVal = '#55bdd0';
                        break;
                    case "spiritual":
                        returnVal = '#df7eb5';
                        break;
                    default: 
                        break;
                }
                return returnVal;
            };
            $(knob_id).knob({
                'min': 1,
                'max': 5,
                'width': 80,
                'height': 80,
                'readOnly': false,
                'fgColor': knobColor(status)
            });
        });
    }
    initialie();
})(jQuery);