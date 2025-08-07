
db.createCollection("materias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "nombre"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único"
        },
        nombre: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\s]+$",
          minLength: 2,
          maxLength: 100,
          description: "Nombre de la materia, requerido"
        },
        descripcion: {
          bsonType: ["string", "null"],
          maxLength: 500,
          description: "Descripción de la materia, opcional"
        }
      },
      additionalProperties: false
    }
  }
});
db.materias.createIndex({ nombre: 1 }, { unique: true });
db.materias.createIndex({ created_at: 1 });

db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "rol", "nombre_completo", "email", "password", "created_at"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único"
        },
        rol: {
          bsonType: "string",
          enum: ["Administrador", "Profesor", "Estudiante"],
          description: "Rol del usuario"
        },
        nombre_completo: {
          bsonType: "string",
          pattern: "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$",
          minLength: 2,
          maxLength: 100,
          description: "Nombre completo, requerido"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          maxLength: 254,
          description: "Correo electrónico, requerido"
        },
        password: {
          bsonType: "string",
          minLength: 60,
          maxLength: 60,
          description: "Hash de la contraseña encriptada con bcryptjs, requerido"
        },
        identificacion: {
          bsonType: ["object", "null"],
          description: "Documento de identificación, requerido para Profesores y Estudiantes",
          properties: {
            tipo_documento: {
              bsonType: "string",
              enum: ["CEDULA_CIUDADANIA", "CEDULA_EXTRANJERIA", "TARJETA_IDENTIDAD", "PASAPORTE", "NIT", "OTRO"],
              description: "Tipo de documento"
            },
            numero_documento: {
              bsonType: "string",
              pattern: "^[A-Za-z0-9]{6,15}$",
              description: "Número de documento (6-15 caracteres alfanuméricos)"
            }
          },
          required: ["tipo_documento", "numero_documento"],
          additionalProperties: false
        },
        celular: {
          bsonType: ["string", "null"],
          pattern: "^3[0-9]{9}$",
          description: "Celular colombiano, opcional"
        },
        detalles: {
          bsonType: ["object", "null"],
          description: "Dirección, requerida para Profesores y Estudiantes",
          properties: {
            direccion: {
              bsonType: "string",
              maxLength: 250,
              description: "Dirección de residencia"
            },
            ciudad: {
              bsonType: "string",
              pattern: "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$",
              maxLength: 100,
              description: "Ciudad del usuario"
            },
            pais: {
              bsonType: "string",
              pattern: "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$",
              maxLength: 100,
              description: "País del usuario"
            }
          },
          required: ["direccion", "ciudad", "pais"],
          additionalProperties: false
        },
        curso: {
          bsonType: ["object", "null"],
          description: "Curso embebido, requerido para Estudiantes",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "Id único del curso/materia (referencia a materias)"
            },
            curso: {
              bsonType: "string",
              minLength: 2,
              maxLength: 2,
              pattern: "^[A-Z]{1}[1-9]{1}$",
              description: "Código del curso (ej. A1, B7)"
            },
            profesor_id: {
              bsonType: "objectId",
              description: "Id del profesor (referencia a usuarios)"
            }
          },
          required: ["_id", "curso", "profesor_id"],
          additionalProperties: false
        },
        asistencias: {
          bsonType: ["int", "null"],
          minimum: 0,
          description: "Asistencias del estudiante, requerido para Estudiantes"
        },
        created_at: {
          bsonType: "date",
          description: "Fecha de registro, requerido"
        }
      },
      additionalProperties: false
    }
  }
});
db.usuarios.createIndex({ "identificacion.numero_documento": 1 }, { unique: true, partialFilterExpression: { "identificacion.numero_documento": { $exists: true } } });
db.usuarios.createIndex({ email: 1 }, { unique: true });
db.usuarios.createIndex({ rol: 1 });
db.usuarios.createIndex({ "curso._id": 1 }, { partialFilterExpression: { curso: { $exists: true } } });
db.usuarios.createIndex({ "curso.profesor_id": 1 }, { partialFilterExpression: { curso: { $exists: true } } });
db.usuarios.createIndex({ created_at: 1 });

db.createCollection("pagos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "estudiante_id", "monto", "moneda", "tipo_pago", "fecha", "created_at"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Id único"
        },
        estudiante_id: {
          bsonType: "objectId",
          description: "Id del estudiante (referencia a usuarios)"
        },
        monto: {
          bsonType: "int",
          minimum: 10000,
          description: "Monto del pago, mínimo 10.000 para permitir abonos"
        },
        moneda: {
          bsonType: "string",
          enum: ["COP", "USD"],
          description: "Moneda del pago"
        },
        tipo_pago: {
          bsonType: "string",
          enum: ["pension", "matricula", "abono"],
          description: "Tipo de pago"
        },
        fecha: {
          bsonType: "date",
          description: "Fecha del pago"
        },
        mes_referencia: {
          bsonType: ["string", "null"],
          pattern: "^20[2-3][0-9]-(0[1-9]|1[0-2])$",
          description: "Mes de referencia para pensión o abono (ej. 2025-01), requerido para pensión/abono"
        },
        detalles: {
          bsonType: ["string", "null"],
          maxLength: 100,
          description: "Descripción del pago, opcional"
        },
        created_at: {
          bsonType: "date",
          description: "Fecha de registro, requerido"
        }
      },
      additionalProperties: false
    }
  }
});
db.pagos.createIndex({ estudiante_id: 1, fecha: 1 });
db.pagos.createIndex({ mes_referencia: 1 }, { partialFilterExpression: { mes_referencia: { $exists: true } } });
db.pagos.createIndex({ fecha: 1 });

