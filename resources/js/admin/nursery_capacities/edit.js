(function($) {
    // todo Vue.jsに書き換えた方がいいかも。
    class CapacityAges {
        constructor() {
            this.allCanUseWithAgeNames = $("#canUseWithAgeNames").data("list");
            this.allAgeInputs = [];
            this.disableAgeColumns = []
            this.kindAgeColumns = $("#kindAgeColumns").data("list");
            this.capazeroColumns = $("#capazero").data("list");
        }

        handle() {
            $('input').each((cnt, row) => {
                let name = $(row).attr('name')
                // 年齢定員カラムは、追加する
                if (name !== undefined && /^age_g\d_(\d)+$/.test(name)) {
                    this.allAgeInputs.push(row)
                    this.addEvent(row)
                }
            });
            this.toggleAgeInputsWritable();
        }

        // 新たに入力可能なinputの取得
        toggleAgeInputsWritable() {
            this.disableAgeColumns = []
            this.allAgeInputs.forEach((input) => {
                /// 未入力の場合は、一緒に使えるカラムも登録
                if ($(input).val()) {
                    let name = $(input).attr('name');
                    this.allAgeInputs.forEach((tmpInput) => {
                        let tmpName = $(tmpInput).attr('name');
                        if (name != tmpName && !inArray(tmpName, this.allCanUseWithAgeNames[name])) {
                            this.disableAgeColumns.push(tmpName)
                        }
                    });
                }

            });

            this.disableAgeColumns.forEach((column) => {
                this.disableInput(this.makeInput(column))
            });

            this.kindAgeColumns.forEach((column) => {
                if (!inArray(column, this.disableAgeColumns)) {
                    this.enableInput(this.makeInput(column))
                }
            })

            if (this.capazeroColumns) {
                this.capazeroColumns.forEach((name) => {
                    this.disableInput($('input\[name="' + name + '"\]'));
                });
            }
        }

        addEvent(row) {
            $(row).on('keyup', () => {
                this.toggleAgeInputsWritable()
            })
        }

        makeInput(name) {
            return $('input\[name="' + name + '"\]');
        }

        // disabledにすると、バリデーションエラーの際に、送信時に送られずにバグるため、readonly
        disableInput(input) {
            $(input).prop('readonly', true);
        }

        // disabledにすると、バリデーションエラーの際に、送信時に送られずにバグるため、readonly
        enableInput(input) {
            $(input).prop('readonly', false);
        }
    }

    let capacityAges = new CapacityAges()
    capacityAges.handle()


})(jQuery);