export const verificationAtention = (user, newAtention)=> {
    const atentionRegistered = user.atentions.some((atencion) =>
        atencion.profesionalId.toString().toLowerCase().trim() === newAtention.profesionalId.toString().toLowerCase().trim() &&
        atencion.servicioId.toString().toLowerCase().trim() === newAtention.servicioId.toString().toLowerCase().trim() &&
        atencion.turnoId.toString().toLowerCase().trim() === newAtention.turnoId.toString().toLowerCase().trim()
      );
      return atentionRegistered
}