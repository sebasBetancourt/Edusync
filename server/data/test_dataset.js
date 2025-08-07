
db.materias.insertMany([
  {
    _id: ObjectId(),
    nombre: "Programación",
    descripcion: "Curso de fundamentos de programación"
  },
  {
    _id: ObjectId(),
    nombre: "Matemáticas",
    descripcion: "Álgebra y cálculo básico"
  },
  {
    _id: ObjectId(),
    nombre: "Inglés",
    descripcion: null
  }
]);

var materiaProgramacionId = db.materias.findOne({ nombre: "Programación" }, { _id: 1 })._id;
var materiaMatematicasId = db.materias.findOne({ nombre: "Matemáticas" }, { _id: 1 })._id;
var materiaInglesId = db.materias.findOne({ nombre: "Inglés" }, { _id: 1 })._id;




db.usuarios.insertMany([
  // Administrador
  {
    _id: ObjectId(),
    rol: "Administrador",
    nombre_completo: "Ana Gómez",
    email: "ana.gomez@admin.edu.co",
    password: "833333333333333333333333333333333333333333333333333333333333", // Hash simulado
    identificacion: null,
    celular: null,
    detalles: null,
    curso: null,
    asistencias: null,
    created_at: ISODate("2025-01-01T00:00:00Z")
  },
  // Profesores
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a3002"),
    rol: "Profesor",
    nombre_completo: "Carlos Pérez",
    email: "carlos.perez@edu.co",
    password: "833333333333333333333333333333333333333333333333333333333333",
    identificacion: {
      tipo_documento: "CEDULA_CIUDADANIA",
      numero_documento: "123456789"
    },
    celular: "3101234567",
    detalles: {
      direccion: "Calle 100 #15-20",
      ciudad: "Bogotá",
      pais: "Colombia"
    },
    curso: null,
    asistencias: null,
    created_at: ISODate("2025-01-01T00:00:00Z")
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a3003"),
    rol: "Profesor",
    nombre_completo: "María López",
    email: "maria.lopez@edu.co",
    password: "833333333333333333333333333333333333333333333333333333333333",
    identificacion: {
      tipo_documento: "CEDULA_CIUDADANIA",
      numero_documento: "987654321"
    },
    celular: "3209876543",
    detalles: {
      direccion: "Carrera 43A #1-50",
      ciudad: "Medellín",
      pais: "Colombia"
    },
    curso: null,
    asistencias: null,
    created_at: ISODate("2025-01-01T00:00:00Z")
  },
  // Estudiantes
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a3004"),
    rol: "Estudiante",
    nombre_completo: "Juan Martínez",
    email: "juan.martinez@edu.co",
    password: "833333333333333333333333333333333333333333333333333333333333",
    identificacion: {
      tipo_documento: "TARJETA_IDENTIDAD",
      numero_documento: "1234567890"
    },
    celular: "3001234567",
    detalles: {
      direccion: "Calle 72 #10-34",
      ciudad: "Bogotá",
      pais: "Colombia"
    },
    curso: {
      _id: materiaProgramacionId,
      curso: "A1",
      profesor_id: ObjectId("60c72b2f4f1a4c3d8e1a3002")
    },
    asistencias: 10,
    created_at: ISODate("2025-01-01T00:00:00Z")
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a3005"),
    rol: "Estudiante",
    nombre_completo: "Laura Ramírez",
    email: "laura.ramirez@edu.co",
    password: "833333333333333333333333333333333333333333333333333333333333",
    identificacion: {
      tipo_documento: "TARJETA_IDENTIDAD",
      numero_documento: "0987654321"
    },
    celular: "3019876543",
    detalles: {
      direccion: "Avenida 6 #15-20",
      ciudad: "Cali",
      pais: "Colombia"
    },
    curso: {
      _id: materiaMatematicasId,
      curso: "B2",
      profesor_id: ObjectId("60c72b2f4f1a4c3d8e1a3003")
    },
    asistencias: 8,
    created_at: ISODate("2025-01-01T00:00:00Z")
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a3006"),
    rol: "Estudiante",
    nombre_completo: "Sofía Torres",
    email: "sofia.torres@edu.co",
    password: "833333333333333333333333333333333333333333333333333333333333",
    identificacion: {
      tipo_documento: "TARJETA_IDENTIDAD",
      numero_documento: "1122334455"
    },
    celular: "3021234567",
    detalles: {
      direccion: "Carrera 7 #45-67",
      ciudad: "Bogotá",
      pais: "Colombia"
    },
    curso: {
      _id: materiaInglesId,
      curso: "C3",
      profesor_id: ObjectId("60c72b2f4f1a4c3d8e1a3002")
    },
    asistencias: 12,
    created_at: ISODate("2025-01-01T00:00:00Z")
  }
]);

