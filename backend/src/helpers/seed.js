import DatabaseClient from "../config/DatabaseClient.js";
import { TICKET_STATUS } from "../config/Constants.js";

async function seedDatabase() {
  try {
    console.log("Iniciando seed de la base de datos...");

    // Esperar a que la conexión esté lista
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const db = DatabaseClient.db;

    // 1. LIMPIAR COLECCIONES EXISTENTES
    await db.collection("Company").deleteMany({});
    await db.collection("Project").deleteMany({});
    await db.collection("UserStory").deleteMany({});
    await db.collection("Ticket").deleteMany({});
    console.log("✓ Colecciones limpiadas");

    // 2. CREAR COMPAÑÍAS
    const companies = [
      {
        name: "Tech Solutions S.A.",
        nit: "900123456-7",
        phone: "+57 1 234 5678",
        address: "Calle 100 #15-20, Bogotá",
        email: "info@techsolutions.com",
      },
      {
        name: "Innovatech Ltda.",
        nit: "800987654-3",
        phone: "+57 1 345 6789",
        address: "Carrera 7 #71-21, Bogotá",
        email: "contacto@innovatech.com",
      },
      {
        name: "Digital Services Corp.",
        nit: "900555666-1",
        phone: "+57 1 456 7890",
        address: "Avenida 19 #104-50, Bogotá",
        email: "hello@digitalservices.com",
      },
    ];

    const companiesResult = await db
      .collection("Company")
      .insertMany(companies);
    const companyIds = Object.values(companiesResult.insertedIds);
    console.log(`✓ ${companyIds.length} compañías creadas`);

    // 3. CREAR PROYECTOS
    const projects = [
      // 1 proyecto para Tech Solutions
      {
        name: "Sistema de Gestión Empresarial",
        description: "ERP completo para gestión empresarial",
        company: companyIds[0],
        createdAt: new Date(),
      },
      // 2 proyectos para Innovatech
      {
        name: "Plataforma E-commerce",
        description: "Tienda online con gestión de inventario",
        company: companyIds[1],
        createdAt: new Date(),
      },
      {
        name: "App Móvil de Servicios",
        description: "Aplicación móvil para servicios on-demand",
        company: companyIds[1],
        createdAt: new Date(),
      },
    ];

    const projectsResult = await db.collection("Project").insertMany(projects);
    const projectIds = Object.values(projectsResult.insertedIds);
    console.log(`✓ ${projectIds.length} proyectos creados`);

    // 4. CREAR HISTORIAS DE USUARIO (3 por proyecto)
    const userStories = [];

    projectIds.forEach((projectId, index) => {
      userStories.push(
        {
          title: `US${index * 3 + 1}: Gestión de Usuarios`,
          description:
            "Como administrador quiero gestionar usuarios del sistema",
          project: projectId,
          priority: "high",
          createdAt: new Date(),
        },
        {
          title: `US${index * 3 + 2}: Reportes y Estadísticas`,
          description:
            "Como usuario quiero ver reportes y estadísticas del sistema",
          project: projectId,
          priority: "medium",
          createdAt: new Date(),
        },
        {
          title: `US${index * 3 + 3}: Notificaciones`,
          description: "Como usuario quiero recibir notificaciones importantes",
          project: projectId,
          priority: "low",
          createdAt: new Date(),
        }
      );
    });

    const userStoriesResult = await db
      .collection("UserStory")
      .insertMany(userStories);
    const userStoryIds = Object.values(userStoriesResult.insertedIds);
    console.log(`✓ ${userStoryIds.length} historias de usuario creadas`);

    // 5. CREAR TICKETS (Mínimo 4 por proyecto: 2 En Proceso, 2 Finalizados)
    const tickets = [];

    userStoryIds.forEach((userStoryId, index) => {
      // Crear al menos 2 tickets por historia de usuario
      const ticketStatuses = [
        TICKET_STATUS.IN_PROGRESS,
        TICKET_STATUS.FINISHED,
        TICKET_STATUS.IN_PROGRESS,
        TICKET_STATUS.FINISHED,
        TICKET_STATUS.ACTIVE,
      ];

      tickets.push(
        {
          title: `Ticket ${index * 2 + 1}: Implementar funcionalidad principal`,
          description: `Desarrollar la funcionalidad principal relacionada con ${userStories[index].title}`,
          userStory: userStoryId,
          status: ticketStatuses[index % ticketStatuses.length],
          comments: [
            {
              text: "Iniciando desarrollo de la funcionalidad",
              createdAt: new Date(),
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: `Ticket ${index * 2 + 2}: Pruebas y validación`,
          description: `Realizar pruebas de la funcionalidad ${userStories[index].title}`,
          userStory: userStoryId,
          status: ticketStatuses[(index + 1) % ticketStatuses.length],
          comments: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      );
    });

    const ticketsResult = await db.collection("Ticket").insertMany(tickets);
    console.log(
      `✓ ${Object.keys(ticketsResult.insertedIds).length} tickets creados`
    );

    // 6. RESUMEN
    console.log("\n=== RESUMEN DEL SEED ===");
    console.log(`Compañías: ${companyIds.length}`);
    console.log(`Proyectos: ${projectIds.length}`);
    console.log(`  - Tech Solutions: 1 proyecto`);
    console.log(`  - Innovatech: 2 proyectos`);
    console.log(`  - Digital Services: 0 proyectos`);
    console.log(
      `Historias de Usuario: ${userStoryIds.length} (3 por proyecto)`
    );
    console.log(`Tickets: ${tickets.length}`);

    // Contar tickets por estado
    const activeCount = tickets.filter(
      (t) => t.status === TICKET_STATUS.ACTIVE
    ).length;
    const inProgressCount = tickets.filter(
      (t) => t.status === TICKET_STATUS.IN_PROGRESS
    ).length;
    const finishedCount = tickets.filter(
      (t) => t.status === TICKET_STATUS.FINISHED
    ).length;

    console.log(`  - Activos: ${activeCount}`);
    console.log(`  - En Proceso: ${inProgressCount}`);
    console.log(`  - Finalizados: ${finishedCount}`);
    console.log("\n✓ Seed completado exitosamente!\n");

    process.exit(0);
  } catch (error) {
    console.error("Error durante el seed:", error);
    process.exit(1);
  }
}

// Ejecutar seed
seedDatabase();
