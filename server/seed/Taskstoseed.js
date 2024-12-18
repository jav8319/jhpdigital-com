const teachingJobs = [
    {
      TeachingJobName: 'Introduction to Google Suite',
      Description: 'A beginner-friendly lesson covering Google Docs, Sheets, Slides, and Drive.',
      Price: 49.99,
      Duration: 3600, // 1 hour in seconds
      PreviousT_job: null,
      Obsolete: false,
    },
    {
      TeachingJobName: 'Advanced Microsoft Word',
      Description: 'Learn advanced features in Microsoft Word, including templates, macros, and formatting.',
      Price: 59.99,
      Duration: 5400, // 1.5 hours in seconds
      PreviousT_job: null,
      Obsolete: false,
    },
    {
      TeachingJobName: 'Mastering Excel for Data Analysis',
      Description: 'A comprehensive lesson on using Microsoft Excel for data analysis, including pivot tables and formulas.',
      Price: 79.99,
      Duration: 7200, // 2 hours in seconds
      PreviousT_job: null,
      Obsolete: false,
    },
    {
      TeachingJobName: 'Introduction to Cybersecurity Basics',
      Description: 'An essential guide to staying safe online, covering topics like secure passwords and recognizing phishing.',
      Price: 39.99,
      Duration: 3600, // 1 hour in seconds
      PreviousT_job: null,
      Obsolete: false,
    },
  ];
  
  const maintenanceJobs = [
    // Desktop Computers
    {
      MaintenanceName: 'Actualizar Software de Microsoft',
      Description: 'Instalar las últimas actualizaciones y parches para Microsoft Office y sistemas operativos Windows.',
      Price: 49.99,
      Duration: 3600, // 1 hour in seconds
      DeviceType: "Computador de mesa",
      PreviousM_job: null,
      Obsolete: false,
    },
    {
      MaintenanceName: 'Limpieza de Computador',
      Description: 'Limpieza completa del hardware del computador, incluyendo la eliminación de polvo y limpieza de ventiladores para un mejor rendimiento.',
      Price: 29.99,
      Duration: 1800, // 30 minutes in seconds
      DeviceType: "Computador de mesa",
      PreviousM_job: null,
      Obsolete: false,
    },
    {
      MaintenanceName: 'Actualizar Software Antivirus',
      Description: 'Instalar y actualizar las definiciones más recientes de antivirus y realizar un análisis completo del sistema para garantizar protección contra malware.',
      Price: 39.99,
      Duration: 2700, // 45 minutes in seconds
      DeviceType: "Computador de mesa",
      PreviousM_job: null,
      Obsolete: false,
    },
    // Laptops
    {
      MaintenanceName: 'Revisión de Hardware de Laptop',
      Description: 'Revisar y diagnosticar el hardware de la laptop para identificar fallas o componentes dañados.',
      Price: 59.99,
      Duration: 4500, // 1 hour 15 minutes in seconds
      DeviceType: "Laptop",
      PreviousM_job: null,
      Obsolete: false,
    },
    {
      MaintenanceName: 'Optimización de Sistema Operativo',
      Description: 'Optimizar el sistema operativo para mejorar el rendimiento y reducir tiempos de carga.',
      Price: 39.99,
      Duration: 3600, // 1 hour in seconds
      DeviceType: "Laptop",
      PreviousM_job: null,
      Obsolete: false,
    },
    {
      MaintenanceName: 'Reemplazo de Pantalla de Laptop',
      Description: 'Reemplazar la pantalla de la laptop dañada por una nueva.',
      Price: 149.99,
      Duration: 7200, // 2 hours in seconds
      DeviceType: "Laptop",
      PreviousM_job: null,
      Obsolete: false,
    },
    // Smartphones
    {
      MaintenanceName: 'Actualización de Sistema Operativo',
      Description: 'Instalar la última versión del sistema operativo disponible para tu dispositivo.',
      Price: 19.99,
      Duration: 1800, // 30 minutes in seconds
      DeviceType: "Smartphone",
      PreviousM_job: null,
      Obsolete: false,
    },
    {
      MaintenanceName: 'Reemplazo de Pantalla de Smartphone',
      Description: 'Reemplazar la pantalla rota de tu smartphone por una nueva.',
      Price: 99.99,
      Duration: 5400, // 1 hour 30 minutes in seconds
      DeviceType: "Smartphone",
      PreviousM_job: null,
      Obsolete: false,
    },
    {
      MaintenanceName: 'Reparación de Botón de Inicio',
      Description: 'Reparar o reemplazar el botón de inicio en smartphones con fallas.',
      Price: 39.99,
      Duration: 2700, // 45 minutes in seconds
      DeviceType: "Smartphone",
      PreviousM_job: null,
      Obsolete: false,
    },
    // Gaming Consoles
    {
      MaintenanceName: 'Limpieza Interna de Consola',
      Description: 'Limpieza completa del interior de la consola para evitar sobrecalentamiento y mejorar el rendimiento.',
      Price: 49.99,
      Duration: 3600, // 1 hour in seconds
      DeviceType: "Consola de videojuegos",
      PreviousM_job: null,
      Obsolete: false,
    },
    {
      MaintenanceName: 'Reparación de Puerto HDMI',
      Description: 'Reparar o reemplazar el puerto HDMI dañado de la consola.',
      Price: 89.99,
      Duration: 5400, // 1 hour 30 minutes in seconds
      DeviceType: "Consola de videojuegos",
      PreviousM_job: null,
      Obsolete: false,
    },
    {
      MaintenanceName: 'Actualización de Firmware de Consola',
      Description: 'Actualizar el firmware de la consola a la última versión disponible.',
      Price: 29.99,
      Duration: 1800, // 30 minutes in seconds
      DeviceType: "Consola de videojuegos",
      PreviousM_job: null,
      Obsolete: false,
    },
    // Printers
    {
      MaintenanceName: 'Reparación de Atasco de Papel',
      Description: 'Reparar problemas de atascos de papel en la impresora.',
      Price: 34.99,
      Duration: 2700, // 45 minutes in seconds
      DeviceType: "Impresora",
      PreviousM_job: null,
      Obsolete: false,
    },
    {
      MaintenanceName: 'Instalación de Controladores de Impresora',
      Description: 'Instalar los controladores necesarios para que la impresora funcione correctamente.',
      Price: 19.99,
      Duration: 1800, // 30 minutes in seconds
      DeviceType: "Impresora",
      PreviousM_job: null,
      Obsolete: false,
    },
    {
      MaintenanceName: 'Reemplazo de Cartuchos de Tinta',
      Description: 'Reemplazar los cartuchos de tinta vacíos o dañados.',
      Price: 14.99,
      Duration: 900, // 15 minutes in seconds
      DeviceType: "Impresora",
      PreviousM_job: null,
      Obsolete: false,
    },
  ];
  
  module.exports = { teachingJobs, maintenanceJobs };
  