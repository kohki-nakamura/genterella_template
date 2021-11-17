<?php

/**
 * CDN経由の画像URLを返却します
 */
if (!function_exists('getCdnImagePath'))
{
    function getCdnImagePath($path='')
    {
        return Config::get('const.cdnImageUrl') . '/' . $path;
    }
}

/**
 * フロントのURLを返却します
 */
if (!function_exists('getFrontPath'))
{
    function getFrontPath($path='')
    {
        return Config::get('const.frontUrl') . '/' . $path;
    }
}

/**
 * Form の value をいい感じに返します
 */
if (!function_exists('setFormValue'))
{
    function setFormValue($column, $data=null, $oldColumn=null)
    {
        if (is_null($oldColumn)) {
            $oldColumn = $column;
        }

        return old($oldColumn, $data[$column]);
    }
}

/**
 * Form の チェックを判定します
 */
if (!function_exists('flagIsChecked'))
{
    function flagIsChecked($column, $data=null)
    {
        if (old($column) !== null) {
            return old($column) == 'yes' ? true : false;
        }
        if (!empty($data) && isset($data[$column])) {
            return $data[$column] == 'yes' ? true : false;
        }
        return false;
    }
}


/**
 * 日付形式をForm入力用に返却します
 *   例: $column = pickup_on
 *       $kind = hour
 *       => pickup_on_hourの入力値を返す
 */
if (!function_exists('setFormDateValue'))
{
    function setFormDateValue($column, $kind, $data=null)
    {
        $column_form = $column . '_' . $kind;
        // 古い入力データがあったらそれを返す
        if (old($column_form) !== null) {
            return old($column_form);
        }
        if (!empty($data) && isset($data[$column])) {
            $time = strtotime($data[$column]);
            if ($time < 0) {
                return null;
            }
            if ($kind == "date") {
                return date('Y-m-d', $time);
            } else if ($kind == "hour") {
                return date('H', $time);
            } else if ($kind == "minute") {
                return date('i', $time);
            }
            return null;
        }
        return null;
    }
}



/**
 * 時間をForm入力用に返却します
 *
 */
if (!function_exists('setFormTimeValue'))
{
    function setFormTimeValue($column, $data=null)
    {
        $time = setFormValue($column, $data);
        if (is_null($time)) {
            return null;
        }
        return date('H:i', strtotime($time));
    }
}

/**
 * 日付がデフォルト値0000-00-00 00:00:00だったらnullを返す
 */
if (!function_exists('defaultDateNull'))
{
    function defaultDateNull($input)
    {
        if ($input == "0000-00-00 00:00:00") {
            return null;
        }
        return $input;
    }
}

/**
 * 改行コードを統一します
 */
if (!function_exists('convertEOL'))
{
    function convertEOL($string, $to = "\n")
    {
        return preg_replace("/\r\n|\r|\n/", $to, $string);
    }
}

/**
 * 許容しない空白を削除します
 */
if (!function_exists('eliminateNull'))
{
    function eliminateNull($string)
    {
        $null_pattern = "/([\x{feff}\x{0323}\x{200B}\x{2029}\x{202A}\x{007f}\x{0085}\x{05c1}-\x{05c2}\x{07b2}-\x{07bf}\x{0e3a}\x{115a}-\x{1160}\x{11a3}-\x{11a7}\x{200d}\x{200f}\x{2028}\x{202f}\x{2060}\x{206a}-\x{206f}\x{3164}\x{e000}\x{202f}\x{2060}\x{206a}-\x{206f}\x{3164}\x{e000}\x{e7cd}\x{f00a}-\x{f00f}\x{0701}-\x{070d}\x{2001}\x{0008}])/u";

        $string = preg_replace($null_pattern, "", $string);
        return $string;
    }

}

/**
 * 一部の特殊部首文字を通常の文字に変換する。
 */
if (!function_exists('convertSpecialBushuString'))
{
    function convertSpecialBushuString($string)
    {
        foreach (Config::get('const.bushuConvertList') as $key => $value) {
            $string = str_replace($key, $value, $string);
        }
        return $string;
    }
}

/**
 * ２文字としてカウントされる半濁音を１文字に結合します。
 */
if (!function_exists('mbConvertKana'))
{
    function mbConvertKana($string)
    {
        $mbConvertKana = function ($str) {
            if (preg_match("/^[ぁ-んー]+/u", $str)) {
                $option = "H";
            } elseif (preg_match("/^[ァ-ヶー]+/u", $str)) {
                $option = "K";
            }
            if (!empty($option)) {
                $str = mb_convert_kana($str, mb_strtolower($option), "UTF-8");
                // 3099,309A
                $str = str_replace(["゙", "゚"], ["ﾞ", "ﾟ"], $str);
                // 309B,309C
                $str = str_replace(["゛", "゜"], ["ﾞ", "ﾟ"], $str);
                $str = mb_convert_kana($str, $option . "V", "UTF-8");
            }

            // 「す」とかの次に「ﾞ」など正しくない半濁音が付いてた場合は、2文字以上になるため、半濁音を削除
            if (mb_strlen($str) > 1) {
                $char =  mb_substr($str, 0, 1);
                $str = $char;
            }
            return $str;
        };

        // "フ゛ラサリタ",プラサリタ"などでテスト;
        $ilegal_pattern = "/([\x{3099}\x{309A}\x{309B}\x{309C}])/u";
        preg_match_all($ilegal_pattern, $string, $matches);
        foreach ($matches as $match) {
            foreach ($match as $val) {
                $position = mb_stripos($string, $val);
                if ($position === false) {
                    continue;
                }
                $replace = mb_substr($string, $position - 1, 2);
                $replacer = $mbConvertKana($replace);
                $string = str_replace($replace, $replacer, $string);
            }
        }

        return $string;
    }
}

