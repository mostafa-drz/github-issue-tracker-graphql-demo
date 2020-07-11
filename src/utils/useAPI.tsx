import { useState } from "react";
import { api } from "./api";
import { AxiosResponse, AxiosError } from "axios";
import { GraphqlError } from "../types";

const useAPI: <T>() => {
  fetch: (query: string, variables?: { [key: string]: any }) => void;
  data: T | GraphqlError | undefined;
  error: string | undefined;
  isLoading: boolean;
} = <T,>() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<T>();

  const fetch = (query: string, variables?: { [key: string]: any }) => {
    setIsLoading(true);
    api
      .post("", {
        query,
        ...(variables && { variables: { ...variables } }),
      })
      .then((response: AxiosResponse<T>) => {
        setData(response.data);
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
