export type ServiceMessage = { message: string };

export type ServiceResponseSuccess<T> = {
  status: number;
  data: T;
};

export type ServiceResponseError = {
  status: number;
  data: ServiceMessage;
};

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;
