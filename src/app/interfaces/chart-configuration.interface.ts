export interface ChartConfiguration {
  axisType: 'linear' | 'logarithmic';
  maximumValue: number | undefined;
  minimumValue: number | undefined;
  refreshInterval: number;
}
