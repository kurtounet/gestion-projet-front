export interface IMenuGroups {
  label: string;
  path: string;
  icon?: string; // optionnel pour ajouter des icônes
  subGroups?: IMenuGroups[]
}
