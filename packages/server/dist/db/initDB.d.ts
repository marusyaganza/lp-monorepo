import { ModelsType } from './models';
type initDBFuncType = (cb: (model: ModelsType) => void, connectString?: string) => void;
export declare const initDB: initDBFuncType;
export {};
