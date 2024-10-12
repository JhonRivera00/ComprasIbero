import { z } from "zod";
import { ObjectId } from "mongodb"; 

export const registerSchema = z.object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(255, "El nombre no debe tener más de 255 caracteres"),
    cedula: z.number().min(7, "La cédula debe tener al menos 7 dígitos"),
    asociado: z.boolean().default(false),
    municipio: z.string().min(3,"Debes de ingresar un municipio "),
    grupoProductor: z.string().min(3,"Debes de ingresar un grupo"),
    rol: z.enum(["Admin", "Acopiador", "Productor"]).default("Productor"),
  
});




export const loginUsuarioSchema = z.object({
    cedula: z.string().min(7, "La cédula debe tener al menos 7 dígitos"),
    contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(255, "La contraseña no debe tener más de 255 caracteres")
});
  