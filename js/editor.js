// Variable global para la instancia de Quill
let editor;

// Función principal al cargar la página
window.onload = function () {
  const editorDiv = document.getElementById('editor');
  const documentoCuerpo = editorDiv.getAttribute('data-documento');

  // Inicializa Quill una vez
  editor = new Quill('#editor', {
    theme: 'snow',
  });

  // Carga el contenido inicial si existe
  if (documentoCuerpo) {
    editor.clipboard.dangerouslyPasteHTML(documentoCuerpo);
  }

  // Vincula los botones a sus funciones
  document.querySelector('.boton.guardar').onclick = guardarCambios;
  document.querySelector('.boton.deshacer').onclick = deshacer;
  document.querySelector('.boton.rehacer').onclick = rehacer;
};

// Función para guardar los cambios al backend
async function guardarCambios() {
  const contenido = editor.root.innerHTML;

  try {
    const response = await fetch('/api/documento/agregar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `texto=${encodeURIComponent(contenido)}`,
    });

    if (response.ok) {
      console.log('Cambios guardados correctamente.');
    } else {
      console.error('Error al guardar cambios:', await response.text());
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

// Función para listar los documentos disponibles
async function listarDocumentos() {
  try {
    const response = await fetch('/api/documento');
    if (response.ok) {
      const documentos = await response.json();
      console.log('Documentos disponibles:', documentos);
      return documentos;
    } else {
      console.error('Error al listar documentos');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

// Función para crear un nuevo documento
async function crearDocumento(titulo) {
  try {
    const response = await fetch('/api/documento/crear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titulo=${encodeURIComponent(titulo)}`,
    });

    if (response.ok) {
      const documento = await response.json();
      console.log('Documento creado:', documento);
      return documento;
    } else {
      console.error('Error al crear documento');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

// Función para deshacer cambios locales
async function deshacer() {
  try {
    const response = await fetch('/api/documento/deshacer', { method: 'POST' });
    if (response.ok) {
      const documento = await response.json();
      actualizarEditor(documento);
    } else {
      console.error('Error al deshacer:', await response.text());
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

// Función para rehacer cambios locales
async function rehacer() {
  try {
    const response = await fetch('/api/documento/rehacer', { method: 'POST' });
    if (response.ok) {
      const documento = await response.json();
      actualizarEditor(documento);
    } else {
      console.error('Error al rehacer:', await response.text());
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

// Función para actualizar el contenido del editor
function actualizarEditor(documento) {
  if (documento && documento.cuerpo) {
    editor.clipboard.dangerouslyPasteHTML(documento.cuerpo);
  }
}
