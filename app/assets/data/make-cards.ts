import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface CardData {
  values: any[][];
  fields: string[];
}

interface Card {
  id: number;
  name: string;
  cardType: string;
  type1: string;
  type2: string;
  pr1: number | null;
  pr2: number | null;
  pr3: number | null;
  pr4: number | null;
  pr5: number | null;
  pr6: number | null;
  battleLengthMin: number | null;
  battleLengthMax: number | null;
  flavorText: string;
  rarity: string;
  deleted: boolean;
}

// Read the source file
const sourcePath = join(__dirname, 'cards.json');
const sourceData: CardData = JSON.parse(readFileSync(sourcePath, 'utf-8'));

// Transform the data
const cards: Card[] = sourceData.values.map(cardValues => {
  const card: any = {};
  
  // Map each value to its corresponding field
  sourceData.fields.forEach((field, index) => {
    // Convert field names to camelCase
    const camelField = field
      .split('_')
      .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    card[camelField] = cardValues[index];
  });

  return card as Card;
});

// Write the transformed data
const outputPath = join(__dirname, 'cards-list.json');
writeFileSync(outputPath, JSON.stringify({ cards }, null, 2));

console.log('Cards list has been generated successfully!'); 