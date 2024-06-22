const url = 'http://127.0.0.1:3000';
const contenedor = document.getElementById('contenedor');
let resultados = '';

const modalPersonal = new bootstrap.Modal(document.getElementById('modalPersonal'));
const formPersonal = document.querySelector('form');

const nombres = document.getElementById('nombres');
const apellidos = document.getElementById('apellidos');
const correo = document.getElementById('correo');
const cargo = document.getElementById('cargo');
const edad = document.getElementById('edad');
const codigo = document.getElementById('codigo');

let opcion = '';

document.getElementById('btnCrear').addEventListener('click', () => {
    nombres.value = '';
    apellidos.value = '';
    correo.value = '';
    cargo.value = '';
    edad.value = '';
    codigo.value = '';
    modalPersonal.show();
    opcion = 'crear';
});

const mostrar = (Personal) => {
    resultados = '';
    if (Personal.resultado && Array.isArray(Personal.resultado)) {
        Personal.resultado.forEach(person => {
            resultados += `
                <tr>
                    <td>${person[0]}</td>
                    <td>${person[1]}</td>
                    <td>${person[2]}</td>
                    <td>${person[3]}</td>
                    <td>${person[4]}</td>
                    <td>${person[5]}</td>
                    <td class="text-center"><a href="#" class="btnEditar btn btn-primary" data-id="${person[0]}">Editar</a></td>
                    <td class="text-center"><a href="#" class="btnBorrar btn btn-danger" data-id="${person[0]}">Borrar</a></td>
                </tr>`;
        });
        contenedor.innerHTML = resultados;
    } else {
        console.error('Los datos recibidos no son un array válido:', Personal);
    }

    // Agregar eventos de click para los botones de editar y borrar
    document.querySelectorAll('.btnEditar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const row = btn.parentElement.parentElement;
            codigo.value = id;
            nombres.value = row.children[1].textContent;
            apellidos.value = row.children[2].textContent;
            correo.value = row.children[3].textContent;
            cargo.value = row.children[4].textContent;
            edad.value = row.children[5].textContent;
            modalPersonal.show();
            opcion = 'editar';
        });
    });

    document.querySelectorAll('.btnBorrar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const row = btn.parentElement.parentElement;
            codigo.value = id;
            nombres.value = row.children[1].textContent;
            apellidos.value = row.children[2].textContent;
            correo.value = row.children[3].textContent;
            cargo.value = row.children[4].textContent;
            edad.value = row.children[5].textContent;
            opcion = 'eliminar';
            alertify.confirm("¿Estás seguro de que deseas eliminar este registro?",
                function() {
                    eliminarRegistro(id);
                },
                function() {
                    alertify.error('Cancelado');
                });
        });
    });
};

async function obtenerDatos() {
    try {
        const response = await fetch(url + '/mostrar');
        const data = await response.json();
        mostrar(data);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

obtenerDatos();

async function crearRegistro() {
    try {
        const response = await fetch(url + '/proceso/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigo: 0,
                nombres: nombres.value,
                apellidos: apellidos.value,
                correo: correo.value,
                cargo: cargo.value,
                edad: edad.value
            })
        });
        const data = await response.json();
        console.log('Respuesta del servidor al crear:', data);
        obtenerDatos();
        modalPersonal.hide();
    } catch (error) {
        console.error('Error al crear registro:', error);
    }
}

async function editarRegistro(id) {
    try {
        console.log('Datos a enviar para editar:', {
            codigo: id,
            nombres: nombres.value,
            apellidos: apellidos.value,
            correo: correo.value,
            cargo: cargo.value,
            edad: edad.value
        });
        const response = await fetch(url + `/proceso/2`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigo: id,
                nombres: nombres.value,
                apellidos: apellidos.value,
                correo: correo.value,
                cargo: cargo.value,
                edad: edad.value
            })
        });
        const data = await response.json();
        console.log('Respuesta del servidor al editar:', data);
        obtenerDatos();
        modalPersonal.hide();
    } catch (error) {
        console.error('Error al editar registro:', error);
    }
}

async function eliminarRegistro(id) {
    try {
        const response = await fetch(url + `/proceso/3`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigo: Number.parseInt(id),
                nombres: nombres.value,
                apellidos: apellidos.value,
                correo: correo.value,
                cargo: cargo.value,
                edad: edad.value
            })
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Respuesta del servidor al eliminar:', data);
            obtenerDatos();
        } else {
            console.error('Error al eliminar registro:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar registro:', error);
    }
}

document.querySelectorAll('.btnBorrar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        // Confirmación antes de eliminar
        alertify.confirm("¿Estás seguro de que deseas eliminar este registro?",
            function() {
                eliminarRegistro(id); 
            },
            function() {
                alertify.error('Cancelado');
            });
    });
});


document.getElementById('btnGuardar').addEventListener('click', () => {
    const id = codigo.value;
    if (opcion === 'crear') {
        crearRegistro();
    } else if (opcion === 'editar') {
        editarRegistro(id);
    }
});
