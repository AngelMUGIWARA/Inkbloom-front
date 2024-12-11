async function listarDocumentos() {
  const response = await fetch('/api/documento');
  if (response.ok) {
      const documentos = await response.json();
      console.log('Documentos disponibles:', documentos);
      return documentos;
  } else {
      console.error('Error al listar documentos');
  }
}
async function crearDocumento(titulo) {
  const response = await fetch('/api/documento/crear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titulo=${encodeURIComponent(titulo)}`
  });

  if (response.ok) {
      const documento = await response.json();
      console.log('Documento creado:', documento);
      return documento;
  } else {
      console.error('Error al crear documento');
  }
}
async function agregarTexto(texto) {
  const response = await fetch('/api/documento/agregar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `texto=${encodeURIComponent(texto)}`
  });

  if (response.ok) {
      const documento = await response.json();
      console.log('Texto agregado:', documento);
      actualizarEditor(documento);
  } else {
      console.error('Error al agregar texto');
  }
}
async function quitarTexto() {
  const response = await fetch('/api/documento/quitar', {
      method: 'POST'
  });

  if (response.ok) {
      const documento = await response.json();
      console.log('Texto quitado:', documento);
      actualizarEditor(documento);
  } else {
      console.error('Error al quitar texto');
  }
}
async function guardarDocumento() {
  const response = await fetch('/api/documento/guardar', {
      method: 'POST'
  });

  if (response.ok) {
      const documentos = await response.json();
      console.log('Documentos guardados:', documentos);
  } else {
      console.error('Error al guardar documento');
  }
}
async function deshacer() {
  const response = await fetch('/api/documento/deshacer', {
      method: 'POST'
  });

  if (response.ok) {
      const documento = await response.json();
      console.log('Acción deshecha:', documento);
      actualizarEditor(documento);
  } else {
      console.error('Error al deshacer');
  }
}
async function rehacer() {
  const response = await fetch('/api/documento/rehacer', {
      method: 'POST'
  });

  if (response.ok) {
      const documento = await response.json();
      console.log('Acción rehecha:', documento);
      actualizarEditor(documento);
  } else {
      console.error('Error al rehacer');
  }
}
async function listarCambiosPendientes() {
  const response = await fetch('/api/documento/cambios');
  if (response.ok) {
      const cambios = await response.json();
      console.log('Cambios pendientes:', cambios);
      return cambios;
  } else {
      console.error('Error al listar cambios pendientes');
  }
}
async function abrirDocumentoEnVista(titulo) {
  const response = await fetch(`/api/documento/vista/abrir?titulo=${encodeURIComponent(titulo)}`, {
      method: 'POST'
  });

  if (response.ok) {
      console.log('Documento abierto en vista');
  } else {
      console.error('Error al abrir documento en vista');
  }
}
async function cerrarDocumentoEnVista() {
  const response = await fetch('/api/documento/vista/cerrar', {
      method: 'POST'
  });

  if (response.ok) {
      const documentoCerrado = await response.json();
      console.log('Documento cerrado:', documentoCerrado);
  } else {
      console.error('Error al cerrar documento en vista');
  }
}
async function mostrarAreaDeTrabajo() {
  const response = await fetch('/api/documento/area-de-trabajo');
  if (response.ok) {
      const areaDeTrabajo = await response.json();
      console.log('Área de trabajo:', areaDeTrabajo);
      // Aquí puedes actualizar el editor y otras secciones del frontend
  } else {
      console.error('Error al mostrar el área de trabajo');
  }
}



/*
// Inicializa Quill
const editor = new Quill('#editor', {
    theme: 'snow'
  });
  
  // Carga el contenido inicial desde el servidor
  const contenido = document.getElementById('editor').dataset.documento;
  editor.root.innerHTML = contenido;
  
  // Función para guardar los cambios
  async function guardarCambios() {
    const contenido = editor.root.innerHTML;
    await fetch('/documento/agregar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texto: contenido }),
    });
    alert('Documento guardado!');
  }
  
  // Función para deshacer cambios
  function deshacer() {
    editor.history.undo();
  }
  
  // Función para rehacer cambios
  function rehacer() {
    editor.history.redo();
  }
  */
  