db.createCollection("notas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "estudiante_id", "materia_id", "nota", "tipo_evaluacion", "fecha"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Id único"
        },
        estudiante_id: {
          bsonType: "objectId",
          description: "Id del estudiante (referencia a usuarios)"
        },
        materia_id: {
          bsonType: "objectId",
          description: "Id de la materia (referencia a materias)"
        },
        nota: {
          bsonType: "double",
          minimum: 0,
          maximum: 5,
          description: "Nota del estudiante (0-5.0)"
        },
        tipo_evaluacion: {
          bsonType: "string",
          enum: ["Parcial", "Final", "Tarea", "Proyecto"],
          description: "Tipo de evaluación"
        },
        fecha: {
          bsonType: "date",
          description: "Fecha de la evaluación"
        },
        detalles: {
          bsonType: ["string", "null"],
          maxLength: 250,
          description: "Descripción de la evaluación, opcional"
        }
      },
      additionalProperties: false
    }
  }
});
db.notas.createIndex({ estudiante_id: 1, materia_id: 1, fecha: 1 });
db.notas.createIndex({ materia_id: 1 });
db.notas.createIndex({ fecha: 1 });

db.createCollection("reportes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "estudiante_id", "periodo", "notas", "promedio", "asistencias", "created_at"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Id único"
        },
        estudiante_id: {
          bsonType: "objectId",
          description: "Id del estudiante (referencia a usuarios)"
        },
        periodo: {
          bsonType: "string",
          pattern: "^20[2-3][0-9]-[1-2]$",
          description: "Período académico (ej. 2025-1)"
        },
        notas: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "objectId",
            description: "Id de cada Nota"
            },
            additionalProperties: false
        },
        promedio: {
          bsonType: "double",
          minimum: 0,
          maximum: 5,
          description: "Promedio de notas en el período"
        },
        asistencias: {
          bsonType: "int",
          minimum: 0,
          description: "Total de asistencias en el período"
        },
        observaciones: {
          bsonType: ["string", "null"],
          maxLength: 500,
          description: "Comentarios generales, opcional"
        },
        created_at: {
          bsonType: "date",
          description: "Fecha de registro, requerido"
        }
      },
      additionalProperties: false
    }
  }
});
db.reportes.createIndex({ estudiante_id: 1, periodo: 1 }, { unique: true });
db.reportes.createIndex({ periodo: 1 });
db.reportes.createIndex({ created_at: 1 });

db.createCollection("reportes_pagos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "estudiante_id", "año", "matricula", "pensiones", "total_esperado", "total_pagado", "saldo_pendiente", "al_dia", "created_at"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Id único"
        },
        estudiante_id: {
          bsonType: "objectId",
          description: "Id del estudiante (referencia a usuarios)"
        },
        año: {
          bsonType: "string",
          pattern: "^20[2-3][0-9]$",
          description: "Año del reporte (ej. 2025)"
        },
        matricula: {
          bsonType: "object",
          required: ["monto_esperado", "monto_pagado", "estado"],
          properties: {
            monto_esperado: {
              bsonType: "int",
              minimum: 50000,
              description: "Monto esperado de la matrícula"
            },
            monto_pagado: {
              bsonType: "int",
              minimum: 0,
              description: "Monto pagado de la matrícula"
            },
            estado: {
              bsonType: "string",
              enum: ["pendiente", "parcial", "completo"],
              description: "Estado del pago de la matrícula"
            }
          },
          additionalProperties: false
        },
        pensiones: {
          bsonType: "array",
          minItems: 12,
          maxItems: 12,
          items: {
            bsonType: "object",
            required: ["fecha_esperada", "monto_esperado", "monto_pagado", "estado"],
            properties: {
              fecha_esperada: {
                bsonType: "date",
                description: "Fecha esperada del pago (primer día del mes)"
              },
              monto_esperado: {
                bsonType: "int",
                minimum: 50000,
                description: "Monto esperado de la pensión mensual"
              },
              monto_pagado: {
                bsonType: "int",
                minimum: 0,
                description: "Monto pagado de la pensión mensual"
              },
              estado: {
                bsonType: "string",
                enum: ["pendiente", "parcial", "completo"],
                description: "Estado del pago de la pensión"
              }
            },
            additionalProperties: false
          },
          description: "Pensiones mensuales (12 meses)"
        },
        total_esperado: {
          bsonType: "int",
          minimum: 0,
          description: "Suma de matrícula y pensiones esperadas"
        },
        total_pagado: {
          bsonType: "int",
          minimum: 0,
          description: "Suma de matrícula y pensiones pagadas"
        },
        saldo_pendiente: {
          bsonType: "int",
          minimum: 0,
          description: "Diferencia entre total esperado y pagado"
        },
        al_dia: {
          bsonType: "bool",
          description: "Indica si el estudiante está al día en el mes actual"
        },
        created_at: {
          bsonType: "date",
          description: "Fecha de registro, requerido"
        }
      },
      additionalProperties: false
    }
  }
});
db.reportes_pagos.createIndex({ estudiante_id: 1, año: 1 }, { unique: true });
db.reportes_pagos.createIndex({ año: 1 });
db.reportes_pagos.createIndex({ created_at: 1 });