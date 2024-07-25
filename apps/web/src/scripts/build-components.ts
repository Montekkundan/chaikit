import fs from 'fs';
import path from 'path';

interface FileContent {
  name: string;
  content: string;
}

interface Component {
  name: string;
  dependencies: string[];
  devDependencies: string[];
  types: string[];
  files: string[];
  additionalFiles?: string[];
}

const basePath = path.join(__dirname, '../../'); // Set the base path
const inputFilePath = path.join(basePath, 'src/registry/components.json');
const outputDirectory = path.join(basePath, 'public/__registry__/components');

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Read the existing components.json file
const componentsData: Component[] = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

const componentNames: string[] = [];

// Function to read and encode file content
const readFileContent = (filePath: string): string => {
  const absolutePath = path.join(basePath, filePath);
  const ext = path.extname(filePath).toLowerCase();
  const isBinary = ['.glb', '.jpg', '.jpeg', '.png'].includes(ext);

  if (isBinary) {
    const fileBuffer = fs.readFileSync(absolutePath);
    return fileBuffer.toString('base64');
  } else {
    return fs.readFileSync(absolutePath, 'utf8');
  }
};

// Process each component and write to individual JSON files
componentsData.forEach((component) => {
  const filesContent = component.files.map((filePath) => ({
    name: path.basename(filePath),
    content: readFileContent(filePath),
  }));

  const additionalFilesContent = component.additionalFiles?.map((filePath) => ({
    name: path.basename(filePath),
    content: readFileContent(filePath),
  }));

  // Create the component JSON structure
  const componentJson = {
    name: component.name,
    dependencies: component.dependencies,
    devDependencies: component.devDependencies,
    types: component.types,
    files: filesContent,
    additionalFiles: additionalFilesContent,
  };

  // Write the component JSON file
  const componentJsonPath = path.join(outputDirectory, `${component.name}.json`);
  fs.writeFileSync(componentJsonPath, JSON.stringify(componentJson, null, 2), 'utf8');

  // Add component name to the list
  componentNames.push(component.name);
});

// Create the index.json file
const indexJsonPath = path.join(outputDirectory, 'index.json');
fs.writeFileSync(indexJsonPath, JSON.stringify(componentNames, null, 2), 'utf8');

console.log('Index file created with all component names');
console.log('All components processed and saved to public/__registry__/components');
