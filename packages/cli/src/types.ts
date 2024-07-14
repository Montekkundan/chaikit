export interface Template {
    templateName: string;
    templateDescription: string;
    framework: string;
    cms: string;
    author: string;
    authorUrl: string;
    previewUrl: string;
    githubUrl: string;
    readmeLink: string;
    usecase: string[];
    css: string;
    database: string;
    authentication: string;
  }
  
  export interface Templates {
    [key: string]: Template;
  }
  