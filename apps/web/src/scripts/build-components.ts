import fs from 'fs';
import path from 'path';

interface Component {
  name: string;
  dependencies: string[];
  devDependencies: string[];
  files: string[];
  additionalFiles?: string[];
}

const inputFilePath = path.join(__dirname, '../registry/components.json');
const outputDirectory = path.join(__dirname, '../../public/__registry__/components');

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Read the existing components.json file
const componentsData: Component[] = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

// Process each component and write to individual JSON files
componentsData.forEach((component) => {
  const filesContent = component.files.map((filePath) => {
    const absolutePath = path.join(__dirname, '../', filePath);
    const content = fs.readFileSync(absolutePath, 'utf8');
    return {
      name: path.basename(filePath),
      content
    };
  });

  // Create the component JSON structure
  const componentJson = {
    name: component.name,
    dependencies: component.dependencies,
    devDependencies: component.devDependencies,
    files: filesContent
  };

  // Write the component JSON file
  const componentJsonPath = path.join(outputDirectory, `${component.name}.json`);
  fs.writeFileSync(componentJsonPath, JSON.stringify(componentJson, null, 2), 'utf8');

  console.log(`Component ${component.name} processed and saved to ${componentJsonPath}`);
});

console.log('All components processed and saved to public/__registry__/components');
