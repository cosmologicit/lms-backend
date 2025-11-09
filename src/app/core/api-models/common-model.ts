export interface State {
  id?: number
  name?: string
  minPincode?: number
  maxPincode?: number
  abbreviation?: string
  code?: string
}

export interface DefaultMappingResponse {
  defaultBranchExists: boolean;
  defaultBranchMappingExists: boolean;
}