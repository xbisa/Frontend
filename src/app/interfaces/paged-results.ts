export interface MetaDataResults<TMeta> {
  meta: TMeta;
}
export interface ResultsWithMetaData<TData, TMeta>
  extends MetaDataResults<TMeta> {
  data: Array<TData>;
}

export interface PagedResponseMeta {
  totalCount: number;
}

export type PagedResponse<TData> = ResultsWithMetaData<
  TData,
  PagedResponseMeta
>;
