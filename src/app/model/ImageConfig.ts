export interface ImageConfig {
    prompt: string;
    name?: string;
    id?: string;
    seed?: number;
    inferenceSteps?: number;
    size?: number;
    guidanceScale?: number;
    version?: number;
    createdAt?: string;
    generationTimeSeconds?: number;
}

export const EMPTY_CONFIG = () => {
  return {
    prompt: "",
    name: undefined,
    id: undefined,
    seed: undefined,
    inferenceSteps: undefined,
    size: undefined,
    guidanceScale: undefined,
    version: undefined,
    createdAt: undefined,
    generationTimeSeconds: undefined
  };
};


export const COPY_CONFIG = (config: ImageConfig) => {
  return {
    prompt: config.prompt,
    name: config.name,
    id: config.id,
    seed: config.seed,
    inferenceSteps: config.inferenceSteps,
    size: config.size,
    guidanceScale: config.guidanceScale,
    version: config.version,
    createdAt: config.createdAt,
    generationTimeSeconds: config.generationTimeSeconds
  };
};