var adminId = db.usuarios.findOne({ email: "ana.gomez@admin.edu.co" }, { _id: 1 })._id;
var profesorCarlosId = db.usuarios.findOne({ email: "carlos.perez@edu.co" }, { _id: 1 })._id;
var profesorMariaId = db.usuarios.findOne({ email: "maria.lopez@edu.co" }, { _id: 1 })._id;
var estudianteJuanId = db.usuarios.findOne({ email: "juan.martinez@edu.co" }, { _id: 1 })._id;
var estudianteLauraId = db.usuarios.findOne({ email: "laura.ramirez@edu.co" }, { _id: 1 })._id;
var estudianteSofiaId = db.usuarios.findOne({ email: "sofia.torres@edu.co" }, { _id: 1 })._id;




db.pagos.insertMany([
  // Pagos de Juan (Programación)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a4001"),
    estudiante_id: estudianteJuanId,
    monto: 1000000,
    moneda: "COP",
    tipo_pago: "matricula",
    fecha: new Date("2025-01-10T00:00:00Z"),
    mes_referencia: null,
    detalles: "Pago completo de matrícula",
    created_at: new Date("2025-01-10T00:00:00Z")
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a4002"),
    estudiante_id: estudianteJuanId,
    monto: 500000,
    moneda: "COP",
    tipo_pago: "pension",
    fecha: new Date("2025-01-15T00:00:00Z"),
    mes_referencia: "2025-01",
    detalles: "Pensión enero",
    created_at: new Date("2025-01-15T00:00:00Z")
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a4003"),
    estudiante_id: estudianteJuanId,
    monto: 25000,
    moneda: "COP",
    tipo_pago: "abono",
    fecha: new Date("2025-02-10T00:00:00Z"),
    mes_referencia: "2025-02",
    detalles: "Abono febrero",
    created_at: new Date("2025-02-10T00:00:00Z")
  },
  // Pagos de Laura (Matemáticas)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a4004"),
    estudiante_id: estudianteLauraId,
    monto: 500000,
    moneda: "COP",
    tipo_pago: "matricula",
    fecha: new Date("2025-01-12T00:00:00Z"),
    mes_referencia: null,
    detalles: "Pago parcial de matrícula",
    created_at: new Date("2025-01-12T00:00:00Z")
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a4005"),
    estudiante_id: estudianteLauraId,
    monto: 500000,
    moneda: "COP",
    tipo_pago: "pension",
    fecha: new Date("2025-01-20T00:00:00Z"),
    mes_referencia: "2025-01",
    detalles: "Pensión enero",
    created_at: new Date("2025-01-20T00:00:00Z")
  },
  // Pagos de Sofía (Inglés)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a4006"),
    estudiante_id: estudianteSofiaId,
    monto: 1000000,
    moneda: "COP",
    tipo_pago: "matricula",
    fecha: new Date("2025-01-05T00:00:00Z"),
    mes_referencia: null,
    detalles: "Pago completo de matrícula",
    created_at: new Date("2025-01-05T00:00:00Z")
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a4007"),
    estudiante_id: estudianteSofiaId,
    monto: 500000,
    moneda: "COP",
    tipo_pago: "pension",
    fecha: new Date("2025-01-25T00:00:00Z"),
    mes_referencia: "2025-01",
    detalles: "Pensión enero",
    created_at: new Date("2025-01-25T00:00:00Z")
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a4008"),
    estudiante_id: estudianteSofiaId,
    monto: 500000,
    moneda: "COP",
    tipo_pago: "pension",
    fecha: new Date("2025-02-05T00:00:00Z"),
    mes_referencia: "2025-02",
    detalles: "Pensión febrero",
    created_at: new Date("2025-02-05T00:00:00Z")
  }
]);

