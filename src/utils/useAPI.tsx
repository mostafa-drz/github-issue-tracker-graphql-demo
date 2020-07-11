import { useState } from "react";
import { api } from "./api";
import { AxiosResponse, AxiosError } from "axios";
import { GraphqlError } from "../types";

interface Fetch<T> {
  query: string;
  variables?: { [key: string]: any };
  onSuccess?: (data: T) => void;
}
const useAPI: <T>() => {
  fetch: (params: Fetch<T | GraphqlError>) => void;
  data: T | GraphqlError | undefined;
  error: string | undefined;
  isLoading: boolean;
} = <T,>() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<T>();

  const fetch = (params: Fetch<T>) => {
    const { query, variables, onSuccess } = params;
    setIsLoading(true);
    api
      .post("", {
        query,
        ...(variables && { variables: { ...variables } }),
      })
      .then((response: AxiosResponse<T>) => {
        setData(response.data);
        if (onSuccess) {
          onSuccess(response.data);
        }
      })
      .catch((error: AxiosError) => {
        setError(error.message || "Something went wrong:(");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { data, isLoading, error, fetch };
};

export default useAPI;
