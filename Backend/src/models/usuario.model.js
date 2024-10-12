import { model, Schema } from 'mongoose'
import bcryptjs from 'bcryptjs'

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: true
    },
    cedula: {
        type: Number,
        unique: true,
        required: true
    },
    contrasena: {
        type: String,
       required: true
    },
    asociado: {
        type: Boolean,
        required: true,
        default: false
    },
    municipio: {
        type: String,
        default:"",
        required: true
    },
    grupoProductor: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        default: 'Productor',
        enum: ['Admin', 'Acopiador', 'Productor']
    },
    acopiador: {
        type: String,
        default:"",
    },
    estado: {
        type: Boolean,
        default: false
    }

},
    {
        versionKey: false,
        timestamps: true
    });

usuarioSchema.statics.hasPassword = async (contrasena) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(contrasena, salt);
}

usuarioSchema.statics.validatePassword = async (contrasena, passwordUser) => {
    return await bcryptjs.compare(contrasena, passwordUser);
}

export default model("Usuarios", usuarioSchema);