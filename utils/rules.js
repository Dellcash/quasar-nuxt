export function requiredRule (value) {
  return !!value || 'لطفا این فیلد را تکمیل نمایید'
}

export function passwordChecker (value) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{8,}$/
  return !!passwordPattern.test(value) || 'رمز عبور باید به زبان انگلیسی و حداقل 8 کاراکتر داشته باشد و شامل ترکیبی از حروف بزرگ و کوچک و اعداد باشد.'
}

export function onlyNumber (value) {
  const numberPattern = /^[0-9,]+$/
  return numberPattern.test(value) || 'فرمت قیمت وارد شده صحیح نیست.'
}

export function isValidIrMobileNumber (phoneNumber) {
  const regex = /^09\d{9}$/
  return regex.test(phoneNumber) || 'فرمت شماره تلفن نادرست است'
}

export function regularInputValidation (number) {
  const persianNumbersOnly = /^[\u06F0-\u06F9]+$/
  const generalRegex = /^[۰-۹0-9]*[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z]+[۰-۹0-9]*.*$/

  if (persianNumbersOnly.test(number)) {
    return 'فرمت اطلاعات وارد شده نادرست است'
  }

  return generalRegex.test(number) || 'فرمت اطلاعات وارد شده نادرست است'
}
