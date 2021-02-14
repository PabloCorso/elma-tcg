import { QueryConfig } from "pg";

export type QueryParam = {
  name: string;
  value: string | number;
};
export type QueryParams = Array<QueryParam>;

export type GetInsertProps = {
  tableName: string;
  params: QueryParams;
  returnId?: boolean;
};

export type GetMultiInsertProps = {
  tableName: string;
  paramsGroup: QueryParams[];
  returnId?: boolean;
};

const getInsertParamNames = (params: QueryParams) =>
  params.map((param) => param.name).join(",");

const getParamValues = (params: QueryParams) =>
  params.map((param) => param.value);

const getParamsGroupValues = (paramsGroup: QueryParams[]) => {
  const result = [];
  for (let i = 0; i < paramsGroup.length; i++) {
    const params = paramsGroup[i];
    result.push(...getParamValues(params));
  }

  return result;
};

export const getInsertQuery = ({
  tableName,
  params,
  returnId,
}: GetInsertProps): QueryConfig => {
  return getMultiInsertQuery({ tableName, paramsGroup: [params], returnId });
};

const getValuesText = (length: number, baseIndex = 0) => {
  const valueRefs = [];
  for (let i = 1; i < length + 1; i++) {
    valueRefs.push(baseIndex + i);
  }

  const refsText = valueRefs.map((ref) => `$${ref}`).join(",");
  return `(${refsText})`;
};

const getValuesTexts = (paramsGroup: QueryParams[]) => {
  const values = [];
  const valuesTexts = [];
  let valuesCount = 0;
  for (let i = 0; i < paramsGroup.length; i++) {
    const params = paramsGroup[i];
    const paramValues = getParamValues(params);
    values.push(...paramValues);

    const paramValuesText = getValuesText(paramValues.length, valuesCount);
    valuesTexts.push(paramValuesText);
    valuesCount += paramValues.length;
  }

  return valuesTexts;
};

export const getMultiInsertQuery = ({
  tableName,
  paramsGroup,
  returnId = false,
}: GetMultiInsertProps): QueryConfig => {
  const names = getInsertParamNames(paramsGroup[0]);
  const valuesTexts = getValuesTexts(paramsGroup);
  const returnIdText = returnId ? " RETURNING id" : "";
  const values = getParamsGroupValues(paramsGroup);
  return {
    text: `INSERT INTO ${tableName} (${names}) VALUES ${valuesTexts}${returnIdText}`,
    values,
  };
};
