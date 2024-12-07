const teachingJobs = [
    {
      TeachingJobName: 'Introduction to Google Suite',
      Description: 'A beginner-friendly lesson covering Google Docs, Sheets, Slides, and Drive.',
      Price: 49.99,
      Duration: 3600, // 1 hour in seconds
      PreviousT_job: null,
      TaskID: 1, // Assuming TaskID 1 exists in tasks_codes
      Obsolete: false,
    },
    {
      TeachingJobName: 'Advanced Microsoft Word',
      Description: 'Learn advanced features in Microsoft Word, including templates, macros, and formatting.',
      Price: 59.99,
      Duration: 5400, // 1.5 hours in seconds
      PreviousT_job: null,
      TaskID: 2, // Assuming TaskID 2 exists in tasks_codes
      Obsolete: false,
    },
    {
      TeachingJobName: 'Mastering Excel for Data Analysis',
      Description: 'A comprehensive lesson on using Microsoft Excel for data analysis, including pivot tables and formulas.',
      Price: 79.99,
      Duration: 7200, // 2 hours in seconds
      PreviousT_job: null,
      TaskID: 3, // Assuming TaskID 3 exists in tasks_codes
      Obsolete: false,
    },
    {
      TeachingJobName: 'Introduction to Cybersecurity Basics',
      Description: 'An essential guide to staying safe online, covering topics like secure passwords and recognizing phishing.',
      Price: 39.99,
      Duration: 3600, // 1 hour in seconds
      PreviousT_job: null,
      TaskID: 4, // Assuming TaskID 4 exists in tasks_codes
      Obsolete: false,
    },
  ];
  
  const maintenanceJobs = [
    {
      MaintenanceName: 'Updating Microsoft Software',
      Description: 'Install the latest updates and patches for Microsoft Office and Windows operating systems.',
      Price: 49.99,
      Duration: 3600, // 1 hour in seconds
      PreviousM_job: null,
      TaskID: 5, // Assuming JobCode 1 exists in tasks_codes
      Obsolete: false,
    },
    {
      MaintenanceName: 'Cleaning Computer',
      Description: 'Thorough cleaning of the computer hardware, including removing dust and cleaning fans for better performance.',
      Price: 29.99,
      Duration: 1800, // 30 minutes in seconds
      PreviousM_job: null,
      TaskID: 6, // Assuming JobCode 2 exists in tasks_codes
      Obsolete: false,
    },
    {
      MaintenanceName: 'Updating Antivirus Software',
      Description: 'Install and update the latest antivirus definitions and perform a full system scan to ensure protection against malware.',
      Price: 39.99,
      Duration: 2700, // 45 minutes in seconds
      PreviousM_job: null,
      TaskID: 7, // Assuming JobCode 3 exists in tasks_codes
      Obsolete: false,
    },
  ];
  
  module.exports = { teachingJobs, maintenanceJobs };
  