CREATE TABLE Personal (
    ID SERIAL PRIMARY KEY NOT NULL, 
    Nombres VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    Correo VARCHAR(100) NOT NULL, 
    Cargo VARCHAR(50) NOT NULL, 
    Edad INT
); 

SELECT * FROM Personal;

INSERT INTO Personal (Nombres, Apellidos, Correo, Cargo, Edad)
VALUES 
('Donovan', 'Pineda', 'donopineda@prueba.co', 'Gerente Operaciones y Tecnología', 35),
('Carlos', 'Astralaga', 'Carastralaga@prueba.co', 'Gerente Oficinas', 34),
('Natalia', 'Granada', 'natagrana@prueba.co', 'Gerente Operaciones', 28),
('Felipe', 'Vargas', 'fevar@prueba.co', 'Gerente Tecnología', 32),
('John', 'Mendez', 'johnmen@prueba.co', 'Gerente Desarrollo', 30),
('Cristian', 'Mesa', 'crismesa@prueba.co', 'Líder QA', 35);

CREATE FUNCTION Proceso_Personal(
    _id_personal INT, 
    _nombres VARCHAR(50),
    _apellidos VARCHAR(50),
    _correo VARCHAR(100), 
    _cargo VARCHAR(50),
    _edad INT, 
    _b INT
)
RETURNS TABLE (respuesta TEXT)
AS $$
BEGIN
    IF (_b = 1) THEN
        INSERT INTO Personal(Nombres, Apellidos, Correo, Cargo, Edad)
        VALUES (_nombres, _apellidos, _correo, _cargo, _edad);
        RETURN QUERY SELECT 'Insertado'::TEXT AS respuesta;

    ELSIF (_b = 2) THEN 
        UPDATE Personal
        SET Nombres = _nombres, 
            Apellidos = _apellidos,
            Correo = _correo, 
            Cargo = _cargo, 
            Edad = _edad
        WHERE ID = _id_personal;
        RETURN QUERY SELECT 'Actualizado'::TEXT AS respuesta;

    ELSIF (_b = 3) THEN 
        DELETE FROM Personal
        WHERE ID = _id_personal;
        RETURN QUERY SELECT 'Eliminado'::TEXT AS respuesta;
    END IF;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION Proceso_Mostrar()
RETURNS SETOF Personal
AS $$
BEGIN
    RETURN QUERY SELECT * FROM Personal;
END
$$ LANGUAGE plpgsql;
