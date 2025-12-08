export interface IMenuGroups {
  label: string;
  path: string | null;
  icon?: string; // optionnel pour ajouter des icônes
  subGroups?: IMenuGroups[];
}
