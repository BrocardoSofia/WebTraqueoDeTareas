import { Request, Response } from 'express';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

export const existeEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;

        const consulta =
            'SELECT 1 FROM Usuarios WHERE email = :email';

        const result = await sequelize.query(consulta, {
            replacements: { email },
            type: QueryTypes.SELECT,
        });

        if (result.length != 0) {
            res.json({ respuesta: true, msg: 'El correo existe en la base de datos' });
        } else {
            res.json({ respuesta: false, msg: 'El correo no existe en la base de datos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
    }
}

export const registrarUsuario = async (req: Request, res: Response) => {
    try {
        const { email, nombre, clave } = req.body;

        const consulta =
            'INSERT INTO Usuarios (email,nombre,clave) VALUES (:email,:nombre,:clave)';

        const result = await sequelize.query(consulta, {
            replacements: { email, nombre, clave },
            type: QueryTypes.INSERT,
        });

        if (result[1] > 0) {
            res.json({ msg : 'El usuario fue registrado con exito'})
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al intentar registrar al usuario' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, clave } = req.query;

        const existe = existeEmail

        if(existe.length != 0){
            const consulta =
            'SELECT id FROM Usuarios WHERE email = :email AND clave = :clave';

            const result = await sequelize.query(consulta, {
                replacements: { email, clave },
                type: QueryTypes.SELECT,
            });

            if (result.length != 0) {
                const id = result[0]
                res.json({ respuesta: id, msg: 'Inicio de sesion exitoso' });
            } else {
                res.json({ respuesta: false, msg: 'La clave ingresada en incorrecta' });
            }
        }else{
            res.json({ respuesta: false, msg: 'Email no registrado' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al intentar ingresar' });
    }
}

export const obtenerUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const consulta =
            `SELECT u.email, u.nombre, t.minutos_tarea, t.minutos_descanso, t.minutos_agua, t.ejercicio, l.longitud, l.latitud
            FROM Usuarios AS u
            INNER JOIN Temporizadores AS t
            ON u.id = t.id_usuario
            INNER JOIN Localizacion as l 
            ON u.id = l.id_usuario
            WHERE u.id = :id`;

            const result = await sequelize.query(consulta, {
                replacements: { id },
                type: QueryTypes.SELECT,
            });

            if (result.length != 0) {
                res.json({ respuesta: result, msg: 'Obtencion del usuario exitoso' });
            } else {
                res.json({ respuesta: false, msg: 'El id del usuario no existe' });
            }

    } catch (error) {
        res.status(500).json({ error: 'Error obtener el usuario' });
    }
}

export const verificarClave = async (req: Request, res: Response) => {

    try {
        const { clave } = req.query
        const { id } = req.params

        const consulta =
            `SELECT 1 FROM Usuarios
            WHERE id = :id AND clave = :clave`;

            const result = await sequelize.query(consulta, {
                replacements: { id,clave },
                type: QueryTypes.SELECT,
            });

            if (result.length != 0) {
                res.json({ respuesta: true, msg: 'Clave correcta' });
            } else {
                res.json({ respuesta: false, msg: 'Clave incorrecta' });
            }

    } catch (error) {
        res.status(500).json({ error: 'Error al intentar autenticar la clave' });
    }
}

export const modificarClave = async (req: Request, res: Response) => {
    //usar verificar clave antes de llamar
    try {
        const { nueva_clave } = req.body
        const { id_usuario } = req.params

        const consulta =
            `UPDATE Usuarios
            SET clave = :nueva_clave
            WHERE id_usuario = :id_usuario`;

        const result = await sequelize.query(consulta, {
            replacements: { nueva_clave, id_usuario },
            type: QueryTypes.UPDATE,
        });

        if (result[1] > 0) {
            res.json({ msg: 'La clave fue modificada con exito' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar la clave' })
    }
}

export const modificarEmail = async (req: Request, res: Response) => {
    //usar verificar clave antes de llamar
    try {
        const { nuevo_email } = req.body
        const { id_usuario } = req.params

        const consulta =
            `UPDATE Usuarios
            SET email = :nuevo_email
            WHERE id_usuario = :id_usuario`;

        const result = await sequelize.query(consulta, {
            replacements: { nuevo_email, id_usuario },
            type: QueryTypes.UPDATE,
        });

        if (result[1] > 0) {
            res.json({ msg: 'El email fue modificado con exito' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar el email' })
    }
}

export const modificarNombre = async (req: Request, res: Response) => {
    //usar verificar clave antes de llamar
    try {
        const { nuevo_nombre } = req.body
        const { id_usuario } = req.params

        const consulta =
            `UPDATE Usuarios
            SET nombre = :nuevo_nombre
            WHERE id_usuario = :id_usuario`;

        const result = await sequelize.query(consulta, {
            replacements: { nuevo_nombre, id_usuario },
            type: QueryTypes.UPDATE,
        });

        if (result[1] > 0) {
            res.json({ msg: 'El noombre fue modificado con exito' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar el nombre' })
    }
}
