import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface CardsEffectsData {
  values: any[][];
  fields: string[];
}

// Read the source file
const sourcePath = join(__dirname, 'cards_effects.json');
const sourceData: CardsEffectsData = JSON.parse(readFileSync(sourcePath, 'utf-8'));

// Transform the data
const cardsEffects = sourceData.values.map(entryValues => {
  const entry: any = {};
  sourceData.fields.forEach((field, index) => {
    // Convert field names to camelCase
    const camelField = field
      .split('_')
      .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    entry[camelField] = entryValues[index];
  });
  return entry;
});

// Write the transformed data
const outputPath = join(__dirname, 'cards-effects-list.json');
writeFileSync(outputPath, JSON.stringify({ cardsEffects }, null, 2));

console.log('Cards-effects list has been generated successfully!'); 