var pagoJuanMatriculaId = db.pagos.findOne({ estudiante_id: estudianteJuanId, tipo_pago: "matricula" }, { _id: 1 })._id;
var pagoJuanPensionEneroId = db.pagos.findOne({ estudiante_id: estudianteJuanId, mes_referencia: "2025-01" }, { _id: 1 })._id;
var pagoJuanAbonoFebreroId = db.pagos.findOne({ estudiante_id: estudianteJuanId, mes_referencia: "2025-02" }, { _id: 1 })._id;
var pagoLauraMatriculaId = db.pagos.findOne({ estudiante_id: estudianteLauraId, tipo_pago: "matricula" }, { _id: 1 })._id;
var pagoLauraPensionEneroId = db.pagos.findOne({ estudiante_id: estudianteLauraId, mes_referencia: "2025-01" }, { _id: 1 })._id;
var pagoSofiaMatriculaId = db.pagos.findOne({ estudiante_id: estudianteSofiaId, tipo_pago: "matricula" }, { _id: 1 })._id;
var pagoSofiaPensionEneroId = db.pagos.findOne({ estudiante_id: estudianteSofiaId, mes_referencia: "2025-01" }, { _id: 1 })._id;
var pagoSofiaPensionFebreroId = db.pagos.findOne({ estudiante_id: estudianteSofiaId, mes_referencia: "2025-02" }, { _id: 1 })._id;




db.notas.insertMany([
  // Notas de Juan (Programación)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a5001"),
    estudiante_id: estudianteJuanId,
    materia_id: materiaProgramacionId,
    nota: 4.5,
    tipo_evaluacion: "Parcial",
    fecha: new Date("2025-02-01T00:00:00Z"),
    detalles: "Examen de estructuras de datos"
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a5002"),
    estudiante_id: estudianteJuanId,
    materia_id: materiaProgramacionId,
    nota: 3.8,
    tipo_evaluacion: "Tarea",
    fecha: new Date("2025-02-15T00:00:00Z"),
    detalles: "Tarea de algoritmos"
  },
  // Notas de Laura (Matemáticas)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a5003"),
    estudiante_id: estudianteLauraId,
    materia_id: materiaMatematicasId,
    nota: 4.1,
    tipo_evaluacion: "Parcial",
    fecha: new Date("2025-02-02T00:00:00Z"),
    detalles: "Examen de álgebra lineal"
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a5004"),
    estudiante_id: estudianteLauraId,
    materia_id: materiaMatematicasId,
    nota: 4.2,
    tipo_evaluacion: "Proyecto",
    fecha: new Date("2025-02-20T00:00:00Z"),
    detalles: "Proyecto de cálculo"
  },
  // Notas de Sofía (Inglés)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a5005"),
    estudiante_id: estudianteSofiaId,
    materia_id: materiaInglesId,
    nota: 4.8,
    tipo_evaluacion: "Parcial",
    fecha: new Date("2025-02-03T00:00:00Z"),
    detalles: "Examen de gramática"
  },
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a5006"),
    estudiante_id: estudianteSofiaId,
    materia_id: materiaInglesId,
    nota: 4.5,
    tipo_evaluacion: "Tarea",
    fecha: new Date("2025-02-18T00:00:00Z"),
    detalles: "Ensayo en inglés"
  }
]);

// Variables para referencias
var notaJuanParcialId = db.notas.findOne({ estudiante_id: estudianteJuanId, tipo_evaluacion: "Parcial" }, { _id: 1 })._id;
var notaJuanTareaId = db.notas.findOne({ estudiante_id: estudianteJuanId, tipo_evaluacion: "Tarea" }, { _id: 1 })._id;
var notaLauraParcialId = db.notas.findOne({ estudiante_id: estudianteLauraId, tipo_evaluacion: "Parcial" }, { _id: 1 })._id;
var notaLauraProyectoId = db.notas.findOne({ estudiante_id: estudianteLauraId, tipo_evaluacion: "Proyecto" }, { _id: 1 })._id;
var notaSofiaParcialId = db.notas.findOne({ estudiante_id: estudianteSofiaId, tipo_evaluacion: "Parcial" }, { _id: 1 })._id;
var notaSofiaTareaId = db.notas.findOne({ estudiante_id: estudianteSofiaId, tipo_evaluacion: "Tarea" }, { _id: 1 })._id;




