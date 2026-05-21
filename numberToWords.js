function numberToWords(number) {
  // Arrays for number to word conversion
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const scales = ["", "Thousand", "Million", "Billion", "Trillion"];

  // Handle zero
  if (number === 0) return "Zero";

  // Handle negative numbers
  if (number < 0) return "Minus " + numberToWords(-number);

  let result = "";
  let scaleIndex = 0;

  while (number > 0) {
    if (number % 1000 !== 0) {
      result =
        convertHundreds(number % 1000, ones, teens, tens) +
        scales[scaleIndex] +
        " " +
        result;
    }
    number = Math.floor(number / 1000);
    scaleIndex++;
  }

  return result.trim();

  function convertHundreds(num, ones, teens, tens) {
    let str = "";

    // Handle hundreds
    if (num >= 100) {
      str += ones[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }

    // Handle tens and ones
    if (num >= 20) {
      str += tens[Math.floor(num / 10)] + " ";
      if (num % 10 > 0) {
        str += ones[num % 10] + " ";
      }
    } else if (num >= 10) {
      str += teens[num - 10] + " ";
    } else if (num > 0) {
      str += ones[num] + " ";
    }

    return str;
  }
}

const number = 1009;

console.log(numberToWords(number));
