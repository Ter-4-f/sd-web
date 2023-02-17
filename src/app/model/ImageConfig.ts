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
