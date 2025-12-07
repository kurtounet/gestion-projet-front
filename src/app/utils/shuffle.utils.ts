/**
 * Mélange un tableau en place selon l'algorithme de Fisher–Yates
 * @param array Le tableau à mélanger
 * @returns Le même tableau, mélangé
 */
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    // Génère un index aléatoire entre 0 et i (inclus)
    const j = Math.floor(Math.random() * (i + 1));
    // Échange array[i] et array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export { shuffle };
