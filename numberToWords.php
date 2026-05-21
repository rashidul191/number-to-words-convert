<?php

function convertHundreds(int $num, array $ones, array $teens, array $tens): string
{
    $str = "";

    if ($num >= 100) {
        $str .= $ones[(int) floor($num / 100)] . " Hundred ";
        $num %= 100;
    }

    if ($num >= 20) {
        $str .= $tens[(int) floor($num / 10)] . " ";
        if ($num % 10 > 0) {
            $str .= $ones[$num % 10] . " ";
        }
    } elseif ($num >= 10) {
        $str .= $teens[$num - 10] . " ";
    } elseif ($num > 0) {
        $str .= $ones[$num] . " ";
    }

    return $str;
}

function numberToWords(int $number): string
{
    $ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    $teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    $tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    $scales = ["", "Thousand", "Million", "Billion", "Trillion"];

    if ($number === 0) {
        return "Zero";
    }

    if ($number < 0) {
        return "Minus " . numberToWords(-$number);
    }

    $result = "";
    $scaleIndex = 0;

    while ($number > 0) {
        $chunk = $number % 1000;
        if ($chunk !== 0) {
            $result = trim(convertHundreds($chunk, $ones, $teens, $tens))
                . ($scales[$scaleIndex] !== '' ? ' ' . $scales[$scaleIndex] : '')
                . ' ' . $result;
        }
        $number = (int) floor($number / 1000);
        $scaleIndex++;
    }

    return trim($result);
}

$number = 109;
echo numberToWords($number);
