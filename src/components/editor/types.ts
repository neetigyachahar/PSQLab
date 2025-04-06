import { Results as BaseResults } from '@electric-sql/pglite';

export type Results = BaseResults<{ [key: string]: unknown }[]>

export interface Response {
    text?: string
    error?: string
    results?: Results[]
    time: number
}

export interface ResultField {
    name: string;
    dataTypeID: number;
}

export type ResultFields = ResultField[]
