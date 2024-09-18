export const validDocument = (value: string) => {
  return validaCPF(value) || validCNPJ(value);
}

export const validaCPF = (cpf: string) => {
  let sum = 0
  let rest = 0

  const strCPF = String(cpf).replace(/[^\d]/g, '')

  if (strCPF.length !== 11) {
    return false
  }

  if ([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ].indexOf(strCPF) !== -1) {
    return false
  }

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

  rest = (sum * 10) % 11

  if ((rest == 10) || (rest == 11))
    rest = 0

  if (rest != parseInt(strCPF.substring(9, 10))) {
    return false
  }

  sum = 0

  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  }

  rest = (sum * 10) % 11

  if ((rest == 10) || (rest == 11)) {
    rest = 0
  }

  return rest == parseInt(strCPF.substring(10, 11))
}


export const validCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj == '') return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return false;

  // Valida DVs
  let size = cnpj.length - 2
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;
    if (pos < 2)
      pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  // @ts-ignore
  if (result != digits.charAt(0))
    return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;
    if (pos < 2)
      pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  // @ts-ignore
  return result === Number(digits.charAt(1));
}
