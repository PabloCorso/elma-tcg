import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface EffectData {
  values: any[][];
  fields: string[];
}

// Read the source file
const sourcePath = join(__dirname, 'effects.json');
const sourceData: EffectData = JSON.parse(readFileSync(sourcePath, 'utf-8'));

// Transform the data
const effects = sourceData.values.map(effectValues => {
  const effect: any = {};
  sourceData.fields.forEach((field, index) => {
    // Convert field names to camelCase
    const camelField = field
      .split('_')
      .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    effect[camelField] = effectValues[index];
  });
  return effect;
});

// Write the transformed data
const outputPath = join(__dirname, 'effects-list.json');
writeFileSync(outputPath, JSON.stringify({ effects }, null, 2));

console.log('Effects list has been generated successfully!'); 