// configuracion
const API_BASE_URL = 'http://localhost:5080/api/Cliente';

document.addEventListener('DOMContentLoaded', () => {
  const isIndex = document.getElementById('tablaClientes');
  const formulario = document.getElementById('formularioCliente');
  if (isIndex) {
    listarClientes();
  } else if (formulario) {
    preparaFormulario(formulario);

    btnCancel.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});

// lista todos los clientes
async function listarClientes() {
    const tableBody = document.getElementById('tablaClientes');

    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error('Error al obtener los datos del servidor.');
        }

        const clients = await response.json();

        tableBody.innerHTML = '';

        if (clients.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center">No hay clientes registrados</td>
                </tr>
            `;
            return;
        }

        clients.forEach(client => {
            const id = client.id || client.Id;
            const identificacion = client.identificacion || client.Identificacion;
            const nombre = client.nombre || client.Nombre;
            const correo = client.correo || client.Correo;
            const telefono = client.telefono || client.Telefono || '';
            const direccion = client.direccion || client.Direccion || '';
            const fechaRegistro = (client.fechaRegistro || client.FechaRegistro || '').split('T')[0];
            const estado = client.estado !== undefined ? client.estado : client.Estado;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${id}</td>
                <td>${identificacion}</td>
                <td>${nombre}</td>
                <td>${correo}</td>
                <td>${telefono}</td>
                <td>${direccion}</td>
                <td>${fechaRegistro}</td>
                <td>${estado ? 'Activo' : 'Inactivo'}</td>
                <td>
                    <a href="formulario.html?id=${id}" class="btn-edit">Editar</a>
                    <button class="btn-delete" onclick="borrarCliente(${id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error:', error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center">Error al consultar los registros</td>
            </tr>
        `;
    }
}

// guardar nuevo y editar cliente
function preparaFormulario(formulario) {
  const idInput = document.getElementById('id');
  const identificacionInput = document.getElementById('identificacion');
  const nombreInput = document.getElementById('nombre');
  const correoInput = document.getElementById('correo');
  const telefonoInput = document.getElementById('telefono');
  const direccionInput = document.getElementById('direccion');
  const fechaRegistroInput = document.getElementById('fechaRegistro');
  const estadoSelect = document.getElementById('estado');

  const urlParams = new URLSearchParams(window.location.search);
  const clientId = urlParams.get('id');

  if (clientId) { //hay id en la url
    consultarCliente(clientId, idInput, identificacionInput, nombreInput, correoInput, telefonoInput, direccionInput, fechaRegistroInput, estadoSelect);
  } else {
    fechaRegistroInput.value = new Date().toISOString().split('T')[0];
  }

  formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const clientData = {
      identificacion: identificacionInput.value,
      nombre: nombreInput.value,
      correo: correoInput.value,
      telefono: telefonoInput.value,
      direccion: direccionInput.value,
      estado: estadoSelect.value === 'true'
    };

    try {
      let response;
      if (clientId) {
        clientData.id = parseInt(clientId);
        response = await fetch(`${API_BASE_URL}/${clientId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientData)
        });
      } else {
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientData)
        });
      }

      if (response.ok) {
        window.location.href = 'index.html';
      } else {
        const errorData = await response.json();
        alert('Error al guardar: ' + (errorData.message || response.statusText));
      }
    } catch (error) {
      //console.error('Error de red:', error);
      alert('No se pudo conectar con el servidor.');
    }
  });
}

// recupera cliente por id
async function consultarCliente(id, idInput, identificacionInput, nombreInput, correoInput, telefonoInput, direccionInput, fechaRegistroInput, estadoSelect) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (response.ok) {
            const client = await response.json();

            idInput.value = client.id || client.Id;
            identificacionInput.value = client.identificacion || client.Identificacion;
            nombreInput.value = client.nombre || client.Nombre;
            correoInput.value = client.correo || client.Correo;
            telefonoInput.value = client.telefono || client.Telefono;
            direccionInput.value = client.direccion || client.Direccion;
            fechaRegistroInput.value = (client.fechaRegistro || client.FechaRegistro || '').split('T')[0];
            estadoSelect.value = (client.estado !== undefined ? client.estado : client.Estado) ? 'true' : 'false';

            document.getElementById('page-title').innerText = 'Modificar Cliente';
            document.getElementById('form-heading').innerText = 'Modificar Cliente';
            document.getElementById('btnSubmit').textContent = 'Actualizar';
        } else {
            alert('No se pudo cargar la información del cliente.');
        }
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

//borra el cliente
async function borrarCliente(id) {
    if (confirm('¿Está seguro de eliminar el cliente?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                listarClientes();
            } else {
                alert('No se pudo eliminar el cliente.');
            }
        } catch (error) {
            //console.error('Error de red:', error);
            alert('No se pudo conectar con el servidor.');
        }
    }
}
