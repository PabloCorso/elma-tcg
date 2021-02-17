import { QueryConfig } from "pg";

export type QueryParam = {
  name: string;
  value: string | number;
};
export type QueryParams = Array<QueryParam>;

export type GetInsertProps = {
  tableName: string;
  params: QueryParams;
  returning?: boolean;
  returningText?: string;
};

export type GetMultiInsertProps = {
  tableName: string;
  paramsGroup: QueryParams[];
  returning?: boolean;
  returningText?: string;
};

export type GetUpdateProps = {
  tableName: string;
  params: QueryParams;
  id: number;
};

const getParamGroupNames = (params: QueryParams) =>
  params.map((param) => param.name);

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

const getValuesText = (length: number, baseIndex = 0) => {
  const valueRefs = [];
  for (let i = 1; i < length + 1; i++) {
    valueRefs.push(baseIndex + i);
  }

  const refsText = valueRefs.map((ref) => `$${ref}`).join(",");
  return `(${refsText})`;
};

const getInsertValuesTexts = (paramsGroup: QueryParams[]) => {
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
  returning = false,
  returningText = "id",
}: GetMultiInsertProps): QueryConfig => {
  const names = getParamGroupNames(paramsGroup[0]).join(",");
  const valuesTexts = getInsertValuesTexts(paramsGroup);
  const returnIdText = returning ? ` RETURNING ${returningText}` : "";
  const values = getParamsGroupValues(paramsGroup);
  return {
    text: `INSERT INTO ${tableName} (${names}) VALUES ${valuesTexts}${returnIdText}`,
    values,
  };
};

export const getInsertQuery = ({
  tableName,
  params,
  returning,
  returningText,
}: GetInsertProps): QueryConfig => {
  return getMultiInsertQuery({
    tableName,
    paramsGroup: [params],
    returning,
    returningText,
  });
};

export const getUpdateQuery = ({ tableName, params, id }: GetUpdateProps) => {
  const updates = [];
  const values = [];
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    const updateText = `${param.name} = $${i + 1}`;
    values.push(param.value);
    updates.push(updateText);
  }

  const updatesText = updates.join(",");
  return {
    text: `UPDATE ${tableName} SET ${updatesText} WHERE id = ${id}`,
    values,
  };
};