db.reportes.insertMany([
  // Reporte de Juan (2025-1)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a6001"),
    estudiante_id: estudianteJuanId,
    periodo: "2025-1",
    notas: [
      notaJuanParcialId,
      notaJuanTareaId 
    ],
    promedio: 4.15, // (4.5 + 3.8) / 2
    asistencias: 10,
    observaciones: "Buen desempeño en programación",
    created_at: new Date("2025-03-01T00:00:00Z")
  },
  // Reporte de Laura (2025-1)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a6002"),
    estudiante_id: estudianteLauraId,
    periodo: "2025-1",
    notas: [
      notaLauraParcialId,
      notaLauraProyectoId
    ],
    promedio: 4.1, // (4.0 + 4.2) / 2
    asistencias: 8,
    observaciones: "Progreso constante en matemáticas",
    created_at: new Date("2025-03-01T00:00:00Z")
  },
  // Reporte de Sofía (2025-1)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a6003"),
    estudiante_id: estudianteSofiaId,
    periodo: "2025-1",
    notas: [
      notaSofiaParcialId,
      notaSofiaTareaId
    ],
    promedio: 4.65, // (4.8 + 4.5) / 2
    asistencias: 12,
    observaciones: "Excelente en inglés",
    created_at: new Date("2025-03-01T00:00:00Z")
  }
]);





db.reportes_pagos.insertMany([
  // Reporte de Juan (2025)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a7001"),
    estudiante_id: estudianteJuanId,
    año: "2025",
    matricula: {
      monto_esperado: 1000000.0,
      monto_pagado: 1000000.0,
      estado: "completo"
    },
    pensiones: [
      { fecha_esperada: new Date("2025-01-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 500000.0, estado: "completo" },
      { fecha_esperada: new Date("2025-02-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 250000.0, estado: "parcial" },
      { fecha_esperada: new Date("2025-03-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-04-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-05-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-06-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-07-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-08-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-09-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-10-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-11-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-12-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" }
    ],
    total_esperado: 7000000.0, // 1000000 + 12 * 500000
    total_pagado: 1750000.0, // 1000000 + 500000 + 250000
    saldo_pendiente: 5250000.0, // 7000000 - 1750000
    al_dia: false, // Matrícula completa, pero febrero es parcial
    created_at: new Date("2025-01-01T00:00:00Z")
  },
  // Reporte de Laura (2025)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a7002"),
    estudiante_id: estudianteLauraId,
    año: "2025",
    matricula: {
      monto_esperado: 1000000.0,
      monto_pagado: 500000.0,
      estado: "parcial"
    },
    pensiones: [
      { fecha_esperada: new Date("2025-01-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 500000.0, estado: "completo" },
      { fecha_esperada: new Date("2025-02-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-03-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-04-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-05-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-06-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-07-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-08-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-09-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-10-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-11-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-12-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" }
    ],
    total_esperado: 7000000.0,
    total_pagado: 1000000.0, // 500000 + 500000
    saldo_pendiente: 6000000.0,
    al_dia: false, // Matrícula parcial
    created_at: new Date("2025-01-01T00:00:00Z")
  },
  // Reporte de Sofía (2025)
  {
    _id: ObjectId("60c72b2f4f1a4c3d8e1a7003"),
    estudiante_id: estudianteSofiaId,
    año: "2025",
    matricula: {
      monto_esperado: 1000000.0,
      monto_pagado: 1000000.0,
      estado: "completo"
    },
    pensiones: [
      { fecha_esperada: new Date("2025-01-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 500000.0, estado: "completo" },
      { fecha_esperada: new Date("2025-02-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 500000.0, estado: "completo" },
      { fecha_esperada: new Date("2025-03-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-04-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-05-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-06-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-07-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-08-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-09-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-10-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-11-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" },
      { fecha_esperada: new Date("2025-12-01T00:00:00Z"), monto_esperado: 500000.0, monto_pagado: 0.0, estado: "pendiente" }
    ],
    total_esperado: 7000000.0,
    total_pagado: 2000000.0, // 1000000 + 500000 + 500000
    saldo_pendiente: 5000000.0,
    al_dia: true, // Matrícula y febrero completos (asumiendo hoy es 2025-02)
    created_at: new Date("2025-01-01T00:00:00Z")
  }
]);
