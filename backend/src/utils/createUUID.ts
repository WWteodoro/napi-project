import { randomUUID } from 'crypto';

export function createUUID(): string {
  // 3. Usamos a função nativa
  return randomUUID();
}