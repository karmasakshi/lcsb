export interface ChartConfiguration {
  axisType: 'linear' | 'logarithmic';
  maximumValue: number | null;
  minimumValue: number | null;
  refreshInterval: number;
}
