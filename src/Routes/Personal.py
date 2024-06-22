from flask import Blueprint, jsonify, request
from database.config import connect
import psycopg2.extras

Personal=Blueprint('Personal', __name__)

@Personal.route("/mostrar", methods = ["GET"])
def mostrar ():
    mensage = ""
    bandera = False
    resultado = ""
    try: 
        cur = connect.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cur.execute("select * from Proceso_Mostrar()")
        resultado=cur.fetchall()
        if(resultado):
            bandera=True
            mensage="Exito al realizar la consulta"
    except OSError as error:
        mensage='Ha ocurrido Un Error al momento de realizar la peticion' + error

    return jsonify({
        "mensaje": mensage,
        "ejecucion": bandera,
        "resultado": resultado

    })

@Personal.route("/proceso/<int:b>", methods=['PUT', 'POST', 'DELETE'])
def proceso(b):
    mensaje = ""
    bandera = False
    resultado = ""
    accion = ""
    try:
        if b == 1:
            accion = "INSERTAR"
        elif b == 2:
            accion = "ACTUALIZAR"
        elif b == 3:
            accion = "ELIMINAR"

        cur = connect.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cur.execute("select Proceso_Personal(%s,%s,%s,%s,%s,%s,%s)", (
            request.json['codigo'],
            request.json['nombres'],
            request.json['apellidos'],
            request.json['correo'],
            request.json['cargo'],
            request.json['edad'],
            b
        ))
        connect.commit()
        mensaje = f"Éxito al {accion} registro en la base de datos."
        bandera = True
    except OSError as error:
        mensaje = f"Ha ocurrido un error al momento de realizar la petición: {error}"

    return jsonify({
        "mensaje": mensaje,
        "ejecucion": bandera,
        "resultado": resultado
    })
