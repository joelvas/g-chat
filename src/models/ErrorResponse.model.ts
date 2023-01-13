export interface ApiResponse {
  success: boolean
  message: string
}

export interface ExpressValidatorResponse {
  errors: ExpressValidatorError[]
}

export interface ExpressValidatorError {
  location: string
  msg: string
  param: string
  value: string
}