/**
 * 空白文字や半濁音の間違ったものをなくす。
 */
if (!function_exists('fixedText'))
{
    function fixedText($string)
    {
        $string = eliminateNull($string);
        $string = mbConvertKana($string);
        $string = convertSpecialBushuString($string);

        return $string;
    }
}

/**
 * 前後の空白文字と全角スペースを削除します。
 */
if (!function_exists('rltrimAllSpace'))
{
    function rltrimAllSpace($string)
    {
        $string = preg_replace('/　/', ' ', eliminateNull($string));
        $string = trim($string);
        return $string;
    }
}

/**
 * カンマで区切られた単語の重複と前後のカンマを省きます
 */
if (!function_exists('convertTrimCommaData'))
{
    function convertTrimCommaData($str="") {
        $str = rltrimAllSpace($str);
        $tmpArray = explode(',', $str);
        $tmpArray = array_unique($tmpArray);
        return trim(implode(',', $tmpArray), ',');
    }
}

/**
 * unzipコマンドをphpで実行します。
 */
if (!function_exists('unzip'))
{
    function unzip($filename)
    {
        return shell_exec("unzip $filename");
    }
}

/**
 * 文字列がnullでなければ、最初に?を入れる
 */
if (!function_exists('getQueryStr'))
{
    function getQueryStr($params)
    {
        $query = http_build_query($params);
        return !empty($query) ? "?" . $query : "";
    }
}

/**
 * 住所から緯度経度を取得します。
 */
if (!function_exists('getMapGeoData'))
{
    function getMapGeoData($address)
    {
        $urlPrefix = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        $address = strip_tags($address);
        $apiUrl = $urlPrefix . urlencode($address) . "&key=" . Config::get('const.googleMapApiKey');
        $json = json_decode(file_get_contents($apiUrl), true);
        if ($json['status'] != 'OK') {
            return null;
        }
        return $json['results'];
    }
}


/**
 * 0以上の数字または不明であるか
 */
if (!function_exists('isPositiveIntOrUnknown'))
{
    function isPositiveIntOrUnknown($str)
    {
        if (is_null($str)) {
            return false;
        }
        return (is_numeric($str) && (integer)($str) >= 0) || $str == -1;
    }
}

/*
 * 数もしくは不明と表示
 */
if (!function_exists('showNumOrUnknown'))
{
    function showNumOrUnknown($str)
    {
        if (is_numeric($str) && $str >= 0) {
            return $str;
        } else if (!$str) {
            return null;
        } else if ($str == "不明" || $str == -1) {
            return "不明";
        }
        return $str;
    }
}


/*
 * カラムによって幅のクラスを取得する
 */
if (!function_exists('getAgeColumnWidth'))
{
    function getAgeColumnWidth($column)
    {
        $age = preg_replace("/age_g[0-9]+_/", "", $column);
        if (strlen($age) == 1) {
            return "col-md-1";
        }
        $startAge = (integer)substr($age, 0 ,1);
        $endAge = (integer)substr($age, 1, 1);

        return "col-md-" . ($endAge - $startAge + 1);
    }
}

/**
 * date1がdate2より後の日付かどうか
 * 第二引数が指定なしの場合は、date2は今日の日付
 */
if (!function_exists('isAfterDate'))
{
    function isAfterDate($date1, $date2=null, $containEqual=true)
    {
        $datetime1 = new DateTime($date1);
        $datetime2 = new DateTime($date2);
        return $containEqual ? $datetime1 >= $datetime2 : $datetime1 > $datetime2;
    }
}

/**
 * pianoユーザ情報を取得
 */
if (!function_exists('getPianoUser'))
{
    function getPianoUser($uid)
    {
        $endpoint = config('const.pianoEndpoint') . "publisher/user/get";
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', $endpoint, ['query' => [
            'api_token' => config('const.pianoApiToken'),
            'aid' => config('const.pianoAppId'),
            'uid' => $uid,
        ]]);
        $content = $response->getBody()->getContents();

        return json_decode($content, true);
    }
}

/**
 * 退会ユーザかどうかをメアドで判定
 */
if (!function_exists('isWithdrawn'))
{
    function isWithdrawn($email)
    {
        return preg_match('/leave\.mamastar\.jp$/', $email) === 1;
    }
}
