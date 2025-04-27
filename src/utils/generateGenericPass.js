export const genericPassV0 = (name, dni) => {
  const symbols = [
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '-',
    '_',
    '+',
    '=',
    '{',
    '}',
    '[',
    ']',
    '|',
    '\\',
    ':',
    ';',
    '"',
    "'",
    '<',
    '>',
    ',',
    '.',
    '?',
    '/',
    '~',
    '`'
  ]
  if (typeof name !== 'string' || typeof dni !== 'string') return { message: 'datos no soportados' }

  let pass = ''
  const randomSymbolEnd = symbols[Math.floor(Math.random() * symbols.length)]
  const randomSymbolStart = symbols[Math.floor(Math.random() * symbols.length)]
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]

  pass += randomSymbolStart

  for (let i = Math.max(0, name.length - 3); i < name.length; i++) {
    if (i % 2 !== 0) {
      const upperChar = name[i].toUpperCase()
      pass += upperChar
    }
    if (i % 2 === 0) {
      pass += name[i]
      pass += randomSymbol
    }
  }

  pass += dni.slice(0, 4)
  pass += randomSymbolEnd

  return { message: 'Password creado con exito', pass }
}
