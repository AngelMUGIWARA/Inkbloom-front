window.onload = function () {
  const editorDiv = document.getElementById('editor');
  const documentoCuerpo = editorDiv.getAttribute('data-documento');

  // Inicializa Quill con el tema "snow"
  const editor = new Quill('#editor', {
      theme: 'snow',
  });

  // Carga el contenido inicial si existe
  if (documentoCuerpo) {
      editor.clipboard.dangerouslyPasteHTML(documentoCuerpo);
  }

  // Vincula botones a funciones específicas
  document.querySelector('.boton.guardar').onclick = async function () {
      await guardarCambios(editor);
  };

  document.querySelector('.boton.deshacer').onclick = function () {
      deshacer(editor);
  };

  document.querySelector('.boton.rehacer').onclick = function () {
      rehacer(editor);
  };
};

async function guardarCambios(editor) {
  const contenido = editor.root.innerHTML; // Extrae el contenido actual del editor

  try {
      const response = await fetch('/api/documento/agregar', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `texto=${encodeURIComponent(contenido)}`,
      });

      if (response.ok) {
          console.log('Cambios guardados correctamente.');
      } else {
          console.error('Error al guardar cambios:', await response.text());
      }
  } catch (error) {
      console.error('Error al realizar la solicitud:', error);
  }
}

function deshacer(editor) {
  editor.history.undo();
}

function rehacer(editor) {
  editor.history.redo();
}

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

async function deshacerCambios() {
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

async function rehacerCambios() {
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

function actualizarEditor(documento) {
  const editorDiv = document.getElementById('editor');
  const editor = new Quill('#editor', {
      theme: 'snow',
  });

  if (documento && documento.cuerpo) {
      editor.clipboard.dangerouslyPasteHTML(documento.cuerpo);
  }
}