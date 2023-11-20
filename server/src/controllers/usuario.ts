import { Request, Response } from 'express';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

export const existeEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;

        const consulta =
            'SELECT id FROM Usuarios WHERE email = :email';

        const result = await sequelize.query(consulta, {
            replacements: { email },
            type: QueryTypes.SELECT,
        });

        res.json(result);
        
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

        res.json( result)
        
    } catch (error) {
        res.status(500).json({ error: 'Error al intentar registrar al usuario' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, clave } = req.query;

        const consulta =
            'SELECT id FROM Usuarios WHERE email = :email AND clave = :clave';

        const result = await sequelize.query(consulta, {
            replacements: { email, clave },
            type: QueryTypes.SELECT,
        });

        res.json(result)

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
            ON u.id = t.id
            INNER JOIN Localizacion as l 
            ON u.id = l.id
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
            replacements: { id, clave },
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
        const { clave } = req.body
        const { id } = req.params

        const consulta =
            `UPDATE Usuarios
            SET clave = :clave
            WHERE id = :id`;

        const result = await sequelize.query(consulta, {
            replacements: { clave, id },
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
        const { email } = req.body
        const { id } = req.params

        const consulta =
            `UPDATE Usuarios
            SET email = :email
            WHERE id = :id`;

        const result = await sequelize.query(consulta, {
            replacements: { email, id },
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
        const { nombre } = req.body
        const { id } = req.params

        const consulta =
            `UPDATE Usuarios
            SET nombre = :nombre
            WHERE id = :id`;

        const result = await sequelize.query(consulta, {
            replacements: { nombre, id },
            type: QueryTypes.UPDATE,
        });

        if (result[1] > 0) {
            res.json({ msg: 'El noombre fue modificado con exito' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar el nombre' })
    }
}
