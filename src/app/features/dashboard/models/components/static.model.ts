export interface ICardStat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: string; // 'blue' | 'green' | 'purple' | 'orange';
  progress?: IProgressCardStat[];
}

export interface IProgressCardStat {
  title: string;
  value: string;
  progress: number;
  target: string;
  current: string;
  icon?: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}
