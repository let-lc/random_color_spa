type Method = 'darken' | 'lighten' | "default";

type GenerateConfig = {
  width: number;
  height: number;
  chaos: number;
  method: Method;
};
