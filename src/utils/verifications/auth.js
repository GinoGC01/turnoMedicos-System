const dniRegex = /^\d{7,8}$/
const nombreRegex = /^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]{2,60}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const telefonoRegex = /^\d{8,15}$/
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

export class verificationAuth {
  static validateRegister ({ nombre, edad, dni, email, telefono, password }) {
    if (!nombre || !edad || !dni || !email || !telefono || !password) {
      return {
        status: 400,
        message: 'Error, falta un campo para el registro'
      }
    }

    if (!dniRegex.test(dni)) return { status: 400, message: 'Error, DNI no compatible' }
    if (!nombreRegex.test(nombre)) return { status: 400, message: 'Error, NOMBRE no compatible' }
    if (!emailRegex.test(email)) return { status: 400, message: 'Error, EMAIL no compatible' }
    if (!telefonoRegex.test(telefono)) return { status: 400, message: 'Error, TELEFONO no compatible' }
    if (!passRegex.test(password)) return { status: 400, message: 'Error, PASSWORD no compatible' }
    return { status: 200, message: 'Exito, campos compatibles' }
  }
}
