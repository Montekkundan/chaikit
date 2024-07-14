import fs from 'fs';
import path from 'path';

interface Template {
  templateName: string;
  templateDescription: string;
  framework: string;
  cms: string;
  id: string;
  author: string;
  authorUrl: string;
  imageUrl: string;
  previewUrl: string;
  githubUrl: string;
  readmeLink: string;
  slug: string;
  usecase: string[];
  css: string;
  database: string;
  authentication: string;
  analytics: string;
}

const inputFilePath = path.join(__dirname, '../registry/template.json');
const outputDirectory = path.join(__dirname, '../../public/__registry__');
const outputFilePath = path.join(outputDirectory, 'template.json');

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Read the existing template.json file
const templatesData: Template[] = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

// Transform the data
const transformedData = templatesData.reduce((acc, template) => {
  const {
    slug,
    templateName,
    templateDescription,
    framework,
    cms,
    author,
    authorUrl,
    previewUrl,
    githubUrl,
    readmeLink,
    usecase,
    css,
    database,
    authentication,
  } = template;

  acc[slug] = {
    templateName,
    templateDescription,
    framework,
    cms,
    author,
    authorUrl,
    previewUrl,
    githubUrl,
    readmeLink,
    usecase,
    css,
    database,
    authentication,
  };

  return acc;
}, {} as Record<string, Omit<Template, 'id' | 'imageUrl' | 'slug' | 'analytics'>>);

// Write the transformed data to a new template.json file in the public folder
const fileContent = JSON.stringify(transformedData, null, 2);

fs.writeFileSync(outputFilePath, fileContent, 'utf8');

console.log('Template data transformed and saved to public/__registry__/template.json');
